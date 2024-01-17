import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "https://shvasa-client.vercel.app"],
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(helmet());

//routes import
import agentRoute from "./routes/agent.routes.js";
import ticketRoute from "./routes/ticket.routes.js";

//routes declaration
app.get("/api/health-check", (req, res) => {
    res.send("OK");
});
app.use("/api/support-agents", agentRoute);
app.use("/api/support-tickets", ticketRoute);

export { app };
