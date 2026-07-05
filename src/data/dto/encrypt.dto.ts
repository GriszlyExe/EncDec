import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RequestEncryptDataDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  payload: string;
}

export class EncryptDataDto {
  data1: string;
  data2: string;
}

export class ResponseEncryptDataDto {
  successful: boolean;
  error_code: string;
  data: EncryptDataDto | null;
}
