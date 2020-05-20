const express  = require("express");
const { Pool } = require("pg");

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
    const result = await client.query('SELECT * FROM contato');
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
