import Agent from "../models/agent.model.js";
import { CreateToken } from "../utils/create-token.js";
import { Cypher, Decypher } from "../utils/cypher-decypher.js";
import { agentRegisterSchema } from "../utils/validations/agent.validations.js";

const agentRegister = async (req, res) => {
    try {
        const { error, value } = agentRegisterSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                error: error.details[0].message,
            });
        }

        const { name, email, phone, description, password } = value;

        const agentExist = await Agent.findOne({ $or: [{ email }, { phone }] });
        if (agentExist) {
            return res.status(400).json({
                success: false,
                message: "Agent already exist",
            });
        }

        const newAgent = await Agent.create({
            name,
            email,
            phone,
            description,
            password: Cypher(password),
        });

        const accessToken = CreateToken({ _id: newAgent._id });

        const { password: userPassword, ...agentData } = newAgent._doc;

        res.status(200).json({
            success: true,
            agent: agentData,
            message: "Agent created successfully",
            accessToken,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error?.message || "Something went wrong",
        });
    }
};

const agentLogin = async (req, res) => {
    try {
        const { email, password, phone } = req.body;
        const agentExist = await Agent.findOne({
            $or: [{ email }, { phone }],
        });

        if (!agentExist) {
            return res
                .status(400)
                .json({ success: false, message: "Agent not found" });
        }

        if (!Decypher(password, agentExist.password)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }

        const { password: agentPassword, ...agentData } = agentExist._doc;

        const accessToken = CreateToken({ _id: agentData._id });

        res.status(200).json({
            success: true,
            agent: agentData,
            message: "Agent login successfull",
            accessToken,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error?.message || "Something went wrong",
        });
    }
};

export { agentLogin, agentRegister };
