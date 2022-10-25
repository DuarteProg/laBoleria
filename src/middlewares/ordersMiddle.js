import ordersSchema from "../schemas/ordersSchema.js";

export function ordersMiddle(req, res, next) {
  const validation = ordersSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(400).send(erros);
    return;
  }
  next();
}
