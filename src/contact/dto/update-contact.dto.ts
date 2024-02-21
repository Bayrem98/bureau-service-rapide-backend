import { IsMongoId, IsOptional } from 'class-validator';

export default class UpdateContactDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  nom?: string;
  @IsOptional()
  prenom?: string;
  @IsOptional()
  num_tel?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  message?: string;
}
