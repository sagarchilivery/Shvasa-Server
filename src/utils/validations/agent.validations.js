import Joi from "joi";

const agentRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    description: Joi.string().required(),
    password: Joi.string()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        )
        .required()
        .messages({
            "string.pattern.base":
                "Password must have at least 6 characters, one upper and lower case letter, one special character, and one number",
        }),
});

export { agentRegisterSchema };
