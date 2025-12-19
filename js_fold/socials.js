// 保留這段鼠標與動畫邏輯
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 鼠標邏輯 ---
    const cursor = document.querySelector("#custom-cursor");
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    // --- 視差動畫 (Timeline) ---
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
      .to("#layer-tree1",  { scale: 1.4 }, 0.1)
      .to("#layer-sky",    { scale: 1.1 }, 0)
      .to("#text-overlay h1", { opacity: 1, scale: 1 }, 0.2);

    // --- Header 滑入 (當動畫結束進入 Intro 時) ---
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

    //DRAWING SLIDER部分
    // 在 socials.js 的 DOMContentLoaded 內加入：

    const track = document.querySelector(".slider-track");
    const sections = gsap.utils.toArray(".card-item");

    // 計算需要往左移動的距離：(軌道總寬度 - 視窗寬度)
    let trackWidth = track.scrollWidth;
    let moveDistance = trackWidth - window.innerWidth;

    gsap.to(track, {
        x: () => -moveDistance, // 往左移動
        ease: "none", // 視差捲動通常用 none 感覺最線性直接
        scrollTrigger: {
            trigger: ".drawing-horizontal-section",
            pin: true,           // 固定住區塊，直到水平移動完畢
            scrub: 1,            // 讓動畫跟隨滾輪
            start: "top top",    // 當區塊頂部到達視窗頂部時開始
            end: () => "+=" + moveDistance, // 垂直捲動的距離等於水平移動的距離
            invalidateOnRefresh: true // 視窗縮放時重新計算
        }
    });






});

