import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataService } from './data.service';
import { RequestEncryptDataDto, EncryptDataDto } from './dto/encrypt.dto';
import { RequestDecryptDataDto, DecryptDataDto } from './dto/decrypt.dto';

@ApiTags('data')
@Controller('')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('get-encrypted-data')
  @ApiOperation({ summary: 'Encrypt payload (AES) and RSA-wrap the AES key' })
  @ApiResponse({ status: 201, type: EncryptDataDto })
  encrypted(@Body() requestEncryptDataDto: RequestEncryptDataDto): EncryptDataDto {
    return this.dataService.encryptData(requestEncryptDataDto.payload);
  }

  @Post('get-decrypted-data')
  @ApiOperation({ summary: 'Unwrap AES key (RSA) and decrypt payload' })
  @ApiResponse({ status: 201, type: DecryptDataDto })
  decrypted(@Body() decryptDataDto: RequestDecryptDataDto): DecryptDataDto {
    return this.dataService.decryptData(
      decryptDataDto.data1,
      decryptDataDto.data2,
    );
  }
}
