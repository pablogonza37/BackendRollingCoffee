import Usuario from "../database/model/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    //verificar si el mail ya existe en la bd
    const emailValidacion = await Usuario.findOne({ email });
    if (emailValidacion) {
      return res.status(400).json({
        mensaje: "Este correo ya se encuentra registrado",
      });
    } // encriptar password
    const saltos = bcrypt.genSaltSync(10);
    const passEncriptada = bcrypt.hashSync(password, saltos);
    const usuarioNuevo = new Usuario(req.body);
    usuarioNuevo.password = passEncriptada;
    await usuarioNuevo.save();
    // agregar un token
    const token = await generarJWT(usuarioNuevo._id, usuarioNuevo.email);

    res.status(201).json({
      mensaje: "El usuario fue creado correctamente",
      email: usuarioNuevo.email,
      nombreUsuario: usuarioNuevo.nombre,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se pudo procesar la solicitud de crear el usuario.",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ mensaje: "No se pudo encontrar la lista de usuarios" });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console, log(error);
    res.status(404).json({ mensaje: "No se encontro el usuario solicitado" });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const usuarioProducto = await Usuario.findById(req.params.id);
    if (!usuarioProducto) {
      return res.status(404).json({
        mensaje: "No se pudo eliminar el usuario, el id es incorrecto.",
      });
    }
    await Usuario.findByIdAndDelete(req.params.id);

    res.status(200).json({ mensaje: "El usuario fue eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar borrar el usuario" });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const buscarUsuario = await Usuario.findById(req.params.id);
    if (!buscarUsuario) {
      return res
        .status(404)
        .json({ mensaje: "No se pudo editar el usuario, el id es incorrecto" });
    }
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res
      .status(200)
      .json({ mensaje: "El usuario fue modificado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar editar un usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //verificar si el mail ya existe en la BD
    const usuarioBuscado = await Usuario.findOne({ email });
    //si no encuentro el mail del usuario
    if (!usuarioBuscado) {
      return res.status(400).json({
        mensaje: "Correo o password incorrecto - correo",
      });
    }

    //verificar el password
    const passwordValido = bcrypt.compareSync(
      password,
      usuarioBuscado.password
    );
    //si el password es erroneo
    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Correo o password incorrecto - password",
      });
    }

    //generar el token nuevamente
    const token = await generarJWT(usuarioBuscado._id, usuarioBuscado.email);
    res.status(200).json({
      mensaje: "Los datos del usuario son correctos",
      email: email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar loguear un usuario.",
    });
  }
};