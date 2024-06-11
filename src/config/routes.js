const { Router } = require('express');
const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');
const { error404 } = require('../controllers/error');

const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/create', createGet);
router.post('/create', createPost);
router.get('/details/:id', details);
router.get('/search', search);

router.get('*',  error404);

module.exports = { router };
