const express = require('express');
const router = express.Router();
const Usuario = require("../models/user.js")
const bcrypt = require('bcrypt');
const passport = require('passport');

//Manejo de Login
router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/signup', (req, res) => {
    res.render('signup')
})

//Método post de login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
})

//Register handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

//register post handle
router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    let errors = [];
    console.log(' Email :' + email + ' Contraseña:' + password);
    if (!email || !password || !password2) {
        errors.push({ msg: "Por favor llena todos los campos" })
    }
    //check if match
    if (password !== password2) {
        errors.push({ msg: "Las contraseñas no coinciden" });
    }

    //check if password is more than 6 characters
    if (password.length < 6) {
        errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres' })
    }
    if (errors.length > 0) {
        res.render('signup', {
            errors: errors,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        //validation passed
        Usuario.findOne({ email: email }).exec((err, user) => {
            console.log(user);
            if (user) {
                errors.push({ msg: 'Este correo ya se encuentra registrado' });
                res.render('signup', { errors, email, password, password2 })
            } else {
                const newUser = new Usuario({
                    email: email,
                    password: password
                });

                //hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //Guarda el HASH
                            newUser.password = hash;
                            //Guarda el usuario
                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    req.flash('success_msg', 'Te has registrado correctamente!');
                                    res.redirect('/users/login');
                                })
                                .catch(value => console.log(value));

                        }));
            }
        })
    }
})

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Saliste la sesión');
    res.redirect('/');
})

module.exports = router;