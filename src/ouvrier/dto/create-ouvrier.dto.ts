export default class CreateOuvrierDto {
  nom: string;
  prenom: string;
  password: string;
  num_cin?: number;
  num_tel: string;
  adresse: string;
  profession: string;
  coverPath?: string;
  avis?: number;
  description?: string;
}
