import { IsMongoId, IsOptional } from 'class-validator';

export default class UpdateAdminDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  num_tel?: string;
  @IsOptional()
  password?: string;
}
