import db from "../db/index.js";

export const getRoomsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const query = 'SELECT * FROM rooms WHERE (user_one = $1 OR user_two = $1)';
        const result = await db.query(query, [userId]);
        if (result.rows?.[0]) {
            res.status(200).json({ data: result.rows });
        }
        } catch (err) {
        res.status(500).json({ message: 'Something Went Wrong!'});
    }

}