import { Router } from 'express';
import {
   getAllConcesionarioJR,
   getConcesionarioJRById,
    postConcesionarioJR ,
    putConcesionarioJR,
    deleteConcesionarioJR
} from '../controllers/concesionarioJR.controller.js';

const ConcesionarioJR = Router();

ConcesionarioJR.get('/', getAllConcesionarioJR);
ConcesionarioJR.get('/:id', getConcesionarioJRById);
ConcesionarioJR.post('/', postConcesionarioJR);
ConcesionarioJR.put('/:id', putConcesionarioJR);
ConcesionarioJR.delete('/:id', deleteConcesionarioJR);

export default ConcesionarioJR;
