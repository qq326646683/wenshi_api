var express = require('express');
var router = express.Router();
var models  = require('../models').factory;


router.get('/room', function(req, res, next) {

    res.render('index',{id:req.query.roomId})
});

router.get('/resume', function(req, res, next) {
    res.render('resume',{id:req.query.roomId})
});

router.get('/myresume', function(req, res, next) {
    res.render('myresume',{id:req.query.roomId})
});
module.exports = router;
