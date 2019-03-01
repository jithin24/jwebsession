require('dotenv').config();
const express = require('express');
const app = express();
const PassportSetup= require('./config/passport-config');
const passport= require('passport');
const cookieSession= require('cookie-session');

//Import all the externally defined routes
const routes = require('./routes');

app.set('view engine', 'ejs');

//Cookie Settings
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [process.env.KEYS]
}));

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// apply the routes to our application Route as desired
app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});