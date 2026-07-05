import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestEncryptDataDto } from './dto/encrypt.dto';
import { DataService } from './data.service';
import { RequestDecryptDataDto } from './dto/decrypt.dto';

@Controller('')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('get-encrypted-data')
  create(@Body() requestEncryptDataDto: RequestEncryptDataDto) {
    return this.dataService.encryptData(requestEncryptDataDto.payload);
  }

  @Post('get-decrypted-data')
  findOne(@Body() decryptDataDto: RequestDecryptDataDto) {
    return this.dataService.decryptData(decryptDataDto.data1, decryptDataDto.data2);
  }
}
