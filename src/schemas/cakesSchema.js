import joi from "joi"

const cakesSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().integer().min(1).required(),
    description: joi.string(), //validar string
    image: joi.string().uri().required() //link valido
});

export default cakesSchema;