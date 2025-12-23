import pkg from "jsonwebtoken";
const { verify } = pkg;

const getUserIdFromToken = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Token is missing");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verify(token, process.env.JWT_SECRET || "skey");
        return decoded.id; // or decoded.userId if you use that
    } catch (error) {
        console.log("JWT Error:", error);
        throw new Error("Invalid token");
    }
};

export default getUserIdFromToken;
