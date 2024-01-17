import express from "express";
import {
    agentLogin,
    agentLogout,
    agentRegister,
} from "../controllers/agent.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const agentRoute = express.Router();

agentRoute.post("/", agentRegister);

agentRoute.post("/login", agentLogin);

agentRoute.post("/logout", verifyToken, agentLogout);

export default agentRoute;
