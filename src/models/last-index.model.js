// LastIndex model
import mongoose from "mongoose";

const LastIndexSchema = mongoose.Schema(
    {
        lastAssignedAgentIndex: {
            type: Number,
            default: -1,
        },
    },
    { timestamps: true }
);

const LastIndex = mongoose.model("LastIndex", LastIndexSchema);

export default LastIndex;
