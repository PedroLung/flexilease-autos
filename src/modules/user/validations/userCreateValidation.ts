import Joi from "joi";

export default Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string()
    .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{11})$/)
    .message("Enter a valid CPF.")
    .required(),
  birth: Joi.string()
    .regex(/^(0?[1-9]|[12][0-9]|3[01])\/\d{2}\/\d{4}$/)
    .message("Enter a valid date.")
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cep: Joi.string().required(),
  qualified: Joi.string()
    .regex(/^(sim|não)$/)
    .message("Sim/Não")
    .required(),
});
