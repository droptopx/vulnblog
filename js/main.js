var recordedTopScroll = 0;
let hamMenu = document.getElementById("mobile-hamburger-menu");
let hamButton = document.getElementById("mobile-hamburger-menu-button");
let mobileNavBar = document.getElementById("mobile-navbar");
hamButton.onclick = function () {
  if (!hamButton.classList.contains("active")) {
    recordedTopScroll = document.documentElement.scrollTop;
  }
  hamButton.classList.toggle("active");
  hamMenu.classList.toggle("active");
  mobileNavBar.classList.toggle("active");
  setTimeout(function () {
    if (hamButton.classList.contains("active")) {
      document.body.classList.add("no-scroll");
      //document.documentElement.classList.toggle("no-scroll");
    }
  }, 600);

  if (!hamButton.classList.contains("active")) {
    document.body.classList.remove("no-scroll");
    //document.documentElement.classList.toggle("no-scroll");
    document.documentElement.scrollTop = recordedTopScroll;
  }
};

/*import anime from './anime.es.js';

anime({
    targets: '.staggering-grid-demo .el',
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},
      {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
  });*/
