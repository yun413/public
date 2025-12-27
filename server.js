const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// 讓 Node.js 能夠存取你專案內的所有檔案 (HTML, CSS, JS, Imgs)
app.use(express.static(__dirname));

// --- 新增：模擬 API 路由 ---
// 當前端 fetch("/api/drawings") 時，Node.js 會去讀取 data/drawings.json 並回傳
app.get('/api/:category', (req, res) => {
    const category = req.params.category;
    const filePath = path.join(__dirname, 'data', `${category}.json`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});



// 設定首頁路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器已啟動！請至瀏覽器輸入: http://localhost:${PORT}`);
});