import clientsSchema from "../schemas/clientsSchema.js";

export function clientsMiddle(req, res, next){
    const validation = clientsSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const erros = validation.error.details.map((detail) => detail.message);
      res.status(400).send(erros);
      return;
    }
    next();
}