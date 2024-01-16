import mongoose from "mongoose";

const AgentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        agentCreatedOn: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

const Agent = mongoose.model("Agent", AgentSchema);

export default Agent;
