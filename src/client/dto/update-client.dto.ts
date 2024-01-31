import { IsMongoId, IsOptional } from 'class-validator';

export default class UpdateClientDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  nom?: string;
  @IsOptional()
  prenom?: string;
  @IsOptional()
  password?: string;
  @IsOptional()
  num_tel?: string;
  @IsOptional()
  adresse?: string;
  @IsOptional()
  description?: string;
}
