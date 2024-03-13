import { Router } from "express";
import { listarProductos, crearProducto, obtenerProducto, editarProducto } from "../controllers/productos.controllers.js";

const router = Router();

router.route("/productos").get(listarProductos).post(crearProducto);
router.route('/producto/:id').get(obtenerProducto).put(editarProducto)

export default router;
