import Usuario from "../database/model/usuario.js";

export const crearUsuario = async (req, res) => {
    try {
      const usuarioNuevo = new Usuario(req.body);
      await usuarioNuevo.save();
      res.status(201).json({
        mensaje: "El usuario fue creado correctamente",
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

  export const obtenerUsuario = async (req, res)=>{
    try{
    const usuarioBuscado = await Usuario.findById(req.params.id);
    res.status(200).json(usuarioBuscado);
    }catch (error){
      console,log(error);
      res.status(404).json({mensaje: 'No se encontro el usuario solicitado'});
    }
    }

    export const borrarUsuario = async (req, res) => {
      try {
        const usuarioProducto = await Usuario.findById(req.params.id);
        if (!usuarioProducto) {
          return res
            .status(404)
            .json({
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