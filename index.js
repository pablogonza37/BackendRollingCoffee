import express from "express";
console.log('Hola mundo v2 bjbjbjhb')

//1- configurar un puerto
// puedo compilar el index.js usando node --watch index.js en forma experimental
const app = express();
//crear una variable
app.set('port', 4000);
app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto ' + app.get('port'))
})

//2- configurar los middlewares del proyecto

//3 - configurar las rutas