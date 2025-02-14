const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Recieved username and password:', username, password);
        const user = await Person.findOne({username: username});
        if(!user) {
            return done(null, false, {message: 'Invalid username'});
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return done(null, false, {message: 'Invalid password'});
        }
        return done(null, user);
    }
    catch(err) {
        return done(err);
    }
}));

module.exports = passport;