import mongoose from "mongoose";

const concesionarioJRSpec = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    kilometraje: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    imagen: {
        type: String,
        required: false
    }
});

const ConcesionarioJR = mongoose.model('ConcesionarioJR', concesionarioJRSpec);

export default ConcesionarioJR;
