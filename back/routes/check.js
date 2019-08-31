const express = require('express')
const router = express.Router();
const db = require('../models');


router.get('/email/:email', async (req, res, next) => {
    try {
        const exEmail = await db.User.findOne({
            where: {
                email : req.params.email
            }
        })
        if (exEmail) {
            res.send(false);
        } else {
            res.send(true);
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
})

router.get('/nickname/:nickname', async (req, res, next) => {
    try {
        const exNickName = await db.User.findOne({
            where: {
                nickname: req.params.nickname
            }
        })
        if (exNickName) {
            res.json(false);
        } else {
            res.json(true);
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
})

module.exports = router;