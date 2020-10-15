const Testimonio = require("../models/Testimonios");

exports.mostrarTestimonios = async (req, res) => {
  const testimonios = await Testimonio.findAll();
  res.render("testimonios", {
    pagina: "Testimonios",
    testimonios: testimonios,
  });
};

exports.agregarTestimonio = async (req, res) => {
  //validar los campos del form
  let { nombre, email, mensaje } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({ mensaje: "Agrega tu nombre" });
  }
  if (!email) {
    errores.push({ mensaje: "Agrega tu email" });
  }
  if (!mensaje) {
    errores.push({ mensaje: "Agrega tu mensaje" });
  }

  // revisar por errores
  if (errores.length > 0) {
    //muestra la vista con errores
    const testimonios = await Testimonio.findAll();

    res.render("testimonios", {
      errores,
      nombre,
      email,
      mensaje,
      pagina: "Testimonios",
      testimonios: "testimonios",
    });
  } else {
    //almacenar en la BD
    Testimonio.create({
      nombre,
      email,
      mensaje,
    })
      .then((testimonio) => res.redirect("/testimonios"))
      .catch((error) => console.log(error));
  }
};
