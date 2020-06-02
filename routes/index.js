const { Router } = require("express");

const tipoContatoRouter = require("./tipoContato.routes");
const eventoRouter = require("./evento.routes");
const contatoRouter = require("./contato.routes");
const localRouter = require("./local.routes");
const participantesEventoRouter = require("./participantesEvento.routes");

const routes = Router();

routes.use("/tipocontato", tipoContatoRouter);
routes.use("/evento", eventoRouter);
routes.use("/contato", contatoRouter);
routes.use("/local", localRouter);
routes.use("/participantesEvento", participantesEventoRouter);

module.exports = routes;
