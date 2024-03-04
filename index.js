import express from "express";
import cors from "cors";
import 'dotenv/config'; //permite procesar variables de entorno
import morgan from "morgan";

//1- configurar un puerto
// puedo compilar el index.js usando node --watch index.js en forma experimental
const app = express();
//crear una variable
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto ' + app.get('port'))
})

//2- configurar los middlewares del proyecto
app.use(cors()); // permitir solicitudes remotas
app.use(morgan('dev')) // nos da info extra en la terminal
app.use(express.json()) //interpretar datos en formato json
app.use(express.urlencoded({extended:true})) // ayuda a interpretar los datos del body del request
// falta configurar el index.html

//3 - configurar las rutas

