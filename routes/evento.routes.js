const { Router } = require("express");
require("../db");

const eventoRouter = Router();

eventoRouter.get("/", async (req, res) => {
  const results = await database.executeQuery("SELECT * FROM evento", null);
  res.json({ results });
});

eventoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const results = await database.executeQuery("SELECT * FROM public.evento WHERE idevento = $1", [id]);
  res.json({ results });
});

eventoRouter.post("/", async (req, res) => {
  const { nome } = req.body;
  const { dataHora } = req.body;
  const { idLocal } = req.body;
  const { qtdParticipantes } = req.body;
  const result = await database.executeQuery(
    "INSERT INTO public.evento (nome, datahora, idlocal, qtdparticipantes) VALUES($1, $2, $3, $4);",
    [nome, dataHora, idLocal, qtdParticipantes]
  );
  res.json({ result });
});

eventoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await database.executeQuery("DELETE FROM public.evento WHERE idevento=$1;", [id]);
  res.json({ result });
});

eventoRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const { dataHora } = req.body;
  const { idLocal } = req.body;
  const { qtdParticipantes } = req.body;
  const result = await database.executeQuery(
    "UPDATE public.evento SET nome=$1, datahora=$2, idlocal=$3, qtdparticipantes=$4 WHERE idevento=$5;",
    [nome, dataHora, idLocal, qtdParticipantes, id]
  );
  res.json({ result });
});

module.exports = eventoRouter;
