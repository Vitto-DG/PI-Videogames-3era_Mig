const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env

const getVgsByName = async (name) => {
    try{
        const dbVideogames = await getDbVgsByName(name);
        const apiVideogames = await getApiVgsByName(name);
        if([...dbVideogames, ...apiVideogames].length === 0) throw Error('No matches found')
        return [...dbVideogames, ...apiVideogames]
    }catch(error){
        throw Error(error.message)
    }
}

const getDbVgsByName = async (name) => {
    try{
     const auxVideogames = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: Genre
     })
     const dbVideogames = auxVideogames.map(vg => {
        return{
            id: vg.id,
            name: vg.name,
            image: vg.image,
            rating: vg.rating,
            genres: vg.genres.map( gen => gen.name)
        }
     })
     return dbVideogames
    }catch(error){
        throw Error(error.message)
    }
}

const getApiVgsByName = async (name) => {
    try{
    const apiInfo = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}&page_size=15`)
    const {results} = apiInfo.data;
    
    const apiVideogames = results.map(vg => {
        return{
            id: vg.id,
            name: vg.name,
            image: vg.background_image ? vg.background_image : 'https://cdn.wallpapersafari.com/98/0/ADzIiv.jpg',
            rating: vg.rating_top,
            genres: vg.genres.map( gen => gen.name)
        }
    })
    return apiVideogames;
}catch(error){
    throw Error(error.message)
}
};


module.exports = getVgsByName;
