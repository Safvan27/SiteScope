const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    try {
        const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;
        const decoded = jwt.verify(token, JWT_SECRET || "your-secret-key");
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [
            decoded.userId,
        ]);

        if (result.rows.length === 0) {
            return res.status(403).json({ error: "Invalid token" });
        }

        req.user = result.rows[0];
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }
        next();
    };
};

module.exports = { authenticateToken, authorize };
