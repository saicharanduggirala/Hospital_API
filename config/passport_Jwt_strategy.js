const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const Doctor=require('../models/doctorModel');

let opts={
    JwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    SecretOrKey:process.env.SECRET_KEY
}

passport.use(new JwtStrategy(opts,function(jwtPayLoad,done){
    Doctor.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports=passport;