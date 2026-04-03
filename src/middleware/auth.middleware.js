import jwt, { decode } from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{
    try {
        const authHeader = req.head.authorization;

        if(!authHeader){
            return res.status(401).json({message:"No token provided"});
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userID = decoded.id;
    } catch (error) {
        return res.status(400).json({
            message:"Invalid token"
        });
    }
}