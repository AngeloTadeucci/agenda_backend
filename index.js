const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello world" });
});
porta = 8080;

app.listen(porta, () => {
  console.log("Servidor iniciado em porta: %", porta);
});
