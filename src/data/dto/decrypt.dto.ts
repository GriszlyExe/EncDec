import { IsNotEmpty, IsString } from 'class-validator';

export class RequestDecryptDataDto {
  @IsString()
  @IsNotEmpty()
  data1: string;

  @IsString()
  @IsNotEmpty()
  data2: string;
}

export class DecryptDataDto {
  payload: string;
}

export class ResponseDecryptDataDto {
  successful: boolean;

  error_code: string;

  data: DecryptDataDto | null;

}