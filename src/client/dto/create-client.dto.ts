export default class CreateClientDto {
  nom: string;
  prenom: string;
  password: string;
  num_tel: string;
  adresse: string;
  description?: string;
  coverPath?: string;
  num_cin?: string;
}
