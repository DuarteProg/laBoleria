import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./src/routes/Routes.js"

dotenv.config();
const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(json());
server.use(router);
/*
rota cake: description: joi.string(), //validar string
image: joi.string().uri().required() //link valido
*/


server.listen(PORT, () => {
  console.log(`Servidor funcionandona na porta ${PORT}`);
});