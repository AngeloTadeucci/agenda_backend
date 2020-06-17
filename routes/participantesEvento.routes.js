const { Router } = require("express");
const { runQuery } = require("../db");

const participantesEventoRouter = Router();

participantesEventoRouter.get("/", async (req, res) => {
  const result = await runQuery("SELECT * FROM public.participantesevento", null);
  res.json(results);
});

participantesEventoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await runQuery("SELECT * FROM public.participantesevento WHERE idevento = $1", [id]);
  res.json(results);
});

participantesEventoRouter.post("/", async (req, res) => {
  const { idevento } = req.body;
  const { idcontato } = req.body;
  const { confirmacao } = req.body;
  const result = await runQuery(
    "INSERT INTO public.participantesevento (idevento, idcontato, confirmacao) VALUES($1,$2,$3);",
    [idevento, idcontato, confirmacao]
  );
  res.json(result);
});

participantesEventoRouter.delete("/:idEvento/:idContato", async (req, res) => {
  const { idevento  } = req.params;
  const { idcontato } = req.params;
  const result = await runQuery("DELETE FROM public.participantesevento WHERE idevento = $1 andd idcontato = $2", [idevento, idcontato]);
  res.json(result);
});

participantesEventoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { idevento } = req.body;
  const { idcontato } = req.body;
  const { confirmacao } = req.body;
  const result = await runQuery("UPDATE public.participantesevento SET idevento=$1, idcontato=$2, confirmacao=$3;", [
    idevento,
    idcontato,
    confirmacao,
    id,
  ]);
  res.json(result);
});

module.exports = participantesEventoRouter;
