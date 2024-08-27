document.addEventListener("DOMContentLoaded", () => {
  
  const sect = document.querySelectorAll("section");
  setTimeout(() => sect[0].classList.add("on"), 200);

  setTimeout(() => document.querySelector(".waves").classList.add("on"), 1200);

});