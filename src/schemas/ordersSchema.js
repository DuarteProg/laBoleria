import joi from "joi";

const ordersSchema = joi.object({
  clientId: joi.number().required(),
  cakeId: joi.number().required(),
  quantity: joi.number().integer().min(1).max(4).required(),
  totalPrice: joi.number().required(),
});

export default ordersSchema;
