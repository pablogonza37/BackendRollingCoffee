import { Router } from "express";
import { listarProductos, crearProducto, obtenerProducto, editarProducto, borrarProducto } from "../controllers/productos.controllers.js";

const router = Router();

router.route("/productos").get(listarProductos).post(crearProducto);
router.route('/producto/:id').get(obtenerProducto).put(editarProducto).delete(borrarProducto)

export default router;
