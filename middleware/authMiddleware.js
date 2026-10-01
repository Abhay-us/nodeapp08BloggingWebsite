const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Authenticaion Token is Required"
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid Token format" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication Token is Required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PUBLIC_SECRET_KEY);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid/Expired Token Found" });
    }

}
module.exports = authenticationToken;
