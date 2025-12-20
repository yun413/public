// db.js
var DB = require("nedb-promises");

// 建立並匯出這五個資料庫物件
module.exports = {
    IntroDB: DB.create(__dirname + "/db/Intro.db"),
    DrawingDB: DB.create(__dirname + "/db/Drawing.db"),
    PictureDB: DB.create(__dirname + "/db/Picture.db"),
    VideoDB: DB.create(__dirname + "/db/Video.db"),
    ModelDB: DB.create(__dirname + "/db/Model.db")
};