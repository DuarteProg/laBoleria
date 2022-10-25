import {Router} from "express";
import {postCakes} from "../controllers/cakesControllers.js";
import { cakesMiddle } from "../middlewares/cakesMiddle.js";


const cakesRouter = Router();

cakesRouter.post("/cakes",cakesMiddle ,postCakes);


export default cakesRouter;