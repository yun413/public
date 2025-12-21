var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var fileupload = require("express-fileupload");
var db = require("./db.js"); 


server.use(express.static(__dirname)); 

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(fileupload({limits:{fileSize:2*1024*1024}}));

// 啟動初始化檢查
require("./initDB.js");

//API
server.get("/api/intro", (req, res) => {
    db.IntroDB.find({}).then(results => res.send(results));
});

server.get("/api/drawings", (req, res) => {
    db.DrawingDB.find({}).then(results => res.send(results));
});

server.get("/api/pictures", (req, res) => {
    db.PictureDB.find({}).then(results => res.send(results));
});

server.get("/api/videos", (req, res) => {
    db.VideoDB.find({}).then(results => res.send(results));
});

server.get("/api/models", (req, res) => {
    db.ModelDB.find({}).then(results => res.send(results));
});

server.listen(8080, () => {
    console.log("伺服器已啟動：http://localhost:8080");
});