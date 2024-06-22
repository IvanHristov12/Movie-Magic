const { getMovieById, attachCastToMovie } = require("../services/movie");
const { getAllCast } = require('../services/cast')

module.exports = {
    attachGet: async (req, res) => {
        const id = req.params.id
        const movie = await getMovieById(id);


        if (!movie) {
            return res.render('404');
        }

        const allCast = await getAllCast();

        res.render('cast-attach', { movie, allCast });
    },
    attachPost: async (req, res) => {
        const movieId = req.params.id;
        const castId = req.body.cast;

        if (!movieId || !castId) {
            res.status(400).end();
            return;
        }


        if (castId == 'none') {
            const movie = await getMovieById(movieId);
            const allCast = await getAllCast();
            res.render('cast-attach', { movie, allCast, error: true });

            return;
        }

        try {
            await attachCastToMovie(movieId, castId);
        } catch (err) {
            res.status(400).end();
            return
        }
        res.redirect('/details/' + movieId);
    }
}