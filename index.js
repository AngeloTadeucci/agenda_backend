import express from "express";
import { Pool } from "pg";

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


app.get("/", (request, response) => {
  
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = result.rows;
    client.end();
    return response.json(results)
  } catch (err) {
    console.error(err);
    return response.json(err)
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Servidor iniciado");
});
