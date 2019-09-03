import SlideNav from './slide.js';

const slide = new SlideNav('#slide', '#slide-wrapper');
slide.init();
slide.addArrow('#prev', '#next');
slide.addControl('#custom-controls')

const slide2 = new SlideNav('#slide2', '#slide-wrapper2');
slide2.init();
slide2.addArrow('#prev2', '#next2');
slide2.addControl('#custom-controls2');

const slide3 = new SlideNav('#slide3', '#slide-wrapper3');
slide3.init();

// console.log(slide);
// slide.changeSlide(1);
// slide.activePrevSlide();
// slide.activeNextSlide();