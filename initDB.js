// initDB.js
var db = require("./db.js"); // 連接到剛才定義的資料庫

async function initialize() {
    // 1. 初始化 Intro
    const introCount = await db.IntroDB.count({});
    if (introCount === 0) {
        await db.IntroDB.insert([
            { imgSrc: "imgs/pic/大頭照.png", name: "Nakin", title: "YunTing", introText: "Hello! I'm YunTing, a passionate artist and content creator. Welcome to my portfolio where I showcase my drawings, videos, 3D models, and photography work. Feel free to explore and connect with me!" }
        ]);
        console.log("Intro DB 內容已寫入");
    }

    // 2. 初始化 Drawing
    const drawingCount = await db.DrawingDB.count({});
    if (drawingCount === 0) {
        await db.DrawingDB.insert([
            { imgSrc: "imgs/pic/567.jpg", title: "Work 1" },
            { imgSrc: "imgs/pic/0708.jpg", title: "Work 2" },
            { imgSrc: "imgs/pic/A4彩繪.png", title: "Work 3" },
            { imgSrc: "imgs/pic/貴族小姐.jpg", title: "Work 4" },
            { imgSrc: "imgs/pic/席菈.png", title: "Work 5" }
        ]);
        console.log("Drawing DB 內容已寫入");
    }

    // 3. 初始化 Picture
    const pictureCount = await db.PictureDB.count({});
    if (pictureCount === 0) {
        await db.PictureDB.insert([
            { imgSrc: "imgs/pic/禁止超速.jpg", title: "Portrait 1" },
            { imgSrc: "imgs/pic/轉彎前的光.jpg", title: "Portrait 2" },
            { imgSrc: "imgs/pic/1411222007-1.jpg", title: "Portrait 3" },
            { imgSrc: "imgs/pic/1411222007-2.jpg", title: "Portrait 4" },
            { imgSrc: "imgs/pic/1411222007-3.jpg", title: "Portrait 5" },
            { imgSrc: "imgs/pic/1411222007-4.jpg", title: "Portrait 6" }
        ]);
        console.log("Picture DB 內容已寫入");
    }

    // 4. 初始化 Video
    const videoCount = await db.VideoDB.count({});
    if (videoCount === 0) {
        await db.VideoDB.insert([
            { videoSrc: "imgs/video/introduction.mp4", title: "動態履歷表", active: true },
            { videoSrc: "imgs/video/貝貝的冒險.mp4", title: "動畫設計初稿", active: false },
            { videoSrc: "imgs/video/小熊貝貝的冒險.mp4", title: "小熊貝貝的冒險", active: false }
        ]);
        console.log("Video DB 內容已寫入");
    }

    // 5. 初始化 Model
    const modelCount = await db.ModelDB.count({});
    if (modelCount === 0) {
        await db.ModelDB.insert([
            { modelSrc: "imgs/model/sword.jpg", title: "小型劍渲染" },
            { modelSrc: "imgs/model/sword_ao.jpg", title: "小型劍白膜" },
            { modelSrc: "imgs/model/sence_01.jpg", title: "場景渲染" },
            { modelSrc: "imgs/model/sence_ao.jpg", title: "場景白膜" },
            { modelSrc: "imgs/model/lamp_ao.jpg", title: "檯燈白模" }
        ]);
        console.log("Model DB 內容已寫入");
    }

    // 這裡可以依此類推加入 Picture, Model 和 Intro 的資料...
    console.log("所有資料庫檢查/初始化完成！");
}

initialize();