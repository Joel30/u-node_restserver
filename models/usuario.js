// {
//   nombre: "";
//   correo: "mail@mail.com";
//   password: "lkasjfjelkjfiej342342432";
//   img: "234444432l4234lk";
//   rol: "20958989";
//   estado: false;
//   google: true; // si usuario fue creado por google o mi sistema de autenticación
//   sdf: ""
// }
const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function() {

  const {__v, password, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
