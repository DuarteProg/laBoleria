import joi from "joi"

const clientsSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.number().integer().min(10).max(11).required()
});

export default clientsSchema;