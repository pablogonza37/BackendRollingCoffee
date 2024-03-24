import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesUsuario = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre del usuario es un dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del usuario debe tener entre 2 y 50 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El email es un dato obligatorio")
    .matches(/^\S+@\S+$/i)
    .withMessage("El email debe tener un formato valido"),
  check("password")
    .notEmpty()
    .withMessage("La contraseña es un dato obligatorio")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  check("confirmarContraseña")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    })
    .withMessage("Las contraseñas no coinciden"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesUsuario;