import jwt from 'jsonwebtoken';
import db from "../db/index.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).send('Unauthorized - No token provided');
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded?.userId) {
                res.status(401).send('Unauthorized - Invalid token');
            } else {
                const queryText = `SELECT id, username, email, created_at FROM users WHERE id = $1 LIMIT 1;`;
                const user = await db.query(queryText, [decoded?.userId]);
                if (user && user.rows?.[0]) {
                    req.user = user.rows[0];
                    next();
                } else {
                    res.status(401).send('Unauthorized - User not found');
                }
            }
        }
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export default authMiddleware;