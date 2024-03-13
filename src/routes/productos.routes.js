import { Router } from "express";
import { listarProductos, crearProducto } from "../controllers/productos.controllers.js";

const router = Router();

router.route("/productos").get(listarProductos).post(crearProducto);

export default router;
