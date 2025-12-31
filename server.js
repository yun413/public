var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");


server.set("view engine", 'ejs');
server.set("views", __dirname+"/view")


server.use(express.static(__dirname + "/web"));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(fileUpload({limits:{fileSize:2*1024*1024}}))

var DB=require("nedb-promises");
var DrawingDB = DB.create(__dirname+"/web/data/drawing.db");
var ModelDB = DB.create(__dirname+"/web/data/model.db");
var PictureDB = DB.create(__dirname+"/web/data/picture.db");
var ContactDB = DB.create(__dirname + "/Contact.db");

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/web/index.html");
})

server.get("/getDrawings", (req, res) => {
    DrawingDB.find({}).then(results => res.send(results));
});

server.get("/getModels", (req, res) => {
    ModelDB.find({}).then(results => res.send(results));
});

server.get("/getPictures", (req, res) => {
    PictureDB.find({}).then(results => res.send(results));
});



server.post("/contact", (req, res) =>{
    ContactDB.insert(req.body);
    //move to public/upload
    var upFile=req.files.myFile1;
    upFile.mv(__dirname+"/public/upload/"+upFile.name, function(err){
        if(err==null){
            res.render("msg",{message:"I got a file: "+upFile.name})
        }else{
            res.render("msg",{message:err});
        }
    })
})


server.listen(80)