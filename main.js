window.addEventListener("load", () => {

  document.querySelector(".loading").classList.add("off");
  setTimeout(() => document.querySelector(".loading").style.display = "none", 1000);

  let docWidth = document.querySelector("body").getBoundingClientRect().width;
  //fullpage
  const fullpageSetting = {
    anchors: ['section01', 'section02', 'section03', 'section04', 'section05'],
    menu: ".navi",
    onLeave: function (origin, destination) {
      document.querySelectorAll(".section")[destination.index].classList.add("on");

      let navIdx = destination.index === 0 ? 0 : destination.index - 1;
      document.querySelectorAll(".navi li").forEach((e) => e.classList.remove("on"));
      if (docWidth < 450 || destination.index !== 0) document.querySelectorAll(".navi li")[navIdx].classList.add("on");

      if (destination.index === 2) {
        document.querySelector(".sectionBg").classList.remove("on");
      }
      if (destination.index === 3) {
        document.querySelector(".sectionBg").classList.add("on");
      }
    },
    afterLoad: function (origin, destination) {
      let navIdx = destination.index === 0 ? 0 : destination.index - 1;
      if (navIdx === -2) navIdx = Number(destination.anchor.slice(-1)) - 2;
      document.querySelectorAll(".navi li").forEach((e) => e.classList.remove("on"));
      if (docWidth < 450 || destination.index !== 0) document.querySelectorAll(".navi li")[navIdx].classList.add("on");
    }
  };
  new fullpage("#fullpage", fullpageSetting);

  //100vh 세팅
  function setViewport() {
    docWidth = document.querySelector("body").getBoundingClientRect().width;
    const vh = window.innerHeight;
    let headerH;
    if (docWidth >= 450) headerH = 80;
    if (docWidth < 450) headerH = 90;
    document.querySelectorAll("#fullpage>section").forEach((e, i) => {
      if (i === 0 || i === 2 || i === 3) {
        e.querySelector(".contents").style.height = `${vh - headerH}px`;
      }
    });
    document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
  }
  setViewport();
  window.addEventListener("resize", setViewport);

  //page1
  const sect = document.querySelectorAll("section");
  setTimeout(() => sect[0].classList.add("on"), 500);

  setTimeout(() => document.querySelector(".section01 .waves").classList.add("on"), 1200);

  //page4
  //swiper
  const swiperSetting = {
    slidesPerView: 2,
    // 무한 루프
    autoplay: true,
    loop: true,
    loopAdditionalSlides: 1,
    //페이지를 로딩한 직후 작동
    observer: true,
    observeParents: true,
    // loopedSlides: 1,
    pagination: {
      el: ".swiperBtnWrapper",
      clickable: true,
    },
    navigation: {   // 버튼
      nextEl: ".swiperArrowNext",
      prevEl: ".swiperArrowPrev",
    },
    centeredSlides: true,
    on: {
      slideChangeTransitionStart: function () {
        const { realIndex } = this;
        if (realIndex >= 4) {
          const idx = realIndex - 4;
          document.querySelectorAll(".swiper-pagination-bullet").forEach((e, i) => {
            e.classList.remove("swiper-pagination-bullet-active");
            if (i === idx) e.classList.add("swiper-pagination-bullet-active");
          })
        }
      }
    },
    scrollOverflow: true,
  };
  let swiper;
  const setSwiper = () => {
    if (docWidth >= 1440) {
      swiper = new Swiper('.swiper', {
        ...swiperSetting,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: 30,
          modifier: 2.83,
          slideShadows: false
        },
      });
      return;
    }
    if (docWidth >= 450) {
      swiper = new Swiper('.swiper', {
        ...swiperSetting,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: 30,
          modifier: 2.6,
          slideShadows: false
        },
      });
      return;
    }
    swiper = new Swiper('.swiper', {
      ...swiperSetting,
      effect: 'cube',
      cubeEffect: {
        slideShadows: false
      }
    });
  }

  setSwiper();
  window.addEventListener("resize", () => {
    docWidth = document.querySelector("body").getBoundingClientRect().width;
    swiper && swiper.destroy();
    setSwiper();
  });

  //page5
  const faqBtn = document.querySelectorAll(".faq .btn");
  faqBtn.forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.toggle("on");
      e.closest("dt").nextElementSibling.classList.toggle("on");
    });
  });

  let isNav = false;
  document.querySelector("footer nav").addEventListener("click", (e) => {
    isNav = !isNav;
    e.target.classList.toggle("on");
    console.log(isNav)
    if (isNav) {
      let lh = 0;
      document.querySelectorAll("footer nav li").forEach(() => {
        lh += docWidth >= 450 ? 53 : 39;
      });
      document.querySelector("footer ul").style.height = `${lh}px`;
    } else {
      document.querySelector("footer ul").style.height = "0";
    }
  });

  document.querySelector("body").style.height = `${window.innerHeight}px`;
});

document.addEventListener("DOMContentLoaded", () => {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);

  const imagesW = [
    "main1_off.jpg",
    "main1_on.jpg",
    "main2_off.png",
    "main2_on.png",
    "main3.png",
    "main4.png"
  ];
  const imagesP = [
    "main1_off_p.jpg",
    "main1_on_p.jpg",
    "main2_off.png",
    "main2_on.png",
    "main3.png",
    "main4.png"
  ]
  const imagesM = [
    "main1_off_m.jpg",
    "main1_on_m.jpg",
    "main2_off_m.jpg",
    "main2_on_m.jpg",
    "main3_m.png",
    "main4_m.png"
  ]

  let images = [];
  const setImages = (img) => {
    img.forEach((e, i) => {
      images[i] = new Image();
      images[i].src = `https://dhnp.speedgabia.com/images/${e}`;
    });
  }
  const docWidth = document.querySelector("body").getBoundingClientRect().width;
  docWidth <= 450 && setImages(imagesM);
  (docWidth > 450 && docWidth <= 1050) && setImages(imagesP);
  docWidth > 1050 && setImages(imagesW);
});