document.addEventListener("DOMContentLoaded", async () => {
    try {
        await Promise.all([
            // 1. 載入 Picture 作品
            loadSectionData("./data/pictures.json", "#picture .photo-tabs", "#main-photo-display", "imgSrc"),

            // 2. 載入 Model 作品
            loadSectionData("./data/models.json", "#model .photo-tabs", "#main-model-display", "modelSrc"),

            // 3. 載入 Drawings 作品  
            loadDrawingData("./data/drawings.json")
        ]);

        // 資料載入完畢後，手動觸發一次 GSAP 刷新，確保橫向捲動計算正確
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



// 封裝成一個通用函數，方便重複使用
async function loadSectionData(jsonPath, tabContainerSelector, displaySelector, srcKey) {
    try {
        const response = await fetch(jsonPath);//抓資料
        const data = await response.json();//轉json
        
        const tabContainer = document.querySelector(tabContainerSelector);//變按鈕
        const mainDisplay = document.querySelector(displaySelector);

        if (data.length > 0 && tabContainer) {
            // 生成 Buttons
            tabContainer.innerHTML = data.map((item, index) => `
                <button class="video-tab ${index === 0 ? 'active' : ''}" data-src="${item[srcKey]}">
                    ${item.title}
                </button>
            `).join("");

            // 預設第一張
            mainDisplay.src = data[0][srcKey];

            // 綁定點擊事件
            const tabs = tabContainer.querySelectorAll(".video-tab");
            tabs.forEach(tab => {
                tab.addEventListener("click", function() {
                    tabs.forEach(t => t.classList.remove("active"));
                    this.classList.add("active");
                    
                    const newSrc = this.getAttribute("data-src");
                    
                    // 使用 GSAP 動畫切換
                    gsap.to(mainDisplay, {
                        opacity: 0,
                        duration: 0.3, //切換速度
                        onComplete: () => {
                            mainDisplay.src = newSrc;
                            mainDisplay.onload = () => gsap.to(mainDisplay, { opacity: 1, duration: 0.3 });
                        }
                    });
                });
            });
        }
    } catch (error) {
        console.error(`無法讀取資料: ${jsonPath}`, error);
    }
}