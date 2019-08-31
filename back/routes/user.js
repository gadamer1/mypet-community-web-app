const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/',isLoggedIn, async (req, res, next) => {// api/user
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
})

router.post('/signup', isNotLoggedIn, async (req, res, next) => { //api/user/signup
    try {
        const exuser = await db.User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if (exuser) {
            res.status(403).send('이미 존재하는 사용자 입니다');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 13);
        const newUser = await db.User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        })
        
        const fullUser = await db.User.findOne({
            where: { id: newUser.id },
            attributes: ['id', 'nickname', 'email']
        });

        res.status(200).json(fullUser);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/logout', isLoggedIn, (req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('logout');
})

router.post('/login', isNotLoggedIn,(req, res, next) => { //api/user/login
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }

        return req.login(user, async (loginErr) => {
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: db.Post,
                        as: 'Posts',
                        attributes: ['id'],
                    }, {
                        model: db.Image,
                        as: 'Profile',
                    }],
                    attributes: ['id', 'email', 'nickname',]
                })
                return res.status(200).json(fullUser);
            } catch (e) {
                console.error(e);
                return next(e);
            }
        });
    })(req, res, next);
})

module.exports = router;