const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const  { validate } = require('uuid');

const videogamesById = async (id) => {
    try{
        if(validate(id)) {
            const dbVideogame = await searchOnDb(id)
            if(dbVideogame) return dbVideogame
            throw Error('Videogame no found')
        }else if (Number(id)){
            const apiVideogame = await searchOnApi(id)
            if(apiVideogame) return apiVideogame
            throw Error('Videogame not found')
        }else{
            throw Error('Videogame not found')
        }
    }catch(error) {
        throw Error(error.message)
    }
}

const searchOnApi = async (id) => {
    // let apiVideogame
    const apiInfo = await axios.get(`https://api.rawg.io/games/${id}?key=${API_KEY}`)
    const apiById = apiInfo.data;
    if(data.detail) throw Error('Videogame not found')
    apiVideogame = {
        id: data.id,
        name: data.name,
        description: data.description_raw,
        platforms: data.plataforms.map( el => el.plataform.name),
        image: data.background_image ?
        data.background_image
        : 'https://cdn.wallpapersafari.com/98/0/ADzIiv.jpg',
        released: data.released,
        rating: data.rating,
        genres: data.genres.map( gen => gen.name)
}
return apiVideogame
}

const searchOnDb = async (id) => {
    try{
        const auxVideogame = await Videogame.findByPk(id. {
            include: Genre
        })
        const dbVideogame = {
            id: auxVideogame.id,
            name: auxVideogame.name,
            description: auxVideogame.description,
            image: auxVideogame.image,
            released: auxVideogame.released,
            rating: auxVideogame.rating,
            genres: auxVideogame.genres.map( gen => gen.name)   
        }
        return dbVideogame
    }catch(error){
        throw Error(error.message)
    }
}

module.exports = videogamesById;