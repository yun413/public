gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. 鼠標邏輯 ---
    const cursor = document.querySelector("#custom-cursor");
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    // --- 2. 視差動畫修正 (動物跳出 + 縮短時間) ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#parallax-container",
            start: "top top",
            // 將 end 從 4000 縮短為 1500，這會讓動畫在更短的滾動距離內完成（感覺變快）
            end: "+=1500", 
            scrub: 1,      // 數值越小，跟隨滾輪的反應越即時
            pin: true,
            invalidateOnRefresh: true 
        }
    });

    // 設定初始位置（讓動物先隱藏在畫面外）
    gsap.set("#layer-fox", { x: -500, rotation: -10 }); // 從左邊跳出
    gsap.set("#layer-bear", { x: 500, rotation: 10 });  // 從右邊跳出
    gsap.set("#layer-bird", { y: 300 });               // 鳥(草圖層)從下面上來

    tl.to("#layer-sky", { scale: 1.2, duration: 2 }, 0)
    .to("#layer-star", { opacity: 0.5, y: -100, duration: 2 }, 0)
    // 動物跳入動畫
    .to("#layer-fox", { x: 0, rotation: 0, duration: 2, ease: "back.out(1.7)" }, 0.2)
    .to("#layer-bear", { x: 0, rotation: 0, duration: 2, ease: "back.out(1.7)" }, 0.3)
    .to("#layer-bird", { y: 0, duration: 2, ease: "power2.out" }, 0.4)
    // 文字出現
    .to("#text-overlay h1", { opacity: 1, scale: 1, duration: 1.5 }, 0.8);

    // --- 3. Header 滑入 ---
    gsap.to("header", {
        scrollTrigger: {
            trigger: "#intro",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
        opacity: 1,
        visibility: "visible",
        y: 0,
        duration: 0.5
    });

    // --- 4. DRAWING 橫向捲動 (維持不變) ---
    const drawingSection = document.querySelector("#drawing");
    if (drawingSection) {
        const track = drawingSection.querySelector(".slider-track");
        const getMoveDistance = () => track.scrollWidth - window.innerWidth + (window.innerWidth * 0.2);
        gsap.to(track, {
            x: () => -getMoveDistance(),
            ease: "none",
            scrollTrigger: {
                trigger: drawingSection,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => "+=" + getMoveDistance(),
                invalidateOnRefresh: true
            }
        });
    }


    // --- 5. 通用圖片切換邏輯 (適用於 PICTURE 與 MODEL) ---
    function setupPhotoSwitcher(sectionId, displayId) {
        const section = document.querySelector(sectionId);
        const photoDisplay = document.querySelector(displayId);
        if (!section || !photoDisplay) return;

        const photoTabs = section.querySelectorAll(".video-tab");

        photoTabs.forEach(tab => {
            tab.addEventListener("click", function() {
                // 切換該區域內的按鈕樣式
                photoTabs.forEach(t => t.classList.remove("active"));
                this.classList.add("active");

                const photoSrc = this.getAttribute("data-photo");

                // 動畫切換
                gsap.to(photoDisplay, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        photoDisplay.src = photoSrc;
                        photoDisplay.onload = () => {
                            gsap.to(photoDisplay, { opacity: 1, duration: 0.3 });
                        };
                    }
                });
            });
        });
    }

    // 執行初始化
    setupPhotoSwitcher("#picture", "#main-photo-display");
    setupPhotoSwitcher("#model", "#main-model-display");


    // --- 6. VIDEO 切換邏輯 (限定在 #video 區塊內) ---
    const videoSection = document.querySelector("#video");
    if (videoSection) {
        const videoTabs = videoSection.querySelectorAll(".video-tab");
        const videoPlayer = videoSection.querySelector("#main-video-player");

        if (videoPlayer) {
            videoPlayer.volume = 0.1;
            videoTabs.forEach(tab => {
                tab.addEventListener("click", function() {
                    videoTabs.forEach(t => t.classList.remove("active"));
                    this.classList.add("active");
                    const videoSrc = this.getAttribute("data-video");

                    gsap.to(videoPlayer, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            videoPlayer.src = videoSrc;
                            videoPlayer.load(); 
                            videoPlayer.onloadeddata = () => {
                                gsap.to(videoPlayer, { opacity: 1, duration: 0.3 });
                            };
                        }
                    });
                });
            });
        }
    }


    
    // --- 7. Footer ---
    gsap.to("#main-footer", {
        scrollTrigger: {
            trigger: "body",       // 監測整個頁面
            start: "bottom bottom", // 當頁面底部 碰到 視窗底部時
        },
        opacity: 1,
        visibility: "visible",
        duration: 0.3
    });








                

                //fetch 以下為資料庫內容
                // 3. 載入 Picture 作品
                fetch("/api/pictures")
                    .then(res => res.json())
                    .then(data => {
                        const tabContainer = document.querySelector("#picture .photo-tabs");
                        const mainDisplay = document.querySelector("#main-photo-display");
                        
                        if(data.length > 0) {
                            // 生成標籤
                            tabContainer.innerHTML = data.map((item, index) => `
                                <button class="video-tab ${index === 0 ? 'active' : ''}" data-photo="${item.imgSrc}">
                                    ${item.title}
                                </button>
                            `).join("");
                            
                            // 預設顯示第一張圖
                            mainDisplay.src = data[0].imgSrc;

                            // 重新綁定點擊事件
                            const tabs = tabContainer.querySelectorAll(".video-tab");
                            tabs.forEach(tab => {
                                tab.addEventListener("click", function() {
                                    tabs.forEach(t => t.classList.remove("active"));
                                    this.classList.add("active");
                                    
                                    const newSrc = this.getAttribute("data-photo");
                                    // 加入淡入淡出動畫
                                    gsap.to(mainDisplay, {
                                        opacity: 0,
                                        duration: 0.3,
                                        onComplete: () => {
                                            mainDisplay.src = newSrc;
                                            mainDisplay.onload = () => gsap.to(mainDisplay, { opacity: 1, duration: 0.3 });
                                        }
                                    });
                                });
                            });
                        }
                    });


                // 4. 載入 Model 作品
                fetch("/api/models")
                    .then(res => res.json())
                    .then(data => {
                        const tabContainer = document.querySelector("#model .photo-tabs");
                        const mainDisplay = document.querySelector("#main-model-display");
                        
                        if(data.length > 0) {
                            // 生成標籤
                            tabContainer.innerHTML = data.map((item, index) => `
                                <button class="video-tab ${index === 0 ? 'active' : ''}" data-photo="${item.modelSrc}">
                                    ${item.title}
                                </button>
                            `).join("");

                            // 預設顯示第一個模型圖
                            mainDisplay.src = data[0].modelSrc;

                            // 重新綁定點擊事件
                            const tabs = tabContainer.querySelectorAll(".video-tab");
                            tabs.forEach(tab => {
                                tab.addEventListener("click", function() {
                                    tabs.forEach(t => t.classList.remove("active"));
                                    this.classList.add("active");
                                    
                                    const newSrc = this.getAttribute("data-photo");
                                    gsap.to(mainDisplay, {
                                        opacity: 0,
                                        duration: 0.3,
                                        onComplete: () => {
                                            mainDisplay.src = newSrc;
                                            mainDisplay.onload = () => gsap.to(mainDisplay, { opacity: 1, duration: 0.3 });
                                        }
                                    });
                                });
                            });
                        }
                    });



                    // 5. 載入 Intro 基本資料
                    fetch("/api/intro")
                        .then(res => res.json())
                        .then(data => {
                            if(data.length > 0) {
                                const info = data[0];
                                document.querySelector("#left_title").innerText = info.title; // 導覽列的名字
                                document.querySelector("#intro h2").innerText = info.name;    // Intro 標題
                                document.querySelector("#intro p").innerText = info.introText; // 介紹文字
                                document.querySelector("#intro img").src = info.imgSrc;       // 大頭照
                            }
                        });
});