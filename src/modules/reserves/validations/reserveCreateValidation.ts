import Joi from "joi";

export default Joi.object({
  start_date: Joi.string().required(),
  end_date: Joi.string().required(),
  id_car: Joi.required(),
  id_user: Joi.required(),
});
