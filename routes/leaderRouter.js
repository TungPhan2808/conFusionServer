const express = require('express');
const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res, next) => {
        Leaders.deleteMany({})
            .then((resp) => {
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, { $set: req.body })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndDelete(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    });

module.exports = leaderRouter;