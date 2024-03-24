import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next)=>{
    const errors = validationResult(req);
    //preguntar si ocurrieron errores
    if(!errors.isEmpty()){
      return res.status(400).json({errores: errors.array() })
    }
    // debe continuar con la ejecucion
    next();
}

export default resultadoValidacion