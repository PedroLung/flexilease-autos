import { ObjectId } from "typeorm";

export default class UserResponse {
  _id: ObjectId;
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  cep: string;
  qualified: string;
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;

  constructor(
    _id: ObjectId,
    name: string,
    cpf: string,
    birth: string,
    email: string,
    password: string,
    cep: string,
    qualified: string,
    patio: string,
    complement: string,
    neighborhood: string,
    locality: string,
    uf: string,
  ) {
    this._id = _id;
    this.name = name;
    this.cpf = cpf;
    this.birth = birth;
    this.email = email;
    this.password = password;
    this.cep = cep;
    this.qualified = qualified;
    this.patio = patio;
    this.complement = complement;
    this.neighborhood = neighborhood;
    this.locality = locality;
    this.uf = uf;
  }

  toJson = () => {
    return {
      _id: this._id,
      name: this.name,
      cpf: this.cpf,
      birth: this.birth,
      email: this.email,
      password: this.password,
      cep: this.cep,
      qualified: this.qualified,
      patio: this.patio,
      complement: this.complement,
      neighborhood: this.neighborhood,
      locality: this.locality,
      uf: this.uf,
    };
  };
}
