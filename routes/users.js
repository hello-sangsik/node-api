const express = require('express');
const User = require('../models').User;
const router = express.Router();
const {UserException} = require('../utils/exceptions');

router.get('/', async (req, res, next) => {
    try {
        res.json(await User.findAll({attributes: ['id', 'username', 'age']}));
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({attributes: ['id', 'username', 'age'], where: {id: req.params.id}});
        if (!user) res.status(204);
        res.json(user);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (await User.findOne({where: {username: req.body.username}})) throw new UserException('Duplicate username');
        const result = await User.create({username: req.body.username, age: req.body.age,});
        res.status(201).json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({attributes: ['id', 'username', 'age'], where: {id: req.params.id}});
        if (!user) throw new UserException('Invalid request');

        user.age = req.body.age;
        user.save();
        res.json(user);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await User.destroy({where: {id: req.params.id}});
        res.status(200).json({result: result ? 'Has been successfully deleted' : 'Invalid request'});
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
