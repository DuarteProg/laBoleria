import joi from "joi"
const urlPattern = new RegExp(
    "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
  );

const cakesSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().integer().min(1).required(),
    description: joi.string(),
    image: joi.string().regex(urlPattern).required() 
});

export default cakesSchema;