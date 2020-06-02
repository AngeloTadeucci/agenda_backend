const { Router } = require("express");
const { database } = require("../db");

const localRouter = Router();

localRouter.get("/", async (req, res) => {
  const results = await database("SELECT * FROM public.local", null);
  res.json({ results });
});

localRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await database("SELECT * FROM public.local WHERE id = $1", [id]);
  res.json({ results });
});

localRouter.post("/", async (req, res) => {
  const { cep } = req.body;
  const { endereco } = req.body;
  const { numero } = req.body;
  const { bairo } = req.body;
  const { complemento } = req.body;
  const { cidade } = req.body;
  const { estado } = req.body;
  const result = await database(
    "INSERT INTO public.local (cep, endereco, numero, bairo, complemento, cidade, estado) VALUES($1,$2,$3,$4,$5,$6,$7);",
    [cep, endereco, numero, bairo, complemento, cidade, estado]
  );
  res.json({ result });
});

localRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await database("DELETE FROM public.local WHERE id=$1", [id]);
  res.json({ result });
});

localRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { cep } = req.body;
  const { endereco } = req.body;
  const { numero } = req.body;
  const { bairo } = req.body;
  const { complemento } = req.body;
  const { cidade } = req.body;
  const { estado } = req.body;
  const result = await database(
    "UPDATE public.local SET cep=$1, endereco=$2, numero=$3, bairo=$4, complemento=$5, cidade=$6, estado=$7 WHERE id=$8;",
    [cep, endereco, numero, bairo, complemento, cidade, estado, id]
  );
  res.json({ result });
});

module.exports = localRouter;
