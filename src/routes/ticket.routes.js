import express from "express";
import {
    changeStatusOfTicket,
    createTicket,
    getAllTickets,
    getTicketById,
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

// get ticket by ID
ticketRoute.get("/:id", getTicketById);

// get ticket by ID
ticketRoute.patch("/:id", verifyToken, changeStatusOfTicket);

export default ticketRoute;
