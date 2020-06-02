const { Router } = require("express");
const { database } = require("../db");

const contatoRouter = Router();

contatoRouter.get("/", async (req, res) => {
  const results = await database("SELECT * FROM public.contato", null);
  res.json({ results });
});

contatoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await database("SELECT * FROM public.contato WHERE idcontato = $1", [id]);
  res.json({ results });
});

contatoRouter.post("/", async (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { telefone } = req.body;
  const { idLocal } = req.body;
  const { idTipoContato } = req.body;
  const result = await database(
    "INSERT INTO public.contato (nome, email, telefone, idlocal, idtipocontato) VALUES($1,$2,$3,$4,$5);",
    [nome, email, telefone, idLocal, idTipoContato]
  );
  res.json({ result });
});

contatoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await database("DELETE FROM public.contato WHERE idcontato=$1", [id]);
  res.json({ result });
});

contatoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const { email } = req.body;
  const { telefone } = req.body;
  const { idLocal } = req.body;
  const { idTipoContato } = req.body;
  const result = await database(
    "UPDATE public.contato SET nome=$1, email=$2, telefone=$3, idlocal=$4, idtipocontato=$5 WHERE idcontato=$6;",
    [nome, email, telefone, idLocal, idTipoContato, id]
  );
  res.json({ result });
});

module.exports = contatoRouter;
