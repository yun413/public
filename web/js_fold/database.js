document.addEventListener("DOMContentLoaded", async () => {
    try {
        await Promise.all([
            loadSectionData("/getPictures", "#picture .photo-tabs", "#main-photo-display", "imgSrc"),
            loadSectionData("/getModels", "#model .photo-tabs", "#main-model-display", "modelSrc"),
            loadDrawingData("/getDrawings")
        ]);

       
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
            console.log("資料載入完成，GSAP 已刷新");
        }
    } catch (err) {
        console.error("初始化資料失敗:", err);
    }
});

// 專門為 Drawing 寫一個簡單的載入
async function loadDrawingData(path) {
    const res = await fetch(path);
    const data = await res.json();
    const track = document.querySelector("#drawing .slider-track");
    if(track) {
        track.innerHTML = data.map(item => `
            <div class="card-item"><img src="${item.imgSrc}" alt="${item.title}"></div>
        `).join("");
    }
}


// web/js_fold/database.js

async function loadSectionData(path, tabContainerSelector, displaySelector, srcKey) {
    try {
        const res = await fetch(path);
        const data = await res.json();
        
        // --- 加入這行除錯資訊 ---
        console.log("從伺服器拿到的資料：", data); 

        const tabContainer = document.querySelector(tabContainerSelector);
        const mainDisplay = document.querySelector(displaySelector);

        // 確保 data 是一個陣列且長度大於 0
        if (Array.isArray(data) && data.length > 0 && tabContainer) {
            tabContainer.innerHTML = data.map((item, index) => {
                // 這裡的 item.title 必須對應你 .db 檔案裡的 key
                return `
                    <button class="video-tab ${index === 0 ? 'active' : ''}" data-src="${item[srcKey]}">
                        ${item.title}
                    </button>
                `;
            }).join("");

            // 設定初始圖片
            if (mainDisplay) {
                mainDisplay.src = data[0][srcKey];
            }
            
            // ... 綁定點擊事件的代碼 ...
        } else {
            console.warn("抓到了資料，但格式不正確或沒有內容:", data);
        }
    } catch (error) {
        console.error(`讀取失敗: ${path}`, error);
    }
}