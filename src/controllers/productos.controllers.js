import Producto from "../database/model/producto.js";

export const listarProductos = (req, res) => {
  console.log("desde listar productos");
  res.send("Enviar lista de productos...");
};

export const crearProducto = async (req, res) => {
  try {
    // verificar los datos del body
    console.log(req.body)
    //validar los datos
    // pedir a la BD crear el producto
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    // enviar el status 201
    res.status(201).json({
      mensaje: "El producto fue creado correctamente"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se pudo procesar la solicitud de crear producto.",
    });
  }
};
