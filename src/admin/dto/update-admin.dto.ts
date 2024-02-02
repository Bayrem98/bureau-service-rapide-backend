import { IsMongoId, IsOptional } from 'class-validator';

export default class UpdateAdminDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  nom?: string;
  @IsOptional()
  password?: string;
}
