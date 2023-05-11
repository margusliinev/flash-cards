import { Pool, QueryResult } from 'pg';

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
});

export async function query(text: string, params?: any[]): Promise<QueryResult> {
    const result = await pool.query(text, params);
    return result;
}
