var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

/* Página de inicio */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Inicio', menuId: 'Inicio' });
});

/* Inicio de sesión */
router.get('/login', (req, res) => {
    res.render('login');
});

/* Registro de usuario */
router.get('/signup', (req, res) => {
    res.render('signup');
});

/* Perfil de usuario */
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

/* Página acerca de */
router.get('/about', function (req, res, next) {
    res.render('about', { title: 'Acerca de', menuId: 'Acerca de' });
})



module.exports = router;