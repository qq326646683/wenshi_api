"use strict";

var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sqlfactory = require('./sqlfactory');
if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db = {};

let factory = sqlfactory(sequelize);



db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.factory = factory;

module.exports = db;