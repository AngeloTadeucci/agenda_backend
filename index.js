const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  // const pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // });
  // try {
  //   const client = await pool.connect();
  //   const result = await client.query("SELECT * FROM tipocontato");
  //   const results = result.rows;
  //   client.end();
  //   return res.json({ results });
  // } catch (err) {
  //   console.error(err);
  //   return res.json(err);
  // }
  executeGetQuery("SELECT * FROM tipocontato", null);
});

app.get("/:id", async (req, res) => {
  // const { id } = req.params;

  // const pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // });
  // try {
  //   const text = "SELECT * FROM public.tipocontato where id = $1";
  //   const values = [id];

  //   const client = await pool.connect();
  //   const result = await client.query(text, values);
  //   const results = result.rows;
  //   client.end();
  //   return res.json({ results });
  // } catch (err) {
  //   console.error(err);
  //   return res.json(err);
  // }
  executeGetQuery("SELECT * FROM public.tipocontato where id = $1", [id]);
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
  const { id } = req.params;

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

app.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    const text = "UPDATE public.tipocontato SET descricao=$1 WHERE id=$2";
    const values = [descricao, id];

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

async function executeGetQuery(text, params) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    const client = await pool.connect();
    const result;
    if (params == null) {
      result = await client.query(text); // SELECT * FROM tipocontato
    } else {
      result = await client.query(text, params);
    }
    const results = result.rows;
    client.end();
    return res.json({ results });
  } catch (err) {
    console.error(err);
    return res.json(err);
  }
}
