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

    // --- 2. 視差動畫 (Parallax) ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#parallax-container",
            start: "top top",
            end: "+=4000",
            scrub: 1.5,
            pin: true,
            invalidateOnRefresh: true 
        }
    });
    tl.to("#layer-grass", { scale: 1.6 }, 0)
      .to("#layer-tree1", { scale: 1.4 }, 0.1)
      .to("#layer-sky", { scale: 1.1 }, 0)
      .to("#text-overlay h1", { opacity: 1, scale: 1 }, 0.2);

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

    // --- 4 & 5. 橫向捲動邏輯 (DRAWING & PICTURE 共用) ---
    const horizontalSections = document.querySelectorAll(".drawing-horizontal-section");

    horizontalSections.forEach((section) => {
        const track = section.querySelector(".slider-track");
        if (!track) return;

        // 計算移動距離：軌道寬度 - 視窗寬度 + 額外的 padding
        const getMoveDistance = () => track.scrollWidth - window.innerWidth + (window.innerWidth * 0.2);

        gsap.to(track, {
            x: () => -getMoveDistance(),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => "+=" + getMoveDistance(),
                invalidateOnRefresh: true
            }
        });
    });

    // --- 6. VIDEO 切換邏輯 ---
    const videoTabs = document.querySelectorAll(".video-tab");
    const videoPlayer = document.querySelector("#main-video-player");

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
                        videoPlayer.volume = 0.1;
                        videoPlayer.onloadeddata = () => {
                            gsap.to(videoPlayer, { opacity: 1, duration: 0.3 });
                        };
                    }
                });
            });
        });
    }
});