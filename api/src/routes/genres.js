const Router = require('express');
const AllGenres = require('../controllers/AllGenres');
const genresRouter = Router();

genresRouter.get('/', async (req, res) => {
    try{
        const genres = await AllGenres()
        res.status(200).json({
            ok: true,
            genres
        })
    }catch(error){
        res.status(400).json({
            ok: false,
            error: error.message
        })
    }
})

module.exports = genresRouter;