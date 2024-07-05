import Joi from "joi";

export default Joi.object({
  _id: Joi.required(),
  model: Joi.string().required(),
  color: Joi.string().required(),
  year: Joi.string().required(),
  value_per_day: Joi.number().required(),
  accessories: Joi.array().items(Joi.string()).required(),
  number_of_passengers: Joi.number().required(),
});
