import jwt from "jsonwebtoken";

function CreateToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 1000 * 60 * 60 * 24 * 365,
        });
        return token;
    } catch (error) {
        console.log("Error occured at creation of token: ", error);
    }
}

export { CreateToken };
