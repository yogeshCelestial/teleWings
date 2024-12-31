import db from './../db/index.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    const queryTextUsername = `SELECT * FROM users WHERE username = $1 LIMIT 1;`;
    const userByUsername = await db.query(queryTextUsername, [username]);

    const queryTextEmail = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;
    const userByEmail = await db.query(queryTextEmail, [email]);

    // first check for username exist or not
    if (userByUsername.rows.length) {
        res.status(409).send({ message: 'Username already exists!' });
    }
    // check for email exist or not
    else if (userByEmail.rows.length) {
        res.status(409).send({message: 'Email already exists!'});
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const queryText = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [username, email, hash];
        try {
            const result = await db.query(queryText, values);
            generateTokenAndSetCookie(result.rows[0].id, res);
            res.status(200).json(result.rows[0]);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    const queryText = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;
    const user = await db.query(queryText, [email]);
    const hash = user?.rows[0]?.password;
    if (hash) {
        bcrypt.compare(password, hash).then((result) => {
            if(result === true) {
                generateTokenAndSetCookie(user.rows[0].id, res);
                const { email, username } = user?.rows[0];
                res.status(200).json({ email, username });
            } else {
                res.status(401).json("Unauthorized");
            }
        });
    } else {
        res.status(404).json("User not found");
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logged out Successfully' });
};

const verify = async (req, res) => {
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
                    res.status(200).json({ user: user.rows[0], message: "Authorised successfully" });
                } else {
                    res.status(401).send('Unauthorized - User not found');
                }
            }
        }
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export { signup, login, logout, verify };