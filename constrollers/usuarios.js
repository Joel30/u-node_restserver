const { response, request } = require("express"); //Redundante, no necesario

const usuariosGet = (req = request, res = response) => {

  // query params
  const query = req.query;
  
  res.json({
    msg: "get API - controlador",
    query,
  });
};

const usuariosPut = (req, res) => {
  const id = req.params.id;

  res.json({
    msg: "put API",
    id,
  });
};
const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API",
    nombre,
    edad,
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
