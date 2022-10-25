import {Router} from "express";
import {postClients, getClients} from "../controllers/clientsControllers.js";
import { clientsMiddle } from "../middlewares/clientsMiddle.js";


const clientsRouter = Router();

clientsRouter.post("/clients",clientsMiddle ,postClients);
clientsRouter.get("/clients/:id/orders",getClients);

export default clientsRouter;