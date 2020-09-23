var express = require('express');
var fs = require('fs')
var formidable = require('formidable');
var router = express.Router();
var util = require('../util/utils');

router.post('/upload', function (req, res, next) {
    let form;
    form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let file = files.fileUpload;
        //给文件起名字
        let name = file.name;
        let nameArray = name.split('');
        let nameMime = [];
        let l = nameArray.pop();
        nameMime.unshift(l);
        while (nameArray.length != 0 && l != '.') {
            l = nameArray.pop();
            nameMime.unshift(l);
        }
        let Mime = nameMime.join('');
        let filename = util.uuid(20, 16) + Mime;

        //将手机的图片路径复制到项目路径下
        fs.rename(file.path, './public/imgs/' + filename, err => {
            if (err) {
                return res.json({msg: '上传出错', status: "failed"});

            }
            return res.json({obj: {imgurl: 'imgs/' + filename, status: "success"}});
        });

    });

});


module.exports = router;
