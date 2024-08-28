document.addEventListener("DOMContentLoaded", () => {

  const sect = document.querySelectorAll("section");
  setTimeout(() => sect[0].classList.add("on"), 200);

  setTimeout(() => document.querySelector(".waves").classList.add("on"), 1200);
  let idx = 0;
  const swiperSetting = {
    slidesPerView: 2,
    // 무한 루프
    // autoplay: true,
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
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 30,
      modifier: 2.83,
      slideShadows: false
    },
    centeredSlides: true,
    on: {
      slideChangeTransitionStart: function () {
        const { realIndex } = this;
        if(realIndex >= 4) {
          const idx = realIndex - 4;
          document.querySelectorAll(".swiper-pagination-bullet").forEach((e, i) => {
            e.classList.remove("swiper-pagination-bullet-active");
            if(i === idx) e.classList.add("swiper-pagination-bullet-active");
          })
        }
      }
    }
  }
  const swiper = new Swiper('.swiper', swiperSetting);


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
    if(isNav) {
      let lh = 0;
      document.querySelectorAll("footer nav li").forEach(() => {
        lh += 53;
      });
      document.querySelector("footer ul").style.height = `${lh}px`;
    } else {
      document.querySelector("footer ul").style.height = "0";
    }
  });
});