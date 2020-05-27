const { Router } = require("express");
const database = require("../db/database");

const tipoContatoRouter = Router();

tipoContatoRouter.get("/", async (req, res) => {
  const results = await database.executeQuery("SELECT * FROM tipocontato", null);
  res.json({ results });
});

tipoContatoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await database.executeQuery("SELECT * FROM public.tipocontato where id = $1", [id]);
  res.json({ results });
});

tipoContatoRouter.post("/", async (req, res) => {
  const { descricao } = req.body;
  const result = await database.executeQuery("INSERT INTO public.tipocontato (descricao) VALUES($1);", [descricao]);
  res.json({ result });
});

tipoContatoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await database.executeQuery("DELETE FROM public.tipocontato WHERE id=$1;", [id]);
  res.json({ result });
});

tipoContatoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;
  const result = await database.executeQuery("UPDATE public.tipocontato SET descricao=$1 WHERE id=$2", [descricao, id]);
  res.json({ result });
});

module.exports = tipoContatoRouter;
