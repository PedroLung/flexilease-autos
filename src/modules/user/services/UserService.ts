import { ObjectId } from "mongodb";
import UserMapper from "../mappings/userMapper";
import { UserRepository } from "../repositories/UserRepository";
import UserRequest from "../request/UserRequest";
import UserResponse from "../response/UserResponse";
import api from "../axios/api";

export default class UserService {
  createUser = async (userData: UserRequest): Promise<UserResponse> => {
    const response = await api.get(`/${userData.cep}/json`);
    let { logradouro, complemento, bairro, localidade, uf } = response.data;

    if (!logradouro) {
      logradouro = "N/A";
    }

    if (!complemento) {
      complemento = "N/A";
    }

    if (!bairro) {
      bairro = "N/A";
    }

    if (!localidade) {
      localidade = "N/A";
    }

    if (!uf) {
      uf = "N/A";
    }

    const userExistByEmail = await UserRepository.findOne({
      where: { email: userData.email },
    });
    if (userExistByEmail) {
      throw new Error("This email is already registered");
    }

    const userExistByCPF = await UserRepository.findOne({
      where: { cpf: userData.cpf },
    });
    if (userExistByCPF) {
      throw new Error("This cpf is already registered");
    }

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    const year = userData.birth.split("/");

    const idade = anoAtual - parseInt(year[2]);
    if (idade < 18) {
      throw new Error("You must be at least 18 years old");
    }

    const user = UserRepository.create({
      name: userData.name,
      cpf: userData.cpf,
      birth: userData.birth,
      email: userData.email,
      password: userData.password,
      cep: userData.cep,
      qualified: userData.qualified,
      patio: logradouro,
      complement: complemento,
      neighborhood: bairro,
      locality: localidade,
      uf: uf,
    });

    await UserRepository.save(user);

    return new UserResponse(
      user._id,
      user.name,
      user.cpf,
      user.birth,
      user.email,
      user.password,
      user.cep,
      user.qualified,
      user.patio,
      user.complement,
      user.neighborhood,
      user.locality,
      user.uf,
    );
  };

  updateUser = async (userData: UserRequest): Promise<UserResponse> => {
    console.log(userData);

    const user = await UserRepository.findOne({
      where: { _id: new ObjectId(userData._id) },
    });
    if (!user) {
      throw new Error("User not found");
    }

    user.birth = userData.birth;
    user.cep = userData.cep;
    user.cpf = userData.cpf;
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;
    user.qualified = userData.qualified;
    (user.patio = userData.patio),
      (user.complement = userData.complement),
      (user.neighborhood = userData.neighborhood),
      (user.locality = userData.locality),
      (user.uf = userData.uf),
      await UserRepository.save(user);

    return new UserResponse(
      user._id,
      user.name,
      user.cpf,
      user.birth,
      user.email,
      user.password,
      user.cep,
      user.qualified,
      user.patio,
      user.complement,
      user.neighborhood,
      user.locality,
      user.uf,
    );
  };

  deleteUser = async (_id: ObjectId) => {
    const User = await UserRepository.findOneOrFail({
      where: { _id },
    });
    if (!User) {
      throw new Error("Car not found");
    }
    await UserRepository.softRemove(User);
    return;
  };

  searchUser = async (_id: ObjectId): Promise<UserResponse> => {
    const user = await UserRepository.findOneOrFail({
      where: { _id },
    });
    if (user) {
      return UserMapper.entityToDTO(user);
    }
    throw new Error("User not found");
  };

  listUser = async (): Promise<UserResponse[]> => {
    const users = await UserRepository.find();
    return UserMapper.entitiesToDTO(users);
  };
}
