import Joi from "joi";

export default Joi.object({
  _id: Joi.required(),
  name: Joi.string().required(),
  cpf: Joi.string().required(),
  birth: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  cep: Joi.string().required(),
  qualified: Joi.string().required(),
});
