const Router = require('express');
const CreateVideogame = require('../controllers/CreateVideogame');
const AllVideogames = require('../controllers/AllVideogames');
const VideogamesById = require('../controllers/VideogamesById');
const VideogamesByName = require('../controllers/VideogamesByName');
const videogamesById = require('../controllers/VideogamesById');

const vgsRouter = Router();

vgsRouter.get('/', async (req, res) => {
    const { name } = req.query
    try{
        let arrVgs
        if(name){
            arrVgs = await VideogamesByName(name)
        }else{
            arrVgs = await AllVideogames()
        }
        res.status(200).json({
            ok: true,
            arrVgs
        })
    }catch(error){
        res.status(400).json({
            ok: false,
            error: error.message
        })
    }
})

vgsRouter.get('/:idVideo', async (req, res) => {
    const { idVideogame } = req.params 
    try{
        const videogame = await videogamesById(idVideogame)
        res.status(200).json({
            ok: true,
            videogame
        })
    }catch(error){
        res.status(400).json({
            ok: false,
            error: error.message
        })
    }
})

vgsRouter.post('/', async (req, res) => {
    const newVideogame = req.body
    try{
        const auxVideogame = await CreateVideogame(newVideogame)
        const { id, name, image, rating, genres } = await VideogamesById(auxVideogame.videogame.id)
        res.status(200).json({
            response: auxVideogame.created ?
            {
                ok: true,
                message: 'Videogame created succesfully!!!',
                createdVideogame: {id, name, image, rating, genres}
            }
            : {
                ok: false,
                message: 'Videogame already exists'
            }
        })
    }catch(error) {
        res.status(400).json({
            ok: false,
            error: error.message
        })
    }
})

module.exports = vgsRouter;