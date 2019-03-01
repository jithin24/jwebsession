const router= require('express').Router();
const passport= require('passport');

//Auth for Login Route
router.get('/login', (request, response)=> {
    response.render('login', {user: request.user});
});

//Auth with Google
router.get('/logout', (request, response)=> {
    //handle with Passport
    //response.send('Logging Out!!!');
    request.logout();
    response.redirect('/');
})

//Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//Callback Route for Google redirect
router.get('/google/redirect', passport.authenticate('google'), (request, response)=> {
    response.redirect('/profile/');
});

module.exports=router;