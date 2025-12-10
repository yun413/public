var express = require("express");
var server = express();
var bodyParser = require("body-parser");

var fileupload = require("express-fileupload");

server.use(express.static(__dirname+"/Public")); //為公開網頁資料夾
server.use(bodyParser.urlencoded());//解析urlencoded格式的body內容
server.use(bodyParser.json());//解析json格式的body內容
server.use(fileupload({limits:{fileSize:2*1024*1024}}))//限制上傳文件大小為2MB

var DB = require("nedb-promises");
var ServiceDB = DB.create(__dirname+"/Service.db");//建立ServiceDB資料庫
var PorfolioDB = DB.create(__dirname+"/Porfolio.db");
var ContactDB = DB.create(__dirname+"/Contact.db");
var AboutDB = DB.create(__dirname+"/About.db");







server.get("/", (req,res)=>{
    res.send("Hello World!");//為8080port的首頁內容
})

server.get("/Services", (req,res)=>{
    //db 
    // var Services = [
    //     { icon: 'fa-shopping-cart', title: 'E-Commerce', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem.' },
    //     { icon: 'fa-laptop', title: 'Responsive Design', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.' },
    //     { icon: 'fa-lock', title: 'Web Security', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.' }
    // ]
    ServiceDB.find({},{_id:0}).then(results=>{
        res.send(results);
    }).catch(error=>{

    })
})

server.get("/portfolio", (req, res) => {
    // var Portfolio = [
    //     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
    //     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
    //     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" },
    //     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
    //     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
    //     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" }
    // ]
    res.send(Portfolio);
})

server.get("/about", (req, res) => {
    res.send("Welcome " + req.query.user + " to My first NodeJS server!");
})

server.listen(8080)