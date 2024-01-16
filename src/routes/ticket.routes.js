import express from "express";
import { createTicket, getAllTickets } from "../controllers/ticket.controller.js";

const ticketRoute = express.Router();

// create a ticket
ticketRoute.post("/", createTicket);

// get all tickets
ticketRoute.get("/", getAllTickets);

export default ticketRoute;
