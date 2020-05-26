const { Router } = require("express");

const tipoContatoRouter = require("./tipoContato.routes");
const eventoRounter = require("./evento.routes");

const routes = Router();

routes.use("/tipocontato", tipoContatoRouter);
routes.use("/evento", eventoRounter);
// routes.use("/contato", tipoContatoRouter);

module.exports = routes;
