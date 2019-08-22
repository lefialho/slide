import {SlideNav} from './slide.js';

const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();
slide.addArrow('.prev', '.next');
slide.addControl()

console.log(slide);
// slide.changeSlide(1);
// slide.activePrevSlide();
// slide.activeNextSlide();