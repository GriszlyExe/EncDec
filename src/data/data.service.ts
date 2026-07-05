import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class DataService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(private readonly config: ConfigService) {
    const privateKeyPath = this.config.get<string>('PRIVATE_KEY_PATH');
    const publicKeyPath = this.config.get<string>('PUBLIC_KEY_PATH');

    if (!privateKeyPath || !publicKeyPath) {
      throw new Error(
        'PRIVATE_KEY_PATH and PUBLIC_KEY_PATH must be set in environment',
      );
    }

    this.privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    this.publicKey = fs.readFileSync(publicKeyPath, 'utf8');
  }

  /**
   * 1 Create AES Key
   * 2 Encrypt Payload with AES Key --> Data1
   * 3 Encrypt Key with Private Key --> Data2
   * 4 Return data1 and data2
   * 
  */
  encryptData(payload: string): {data1: string, data2: string} {

    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);

    const data2 = Buffer.concat([iv, encrypted]).toString('base64');
    const data1 = crypto.privateEncrypt(this.privateKey, aesKey).toString('base64');

    return { data1, data2 };
  }

  /** 
   * 1 Get AES Key, Decrypt Data 1 with Public Key
   * 2 Get Payload, Decrypt Data 2 with AES Key
   * 3 Return Payload
  */
  
  decryptData(data1: string, data2: string): {payload: string} {
    
    const aesKey = crypto.publicDecrypt(this.publicKey, Buffer.from(data1, 'base64'));

    const data2Buffer = Buffer.from(data2, 'base64');
    const iv = data2Buffer.subarray(0, 16);
    const encrypted = data2Buffer.subarray(16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return { payload: decrypted.toString('utf8') };
  }
}
