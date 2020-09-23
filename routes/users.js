"use strict"
var express = require('express');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var ExpressJwt = require('express-jwt');
var router = express.Router();
var models = require('../models').factory;
var util = require('../util/utils');


/* 登录 */
router.post('/login', function (req, res) {
    models.User
    .findOne({where: {phone: req.body.phone}})
    .then(user => {
        console.log(user);
        if (user == null) {
            models.User.create(Object.assign(req.body, {
                id: util.uuid(8, 10),
                name: '用户' + req.body.phone
            })).then(user => {
                let token = jwt.sign({id: user.id}, util.privatekey, {expiresIn: '1h'});
                let obj = user.get({plain: true});
                obj.token = token;
                return res.json({obj: user, status: "success"});
            });
        } else {
            if (req.body.password != user.password) {
                return res.json({message: "密码错误", status: "failure"});
            } else {
                let token = jwt.sign({id: user.id}, util.privatekey, {expiresIn: '1h'});
                let obj = user.get({plain: true});
                obj.token = token;
                return res.json({obj: obj, status: "success"});
            }
        }
    });

        // models.User
        // .findOrCreate({where: {phone: req.body.phone, password: req.body.password}, defaults: {id: util.uuid(8, 10), name: '用户' + req.body.phone}})
        // .spread(function (user, created) {
        //     let token = jwt.sign({id: user.id}, util.privatekey, {expiresIn: '1h'});
        //     let obj = user.get({plain: true});
        //     obj.token = token;
        //     return res.json({obj: obj, status: "success"});
        // })

});


/*获取用户信息*/
router.get('/userinfo', ExpressJwt({secret: util.privatekey}), function (req, res) {
    models.User
        .findOne({where: {id: req.user.id}})
        .then(user => {
            return res.json({obj: user, status: 'success'});
        })
})


/*
*修改用户名和头像
* */
router.put('/userinfo',ExpressJwt({secret: util.privatekey}), function (req, res) {
    let body = req.body;
    let updateBody = {};
    body.name?updateBody.name=body.name:null;
    body.avatar?updateBody.avatar=body.avatar:null;
    models.User
        .update(updateBody,{where:{id:req.user.id},field:['name','avatar']})
        .then(re=>{
            res.json({obj: {msg:'修改成功'}, status: 'success'})
        })

})


module.exports = router;
