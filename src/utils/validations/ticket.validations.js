import Joi from "joi";

const createTicketSchema = Joi.object({
    topic: Joi.string().required(),
    description: Joi.string().required(),
    severity: Joi.string().required(),
    type: Joi.string().required(),
});

export { createTicketSchema };
