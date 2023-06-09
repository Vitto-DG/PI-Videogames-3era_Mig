const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const vgsRouter = require('./videogames')
const genresRouter = require('./genres')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', vgsRouter);
router.use('/genres', genresRouter)


module.exports = router;
