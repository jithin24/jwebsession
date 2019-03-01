require('dotenv').config();
const passport= require('passport');
const GoogleStrategy= require('passport-google-oauth20');

passport.serializeUser((user, done)=> {
    console.log("=== Serialize Block ===");
    done(null, user.id);
});

passport.deserializeUser((keyID, done)=> {
    console.log("=== De Serialize Block ===");
    let user={};
    if(keyID==process.env.USER_ID){
        user['id']=process.env.USER_ID;
        user['displayName']=process.env.USER_NAME;
        done(null, user);
    }
    else{
        console.log("Error in User ENV File settings");
    }
});

passport.use(new GoogleStrategy({
    //options for Google strategy
    clientID : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
    }, 
    (accessToken, refreshToken, profile, next) => {
            //Passport callback function
            //console.log('Passport Callback Invoked');
            //Can Add the MongoDB User retrival here
            next(null, {
                id: process.env.USER_ID,
                name: process.env.USER_NAME
            });
        }
    )
);