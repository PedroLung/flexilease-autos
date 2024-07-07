import Joi from "joi";

export default Joi.object({
  model: Joi.string().required(),
  color: Joi.string().required(),
  year: Joi.string()
    .regex(/^(19[5-9][0-9]|20[0-1][0-9]|202[0-3])$/)
    .message("The car's year of manufacture must be between 1950 and 2023")
    .required(),
  value_per_day: Joi.number().required(),
  accessories: Joi.array().items(Joi.object()).unique().min(1).required(),
  number_of_passengers: Joi.number().required(),
});
