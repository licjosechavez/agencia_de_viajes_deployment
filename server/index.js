// importar express
const express = require("express");
const path = require("path");
const routes = require("./routes");
const configs = require("./config");
const db = require("./config/database");
require("dotenv").config({ path: "variables.env" });
const bodyParser = require("body-parser");

// probar conexion a la BD
db.authenticate()
  .then(() => console.log("DB conectada"))
  .catch((error) => console.log(error));

// configurar express
const app = express();

// habilitar pug
app.set("view engine", "pug");

// añadir las vistas

app.set("views", path.join(__dirname, "../views"));

// cargar una carpeta estatica publica
app.use(express.static("public"));

// validar si estamos en desarrollo o produccion
const config = configs[app.get("env")];

// creamos la variable para el sitio web
app.locals.titulo = config.nombreSitio;

// muestra el año actual y genera la ruta
app.use((req, res, next) => {
  // crear una fecha nueva
  const fecha = new Date();
  res.locals.fechaActual = fecha.getFullYear();
  res.locals.ruta = req.path;
  console.log(res.locals.ruta);
  return next();
});

//ejecutamos el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
//cargar las rutas
app.use("/", routes());

// puerto y host para la app
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3004;
app.listen(port, host, () => {
  console.log("El servidor esta funcionando.-");
});
