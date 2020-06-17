const { Router } = require("express");
const { runQuery } = require("../db");

const tipoContatoRouter = Router();

tipoContatoRouter.get("/", async (req, res) => {
  const result = await runQuery("SELECT * FROM tipocontato", null);
  res.json(result);
});

tipoContatoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await runQuery("SELECT * FROM public.tipocontato where id = $1", [id]);
  res.json(result);
});

tipoContatoRouter.post("/", async (req, res) => {
  const { descricao } = req.body;
  const result = await runQuery("INSERT INTO public.tipocontato (descricao) VALUES($1);", [descricao]);
  res.json(result);
});

tipoContatoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await runQuery("DELETE FROM public.tipocontato WHERE id=$1;", [id]);
  res.json(result);
});

tipoContatoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;
  const result = await runQuery("UPDATE public.tipocontato SET descricao=$1 WHERE id=$2", [descricao, id]);
  res.json(result);
});

module.exports = tipoContatoRouter;
