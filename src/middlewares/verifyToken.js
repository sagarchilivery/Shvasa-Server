import jwt from "jsonwebtoken";

// Middleware to verify the access token
const verifyToken = (req, res, next) => {
    const accessToken =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!accessToken) {
        return res
            .status(401)
            .json({ message: "Unauthorized: Access token is missing" });
    }

    const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
    );

    req._id = decodedToken._id;
    next();
};

export { verifyToken };
