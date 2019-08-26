const local = require('./local');
const {User} = require('../models');


module.exports = (passport)=>{
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.find({
            where:[{
                model: User,
                attributes: ['id','nickname'],
            }]
        })
            .then(user=>done(null,user))
            .catch(err => done(err));
    });

    local(passport);
};