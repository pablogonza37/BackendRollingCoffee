import { Router } from "express";
import {
  listarProductos,
  crearProducto,
  obtenerProducto,
  editarProducto,
  borrarProducto,
} from "../controllers/productos.controllers.js";
import validacionesProducto from "../helpers/validacionProducto.js";

const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post([validacionesProducto], crearProducto);
router.route("/productos/:id").get(obtenerProducto).put(editarProducto).delete(borrarProducto);

export default router;
