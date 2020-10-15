const Viaje = require("../models/Viajes");
const Testimonio = require("../models/Testimonios");

exports.consultasHomepage = async (req, res) => {
  const viajes = await Viaje.findAll({
    limit: 3,
  });
  const testimonios = await Testimonio.findAll({
    limit: 3,
  });

  res.render("index", {
    pagina: "Próximos viajes",
    clase: "home",
    viajes,
    testimonios,
  });
};
