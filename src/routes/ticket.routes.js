import express from "express";
import {
    createTicket,
    getAllTickets,
    getTicketsOfAgent,
} from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const ticketRoute = express.Router();

// create a ticket
ticketRoute.post("/", createTicket);

// get all tickets
ticketRoute.get("/", getAllTickets);

// get all agent tickets
ticketRoute.get("/agent", verifyToken, getTicketsOfAgent);

export default ticketRoute;
