const { Router } = require("express");
const { check } = require("express-validator");

const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");

const { coleccionesPermitidas } = require("../helpers");
const { validarCampos, validarArchivoSubir } = require("../middlewares");

const router = Router();

router.get(
  "/:coleccion/:id",
  [
    check("id", "Debe ser un id mongo válido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

router.post("/", validarArchivoSubir, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "Debe ser un id mongo válido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  // actualizarImagen // Local
  actualizarImagenCloudinary // En la nube
);

module.exports = router;
