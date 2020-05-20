const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM tipocontato");
    const results = result.rows;
    client.end();
    return res.json({ results });
  } catch (err) {
    console.error(err);
    return res.json(err);
  }
});

app.post("/", async (req, res) => {
  const { descricao } = req.body;

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    const text = "INSERT INTO public.tipocontato (descricao) VALUES($1);";
    const values = [descricao];

    const client = await pool.connect();
    const result = await client.query(text, values);
    const results = result.rows;
    client.end();
    return res.json({ results });
  } catch (err) {
    console.error(err);
    return res.json(err);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = request.params;

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    const text = "DELETE FROM public.tipocontato WHERE id=$1;";
    const values = [id];

    const client = await pool.connect();
    const result = await client.query(text, values);
    const results = result.rows;
    client.end();
    return res.json({ results });
  } catch (err) {
    console.error(err);
    return res.json(err);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Servidor iniciado");
});
