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

export const editarProducto = async (req,res) =>{
  try{
    // extrer el id y buscar el producto
    //si no encuentro el id responder con un mensaje de error
    const buscarProducto = await Producto.findById(req.params.id);
    // si no encontre el producto
    if(!buscarProducto){
      return res.status(404).json({mensaje: 'No se pudo editar el producto, el id es incorrecto'});
    }
    //pedir a la BD modificar el producto que tiene tal id, con los datos req.body
    await Producto.findByIdAndUpdate(req.params.id, req.body)
    //contestar con un mensaje que todo salio bien
    res.status(200).json({mensaje: 'El producto fue modificado correctamente'});
  }catch (error){
    console.error(error);
    res.status(500).json({mensaje: 'Ocurrio un error al intentar editar un producto'});
  }

}

export const borrarProducto = async (req,res) =>{
  try{
    // extrer el id y buscar el producto
    //si no encuentro el id responder con un mensaje de error
    const buscarProducto = await Producto.findById(req.params.id);
    // si no encontre el producto
    if(!buscarProducto){
      return res.status(404).json({mensaje: 'No se pudo eliminar el producto, el id es incorrecto'});
    }
    //pedir a la BD modificar el producto que tiene tal id, con los datos req.body
    await Producto.findByIdAndDelete(req.params.id)
    //contestar con un mensaje que todo salio bien
    res.status(200).json({mensaje: 'El producto fue eliminado correctamente'});
  }catch (error){
    console.error(error);
    res.status(500).json({mensaje: 'Ocurrio un error al intentar eliminar un producto'});
  }

}
