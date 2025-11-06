import ConcesionarioJR from "../models/concesionarioJR.model.js";
import mongoose from "mongoose";

export const getAllConcesionarioJR = async (req, res) => {
    try {
        const concesionarioJR = await ConcesionarioJR.find({}, { __v: 0 });
        if (concesionarioJR.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron registros'
            });
        }
        return res.status(200).json({ concesionarioJR });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los registros'
        });
    }
};

export const getConcesionarioJRById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }
        const concesionario = await ConcesionarioJR.findById(id);
        if (!concesionario) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        return res.status(200).json({ concesionario });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al obtener el registro' });
    }
};

export const postConcesionarioJR = async (req, res) => {
    const body = req.body;
    const concesionario = new ConcesionarioJR(body);
    try {
        const validationError = concesionario.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(500).json({
                msg: errorMessages
            });
        }

        await concesionario.save();
        return res.status(201).json({ concesionario });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al guardar el registro' });
    }
};

export const putConcesionarioJR = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }

        const concesionario = await ConcesionarioJR.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!concesionario) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }

        return res.status(200).json({ concesionario });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al actualizar el registro' });
    }
};

export const deleteConcesionarioJR = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }

        const concesionario = await ConcesionarioJR.findByIdAndDelete(id);
        if (!concesionario) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }

        return res.status(200).json({ msg: 'Registro eliminado', concesionario });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al eliminar el registro' });
    }
};
