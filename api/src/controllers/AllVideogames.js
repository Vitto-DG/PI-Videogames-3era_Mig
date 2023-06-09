const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const allVideogames = async () => {
    try{
        const apiVideogames = await allApiVideogames();
        const dbVideogames = await allDbVideogames();

        if(![...dbVideogames, ...apiVideogames].length) throw Error('Videogames not found')
        return [...dbVideogames, ...apiVideogames];
    }catch(error){
        throw Error(error.message);
    }
};

const allDbVideogames = async () => {
    try{
        const videogames = await Videogame.findAll({
            include: Genre
        });
        return videogames.map(vg => {
            return {
                id: vg.id,
                name: vg.name,
                image: vg.image,
                rating: vg.rating,
                genres: vg.genres.map(gen => gen.name)
            };
        })
    }catch(error){
        throw Error(error.message);
    }
};

const allApiVideogames = 
async (url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`, videogames = []) => {
  if(videogames.length === 100) return videogames;

  try{
    let audVideogames;
    let nextPage;
    const response = await axios.get(url);
    const { results, next } = response.data;

    nextPage = next;
    auxVideogames = results.map(vg => {
        return {
            id: vg.id,
            name: vg.name,
            image: vg.background_image ? 
            vg.background_image 
            : 'https://cdn.wallpapersafari.com/98/0/ADzIiv.jpg',
            rating: vg.rating_top,
            genres: vg.genres.map(gen => gen.name)
        };
    });

    videogames = [...videogames, ...auxVideogames];
    return allApiVideogames(next, videogames);
  }catch(error){
    throw Error(error.message);
  }
};

module.exports = allVideogames;