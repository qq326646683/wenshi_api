"use strict"
var DataTypes = require("sequelize").DataTypes;
var moment = require('moment');
module.exports = function (sequelize) {
    /*User*/
    var User = sequelize.define("user", {
        id: {type: DataTypes.UUID, allowNull: false, unique: true, primaryKey: true},
        phone: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false},
        avatar: {type: DataTypes.STRING},
        name: {type: DataTypes.STRING},
    }, {
        tableName: 'user',
        constraints: false

    });

    /*动态*/
    var Talk = sequelize.define("talk", {
        id: {type: DataTypes.UUID, allowNull: false, unique: true, primaryKey: true},
        mediaType: {type: DataTypes.STRING, allowNull: false}, // image, audio, video
        describe: {type: DataTypes.STRING},
        mediaUrl: {type: DataTypes.STRING, allowNull: false},
        subUrl: {type: DataTypes.STRING},
        likeCount: {type: DataTypes.INTEGER, defaultValue: 0},
        status: {type: DataTypes.INTEGER, defaultValue: 0}, // 0: 待审核  1: 正常状态  2: 被下架
    }, {
        tableName: 'talk',
        constraints: false
    });

    /*评论 */
    var Comment = sequelize.define("", {
        id: {type: DataTypes.UUID, allowNull: false, unique: true, primaryKey: true},
        content: {type: DataTypes.STRING, allowNull: false},
    }, {
        tableName: 'comment',
        constraints: false
    });

    User.hasMany(Talk);
    Talk.belongsTo(User);
    Talk.hasMany(Comment);
    Comment.belongsTo(Talk);

    sequelize
        .sync()
        .then(() => {

        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });


    let factory = {
        User,
        Talk,
        Comment,
    }


    return factory;


}