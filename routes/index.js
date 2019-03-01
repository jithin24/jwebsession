const routes = require('express').Router();
const authRoutes = require('./auth-routes');
const profileRoutes = require('./profile-routes');

routes.get('/', (req, res) => {
    res.render('home', {user: req.user});
}); 

routes.use('/auth', authRoutes);
routes.use('/profile', profileRoutes);

module.exports = routes;