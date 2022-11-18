
let startX: number;
let startY: number;
let offsetX: number = 0;
let offsetY: number = 0;
let currX: number;
let currY: number;
let flag: boolean = false;

export function dragEnd() {
  startX = currX;
  startY = currY;
  flag = false;
}

export function dragReset( el:HTMLElement ) {
  currX = 0;
  currY = 0;
  offsetX = 0;
  offsetY = 0;
  flag = false;
  el.style.transform = `translate3d(${currX}px,${currY}px, 0)`;
}

export function dragStart(
    el:HTMLElement, 
    ev:any // TouchEvent|MouseEvent 
  ) {

  console.debug("Drag Start:", el, ev);

  if (ev.type === "touchstart") {
    startX = ev.touches[0].clientX - offsetX;
    startY = ev.touches[0].clientY - offsetY;
  } else {
    startX = ev.clientX - offsetX;
    startY = ev.clientY - offsetY;
  }

  if (ev.target === el) {
    flag = true;
  }
}

export function dragProcess(
    el:HTMLElement, 
    ev:any // TouchEvent|MouseEvent 
  ){
  if (flag) {
  
    ev.preventDefault();
  
    if (ev.type === "touchmove") {
      currX = ev.touches[0].clientX - startX;
      currY = ev.touches[0].clientY - startY;
    } else {
      currX = ev.clientX - startX;
      currY = ev.clientY - startY;
    }

    offsetX = currX;
    offsetY = currY;
    el.style.transform = `translate3d(${currX}px,${currY}px, 0)`;
  }
}
