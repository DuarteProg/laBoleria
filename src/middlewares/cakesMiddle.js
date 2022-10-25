import cakesSchema from "../schemas/cakesSchema.js";

export function cakesMiddle(req, res, next){
    const validation = cakesSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const erros = validation.error.details.map((detail) => detail.message);
      res.status(400).send(erros);
      return;
    }
    next();
}