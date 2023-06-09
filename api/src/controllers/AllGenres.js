const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;

const allGenres = async () => {
    try {
        const dbGenres = await Genre.findAll();

        if(!dbGenres.length){
            let genres
            const apiCall = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            const {apiGenres} = apiCall.data;
            if(!apiGenres) throw Error('API request error');

            genres = apiGenres.map(gen => {
                return{
                    id: gen.id,
                    name: gen.name
                };
            });

            await Genre.bulkCreate(genres);
            return genres;
        }
    
    return dbGeneres.map(gen => {
        return{
            id: gen.id,
            name: gen.name
        }
    })
}catch(error){
    throw Error(error.message)
}
}

module.exports = allGenres;