import pg from 'pg';
import dotenv from 'dotenv';
// import postgres from 'postgres';

dotenv.config();

// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// const sql = postgres({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: 'require',
//   connection: {
//     options: `project=${ENDPOINT_ID}`,
//   },
// });

const pool = new pg.Pool();
// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const query = (text, params) => pool.query(text, params);

export { pool, query };
