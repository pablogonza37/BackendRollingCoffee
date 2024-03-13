import Producto from "../database/model/producto.js";

export const listarProductos = async (req, res) => {
  try {
    // pedir a la base de datos la lista de coleccion de productos
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ mensaje: "No se pudo encontrar la lista de producctos" });
  }
};

export const obtenerProducto = async (req, res)=>{
try{
console.log(req.params.id)
//si encontre el producto
const productoBuscado = await Producto.findById(req.params.id);
res.status(200).json(productoBuscado);
}catch (error){
  console,log(error);
  res.status(404).json({mensaje: 'No se encontro el producto solicitado'});
}
}

export const crearProducto = async (req, res) => {
  try {
    // verificar los datos del body
    console.log(req.body);
    //validar los datos
    // pedir a la BD crear el producto
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    // enviar el status 201
    res.status(201).json({
      mensaje: "El producto fue creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se pudo procesar la solicitud de crear producto.",
    });
  }
};
