const { Router } = require("express");
const { Pool } = require("pg");

const tipoContatoRouter = Router();

tipoContatoRouter.get("/", async (req, res) => {
  const results = await executeQuery("SELECT * FROM tipocontato", null);
  res.json({ results });
});

tipoContatoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await executeQuery("SELECT * FROM public.tipocontato where id = $1", [id]);
  res.json({ results });
});

tipoContatoRouter.post("/", async (req, res) => {
  const { descricao } = req.body;
  const result = await executeQuery("INSERT INTO public.tipocontato (descricao) VALUES($1);", [descricao]);
  res.json({ result });
});

tipoContatoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await executeQuery("DELETE FROM public.tipocontato WHERE id=$1;", [id]);
  res.json({ result });
});

tipoContatoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;
  const result = await executeQuery("UPDATE public.tipocontato SET descricao=$1 WHERE id=$2", [descricao, id]);
  res.json({ result });
});

async function executeQuery(text, params) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    const client = await pool.connect();
    let result = null;
    if (params == null) {
      result = await client.query(text);
    } else {
      result = await client.query(text, params);
    }
    const results = result.rows;
    client.end();
    return results;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = tipoContatoRouter;
