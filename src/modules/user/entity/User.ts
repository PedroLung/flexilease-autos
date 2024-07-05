import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birth: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cep: string;

  @Column()
  patio: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  locality: string;

  @Column()
  uf: string;

  @Column()
  qualified: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;

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
    created_at: Timestamp,
    updated_at: Timestamp,
    deleted_at: Timestamp,
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
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
