export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelectorAll(slide);
    this.wrapper = document.querySelectorAll(wrapper);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0
    }
  }

  moveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.forEach((slide) => {
      slide.style.transform = `translate3d(${distanceX}px, 0, 0`;
    })
    // this.slide.style.transform = `translate3d(${distanceX}px, 0, 0`;
    // console.log(this.slide.style.transform)
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6;
    return this.distance.finalPosition - this.distance.movement;
    // console.log(this.distance.movement)
  }

  onStart(index) {
    event.preventDefault();
    this.distance.startX = event.clientX; 
    this.wrapper[index].addEventListener('mousemove', this.onMove);
    // console.log(event)
    // console.log(this)
    // console.log('mouseDown');
  }

  onMove() {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
    // console.log(this.distance.startX - event.clientX)
    // console.log('move');
  }

  onEnd(index) {
    this.wrapper[index].removeEventListener('mousemove', this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
    // console.log('end');
  }

  addSlideEvents() {
    this.wrapper.forEach((wrapper, index) => {
      wrapper.addEventListener('mousedown', () => this.onStart(index));
    })

    this.wrapper.forEach((wrapper, index) => {
      wrapper.addEventListener('mouseup', () => this.onEnd(index));
    })
    // this.wrapper.addEventListener('mousedown', this.onStart);
    // this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}