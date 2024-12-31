import db from "./../db/index.js";

const getUser = async(req, res) => {
    try {
        const id = req.params.id;
        const getUserQuery = 'SELECT username FROM users WHERE id = $1';
        const result = await db.query(getUserQuery, [id]);
        console.log(result);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Something Went Wrong'});
    }
}

export { getUser };