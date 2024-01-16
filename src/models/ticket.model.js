import mongoose from "mongoose";

const TicketSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ticketCreatedOn: {
        type: Date,
        default: Date.now,
    },
    severity: {
        type: String,
        enum: ["Low", "Moderate", "Critical"],
    },
    type: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        required: true,
    },
    status: {
        type: String,
        enum: ["New", "Assigned", "Resolved"],
        default: "New",
    },
    resolvedOn: {
        type: Date,
    },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
