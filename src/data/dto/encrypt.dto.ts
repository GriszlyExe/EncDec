import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RequestEncryptDataDto {
  @ApiProperty({ description: 'Plaintext to encrypt', maxLength: 2000 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  payload: string;
}

export class EncryptDataDto {
  @ApiProperty({ description: 'AES key encrypted with RSA private key (base64)' })
  data1: string;

  @ApiProperty({ description: 'IV + AES-encrypted payload (base64)' })
  data2: string;
}

export class ResponseEncryptDataDto {
  @ApiProperty()
  successful: boolean;

  @ApiProperty()
  error_code: string;

  @ApiProperty({ type: EncryptDataDto, nullable: true })
  data: EncryptDataDto | null;
}
