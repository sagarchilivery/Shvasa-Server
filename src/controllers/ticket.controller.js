import Agent from "../models/agent.model.js";
import LastIndex from "../models/last-index.model.js";
import Ticket from "../models/ticket.model.js";
import { createTicketSchema } from "../utils/validations/ticket.validations.js";

const createTicket = async (req, res) => {
    try {
        const { error, value } = createTicketSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: error.details[0].message,
            });
        }
        const { topic, description, severity, type } = value;

        // Get the list of active agents
        const activeAgents = await Agent.find({ active: true });

        if (activeAgents.length === 0) {
            return res.status(400).json({
                success: false,
                error: "No active agents available for ticket assignment.",
            });
        }

        // Find the next agent using round-robin assignment logic
        const lastIndexUpdate = await LastIndex.findOneAndUpdate(
            {},
            { $inc: { lastAssignedAgentIndex: 1 } },
            { new: true, upsert: true }
        );
        const lastAssignedAgentIndex = lastIndexUpdate.lastAssignedAgentIndex;

        const nextAgentIndex = lastAssignedAgentIndex % activeAgents.length;
        const nextAgent = activeAgents[nextAgentIndex];

        const ticket = new Ticket({
            topic,
            description,
            severity,
            type,
            assignedTo: nextAgent._id,
        });
        await ticket.save();

        res.status(200).json({
            success: true,
            ticket,
            message: "Ticket created successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error?.message || "Something went wrong",
        });
    }
};

const getAllTickets = async (req, res) => {
    try {
        // Extract filter parameters from the query string
        const { status, assignedTo, severity, type } = req.query;

        // Build the filter object based on the provided parameters
        const filter = {};
        if (status) filter.status = status;
        if (assignedTo) filter.assignedTo = assignedTo; // Assuming assignedTo is the ObjectId of the Agent
        if (severity) filter.severity = severity;
        if (type) filter.type = type;

        // Extract sort and pagination parameters from the query string
        const { sortField, sortOrder, page, pageSize } = req.query;

        // Build the sort object based on the provided parameters
        const sort = {};
        if (sortField) sort[sortField] = sortOrder === "desc" ? -1 : 1;

        // Calculate the skip value for pagination
        const skip = (page - 1) * pageSize;

        // Fetch the total count of documents based on the provided filter
        const totalCount = await Ticket.countDocuments(filter);

        // Set the X-Total-Count header in the response
        res.setHeader("X-Total-Count", totalCount);

        // Fetch tickets with filtering, sorting, and pagination
        const tickets = await Ticket.find(filter)
            .populate({
                path: "assignedTo",
                select: "name",
            })
            .sort(sort)
            .skip(skip)
            .limit(parseInt(pageSize));

        if (tickets.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No tickets present",
                tickets: [],
            });
        }

        res.status(200).json({
            success: true,
            message: "Tickets fetched successfully",
            tickets,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error?.message || "Something went wrong",
        });
    }
};

export { createTicket, getAllTickets };
