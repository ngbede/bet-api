import { Router } from "express";
import { getBetSlip } from "../controllers/bet-slip-controller";

const betSlipRouter = Router()

betSlipRouter.get("/bet-slip/:code", getBetSlip)

export default betSlipRouter
