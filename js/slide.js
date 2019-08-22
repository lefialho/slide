export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = {finalPosition: 0, startX: 0, movement: 0}
  }

  moveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0`;
    // console.log(this.slide.style.transform)
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6;
    return this.distance.finalPosition - this.distance.movement;
     // console.log(this.distance.movement)
  } 

  onStart(event) {
    let moveType;
    if(event.type === 'mousedown') {
      event.preventDefault();
      this.distance.startX = event.clientX;
      moveType = 'mousemove'
      // console.log(event)
    } else {
      this.distance.startX = event.changedTouches[0].clientX;
      moveType = 'touchmove'
      // console.log(event)
    }
    this.wrapper.addEventListener(moveType, this.onMove);
    // console.log(event)
    // console.log(this)
    // console.log('mouseDown');
  }
  
  onMove() {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
    // console.log(this.distance.startX - event.clientX)
    // console.log('move');
  }

  onEnd(event) {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove'
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
     // console.log('end');
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  //Slides config
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {
        position,
        element
      }
    });
    // console.log(this.slideArray)
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1;
    // console.log(last)
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    }
  }
  
  changeSlide(index) {
    const activeSlide = this.slideArray[index]
    this.moveSlide(activeSlide.position);
    this.slideIndexNav(index);
    this.distance.finalPosition = activeSlide.position;
    console.log(activeSlide)
    // console.log(this.index)
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}