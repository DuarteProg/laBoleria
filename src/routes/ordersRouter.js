import { Router } from "express";
import { postOrders, getOrders, getOrdersId} from "../controllers/ordersControllers.js";
import { ordersMiddle } from "../middlewares/ordersMiddle.js";

const ordersRouter = Router();

ordersRouter.post("/orders", ordersMiddle, postOrders);
ordersRouter.get("/orders", getOrders)
ordersRouter.get("/orders/:id", getOrdersId)

export default ordersRouter;
