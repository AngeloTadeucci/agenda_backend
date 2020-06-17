const { Router } = require("express");
const { runQuery } = require("../db");

const contatoRouter = Router();

contatoRouter.get("/", async (req, res) => {
  const result = await runQuery("SELECT * FROM public.contato", null);
  res.json(result);
});

contatoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await runQuery("SELECT * FROM public.contato WHERE idcontato = $1", [id]);
  res.json(result);
});

contatoRouter.post("/", async (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { telefone } = req.body;
  const { idLocal } = req.body;
  const { idTipoContato } = req.body;
  const result = await runQuery(
    "INSERT INTO public.contato (nome, email, telefone, idlocal, idtipocontato) VALUES($1,$2,$3,$4,$5);",
    [nome, email, telefone, idLocal, idTipoContato]
  );
  res.json(result);
});

contatoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await runQuery("DELETE FROM public.contato WHERE idcontato=$1", [id]);
  res.json(result);
});

contatoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const { email } = req.body;
  const { telefone } = req.body;
  const { idLocal } = req.body;
  const { idTipoContato } = req.body;
  const result = await runQuery(
    "UPDATE public.contato SET nome=$1, email=$2, telefone=$3, idlocal=$4, idtipocontato=$5 WHERE idcontato=$6;",
    [nome, email, telefone, idLocal, idTipoContato, id]
  );
  res.json(result);
});

module.exports = contatoRouter;
