import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DataService } from './data.service';

const keyPaths: Record<string, string> = {
  PRIVATE_KEY_PATH: './keys/private.pem',
  PUBLIC_KEY_PATH: './keys/public.pem',
};

describe('DataService', () => {
  let service: DataService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: ConfigService,
          useValue: { get: (key: string) => keyPaths[key] },
        },
      ],
    }).compile();

    service = module.get(DataService);
  });

  it('is defined', () => {
    expect(service).toBeDefined();
  });

  it('encryptData returns data1 and data2', () => {
    const result = service.encryptData('hello');
    expect(typeof result.data1).toBe('string');
    expect(typeof result.data2).toBe('string');
    expect(result.data1.length).toBeGreaterThan(0);
    expect(result.data2.length).toBeGreaterThan(0);
  });

  it('encrypt -> decrypt round-trips the payload', () => {
    const payload = 'secret';
    const { data1, data2 } = service.encryptData(payload);
    expect(service.decryptData(data1, data2).payload).toBe(payload);
  });

  it('uses a fresh AES key', () => {
    const a = service.encryptData('same');
    const b = service.encryptData('same');
    expect(a.data1).not.toBe(b.data1);
  });

});
