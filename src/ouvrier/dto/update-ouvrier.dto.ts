import { IsMongoId, IsOptional } from 'class-validator';
import { Reclamation } from 'src/reclamation/schemas/reclamation.schema';

export class UpdateOuvrierDto {
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
  num_cin?: string;
  @IsOptional()
  num_tel?: string;
  @IsOptional()
  adresse?: string;
  @IsOptional()
  profession?: string;
  @IsOptional()
  coverPath?: string;
  @IsOptional()
  avis?: number;
  @IsOptional()
  description?: string;
  @IsOptional()
  reclamation?: Reclamation[];
}
