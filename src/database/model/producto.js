import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
    nombreProducto:{
        type: String,
        required: true,
        unique: true,
        minLength:2,
        maxLength:50
    },
    precio:{
        type: Number,
        required: true,
        min: 50,
        max: 10000
    },
    imagen:{
        type: String,
        required: true
        // validar url de imagen
    },
    descripcionBreve:{
        type: String,
        required: true,
        minLength:5,
        maxLength:50
    },
    descripcionAmplia:{
        type: String,
        required: true,
        minLength:50,
        maxLength:300
    },
    categoria:{
        type: String,
        required: true,
        enum:['Infusiones', 'Batidos', 'Dulce', 'Salado']
    }
})

const Producto = mongoose.model('producto', productoSchema);

export default Producto;