import jwt from "jsonwebtoken";

export const isAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json("user is not authenticate");
        }
        const decode = await jwt.verify(token, process.env.jwtSecret);
        if (!decode) {
            res.json('Invalid token');
        }
        req.id = decode.id;
        next();
    } catch (error) {
        res.json(error.message);
    }
}