import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestDecryptDataDto {
  @ApiProperty({ description: 'AES key encrypted with RSA private key (base64)' })
  @IsString()
  @IsNotEmpty()
  data1: string;

  @ApiProperty({ description: 'IV + AES-encrypted payload (base64)' })
  @IsString()
  @IsNotEmpty()
  data2: string;
}

export class DecryptDataDto {
  @ApiProperty({ description: 'Recovered plaintext' })
  payload: string;
}

export class ResponseDecryptDataDto {
  @ApiProperty()
  successful: boolean;

  @ApiProperty()
  error_code: string;

  @ApiProperty({ type: DecryptDataDto, nullable: true })
  data: DecryptDataDto | null;
}
