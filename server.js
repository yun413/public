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
var DrawingDB = DB.create(__dirname+"/web/data/drawings.db");
var ModelDB = DB.create(__dirname+"/web/data/models.db");
var PictureDB = DB.create(__dirname+"/web/data/pictures.db");
var ContactDB = DB.create(__dirname + "/Contact.db");

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

server.get("/getDrawings", (req, res) => {
    //db
    // {"title":"Work 1","imgSrc":"imgs/pic/567.jpg"}
    // {"title":"Work 2","imgSrc":"imgs/pic/0708.jpg"}
    // {"title":"Work 3","imgSrc":"imgs/pic/A4彩繪.png"}
    // {"title":"Work 4","imgSrc":"imgs/pic/貴族小姐.jpg"}
    // {"title":"Work 5","imgSrc":"imgs/pic/席菈.png"}
    res.send(drawings)


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
    upFile.mv(__dirname+"/web/upload/"+upFile.name, function(err){
        if(err==null){
            res.render("msg",{message:"I got a file: "+upFile.name})
        }else{
            res.render("msg",{message:err});
        }
    })
})


server.listen(3000, () => {
    console.log("伺服器已啟動，請至瀏覽器輸入: http://localhost:3000");
})