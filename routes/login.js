const express = require('express');
const router = express.Router();

/* Perfil de usuario */
router.get('/', (req, res) => {
    res.render('profile');
})

/* Página de registro */
router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;