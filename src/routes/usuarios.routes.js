import { Router } from "express";
import { borrarUsuario, crearUsuario, editarUsuario, listarUsuarios, obtenerUsuario } from "../controllers/usuarios.controllers.js";
import validacionesUsuario from "../helpers/validacionUsuario.js";

const router = Router();

router.route("/usuarios").post([validacionesUsuario], crearUsuario).get(listarUsuarios);
router.route("/usuarios/:id").get(obtenerUsuario).delete(borrarUsuario).put(editarUsuario);

export default router;