import concesionarioJR from './concesionarioJR.routes.js';
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('/concesionarioJR', concesionarioJR);

export default indexRoutes;
