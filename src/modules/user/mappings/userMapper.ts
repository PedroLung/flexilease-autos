import User from "../entity/User";
import UserResponse from "../response/UserResponse";

export default class UserMapper {
  public static entitiesToDTO(users: User[]) {
    const userResponse = [];

    for (const user of users) {
      const userDTO = new UserResponse(
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
      userResponse.push(userDTO.toJson() as UserResponse);
    }
    return userResponse;
  }

  public static entityToDTO(user: User) {
    const userDTO = new UserResponse(
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
    return userDTO.toJson() as UserResponse;
  }
}
