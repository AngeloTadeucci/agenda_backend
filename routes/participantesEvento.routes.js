const { Router } = require("express");
const { runQuery } = require("../db");

const participantesEventoRouter = Router();

participantesEventoRouter.get("/", async (req, res) => {
  const result = await runQuery("SELECT * FROM public.participantesevento", null);
  res.json(result);
});

participantesEventoRouter.get("/:idEvento/:idContato", async (req, res) => {
  const { idEvento  } = req.params;
  const { idContato } = req.params;
  const result = await runQuery("SELECT * FROM public.participantesevento WHERE idevento = $1 and idcontato = $2", [idEvento,idContato]);
  res.json(result);
});

participantesEventoRouter.post("/", async (req, res) => {
  const { idEvento } = req.body;
  const { idContato } = req.body;
  const { confirmacao } = req.body;
  const result = await runQuery(
    "INSERT INTO public.participantesevento (idevento, idcontato, confirmacao) VALUES($1,$2,$3);",
    [idEvento, idContato, confirmacao]
  );
  res.json(result);
});

participantesEventoRouter.delete("/:idEvento/:idContato", async (req, res) => {
  const { idEvento  } = req.params;
  const { idContato } = req.params;
  const result = await runQuery("DELETE FROM public.participantesevento WHERE idevento = $1 and idcontato = $2", [idEvento, idContato]);
  res.json(result);
});

participantesEventoRouter.patch("/:idEvento/:idContato", async (req, res) => {
  const { idEvento } = req.params;
  const { idContato } = req.params;
  const { confirmacao } = req.body;
  const result = await runQuery("UPDATE public.participantesevento SET confirmacao=$3 where idevento = $1 and idcontato=$2", [
    idEvento,
    idContato,
    confirmacao
  ]);
  res.json(result);
});

module.exports = participantesEventoRouter;
