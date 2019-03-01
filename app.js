require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken'); 

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message : 'Welcome to the API'
    });
}); 

app.get('/api/posts', verifyRoute, (req, res) => {
    console.log(req.headers);
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
                res.json({
                message : 'POST Request processed',
                authData
            });
        }
    });
});

app.get('/api/login', (req,res) => {
    //Mock User
    const user = {
        id: 1, 
        username: 'jith', 
        email: 'jith.geo@hotmail.com'
    }
    jwt.sign({user}, 'secretkey', (error, token)=> {
        res.json({
            user,
            token
        });
    })
});

//Format of Token
// Authorization: Bearer: <access_token>

//Verify Token function
function verifyRoute(req, res, next){
    //Get the auth header value
    const bearerHeader = req.headers['authorization'];
    console.log("Bearer from the Request Object: " + bearerHeader); 
    //Check if the Bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //Get Token from Array 
        const bearerToken = bearer[1];
        req.token = bearerToken; 
        next();
    }
    else{
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});