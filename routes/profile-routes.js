const router= require('express').Router();

const authCheck= (request, response, next)=> {
    if(!request.user){
        //Executes if User is not logged-in
        response.redirect('/auth/login');
    }
    else{
        //Already logged In
        next();
    }
}

router.get('/', authCheck, (request, response)=> {
    response.render('profile', {user: request.user});
    //response.send("Profile: " + request.user.displayName);
});

module.exports=router;