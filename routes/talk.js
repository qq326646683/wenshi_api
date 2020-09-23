var express = require('express');
var Sequelize = require("sequelize");
var moment = require('moment');
var ExpressJwt = require('express-jwt');
var router = express.Router();
var models = require('../models').factory;
var util = require('../util/utils');
var sequelize = require('../models/index').sequelize;


/* 创建Talk */
router.post('/', ExpressJwt({secret: util.privatekey}), function (req, res) {
    models.Talk.create(Object.assign(req.body, {
        id: util.uuid(8, 10),
        userId: req.user.id
    })).then(talk => {
        return res.json({obj: talk, status: "success"});
    });
});

/*Talk列表*/
router.get('/', function (req, res) {
    let params = req.query;
    let where = {};
    params.mediaType ? where.mediaType = params.mediaType : null;
    params.userId ? where.userId = params.userId : null;
    models.Talk
        .findAndCountAll({
            limit: parseInt(params.limit),
            offset: parseInt(params.offset),
            where,
            order: [['createdAt', 'desc']],
            include: [models.User]
        })
        .then(talks => {
            return res.json({objs: talks.rows, count: talks.count, status: 'success'});
        });
});

/*我的Talk列表*/
router.get('/mine', ExpressJwt({secret: util.privatekey}), function (req, res) {
    let params = req.query;
    let where = {userId: req.user.id};
    models.Talk
        .findAndCountAll({
            limit: parseInt(params.limit),
            offset: parseInt(params.offset),
            where,
            order: [['createdAt', 'desc']]
        })
        .then(talks => {
            return res.json({objs: talks.rows, count: talks.count, status: 'success'});
        });
});



module.exports = router;