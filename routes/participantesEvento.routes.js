const { Router } = require("express");
const { database } = require("../db");

const participantesEventoRouter = Router();

participantesEventoRouter.get("/", async (req, res) => {
  const results = await database("SELECT * FROM public.participantesevento", null);
  res.json({ results });
});

participantesEventoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await database("SELECT * FROM public.participantesevento WHERE idevento = $1", [id]);
  res.json({ results });
});

participantesEventoRouter.post("/", async (req, res) => {
  const { idevento } = req.body;
  const { idcontato } = req.body;
  const { confirmacao } = req.body;
  const result = await database(
    "INSERT INTO public.participantesevento (idevento, idcontato, confirmacao) VALUES($1,$2,$3);",
    [idevento, idcontato, confirmacao]
  );
  res.json({ result });
});

participantesEventoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await database("DELETE FROM public.participantesevento WHERE idevento = $1", [id]);
  res.json({ result });
});

participantesEventoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { idevento } = req.body;
  const { idcontato } = req.body;
  const { confirmacao } = req.body;
  const result = await database("UPDATE public.participantesevento SET idevento=$1, idcontato=$2, confirmacao=$3;", [
    idevento,
    idcontato,
    confirmacao,
    id,
  ]);
  res.json({ result });
});

module.exports = participantesEventoRouter;
