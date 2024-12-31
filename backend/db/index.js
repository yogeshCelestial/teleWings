import configDotenv from "dotenv";
import pg from 'pg';
const { Pool } = pg;

configDotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

// Function to query the database
const query = (text, params) => pool.query(text, params);

export default { pool, query };