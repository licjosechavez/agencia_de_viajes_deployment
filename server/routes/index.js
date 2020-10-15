const express = require("express");
const router = express.Router();
// controladores
const nosotrosController = require("../controllers/nosotrosController");
const homeController = require("../controllers/homeController");
const viajesController = require("../controllers/viajesController");
const testimoniosController = require("../controllers/testimoniosController");

module.exports = function () {
  // ruteo
  router.get("/", homeController.consultasHomepage);
  router.get("/nosotros", nosotrosController.infoNosotros);
  router.get("/viajes", viajesController.mostrarViajes);
  router.get("/viajes/:id", viajesController.mostrarViaje);
  router.get("/testimonios", testimoniosController.mostrarTestimonios);
  //cuando se lleno el formulario
  router.post("/testimonios", testimoniosController.agregarTestimonio);

  return router;
};
