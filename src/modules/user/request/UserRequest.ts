import { ObjectId } from "typeorm";

export default class UserRequest {
  _id?: ObjectId | undefined;
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
}
