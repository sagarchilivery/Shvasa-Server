import express from "express";
import { agentLogin, agentRegister } from "../controllers/agent.controller.js";

const agentRoute = express.Router();

agentRoute.post("/", agentRegister);

agentRoute.post("/login", agentLogin);

export default agentRoute;
