import './assets/common.css'
import './assets/main.css'
import { dragStart, dragEnd, dragProcess, dragReset } from './functions'
// import './assets/item.png'

console.info('Starting..')

const title:string = "Hello this is a test text" ; // changeable title string, just for demo.

const el = document.getElementById("title");
let item:HTMLElement;

if(el!==null)
    el.innerHTML = `<h1> -- ${title} -- </h1>`
else
    console.error('#title === null');

function initApp(el:HTMLElement, item:HTMLElement) {
    
    el.addEventListener("touchend", dragEnd, false);
    el.addEventListener("mouseup", dragEnd, false);

    el.addEventListener("touchstart", (ev)=> dragStart(item, ev), false);
    el.addEventListener("touchmove", (ev)=>dragProcess(item, ev), false);
    
    el.addEventListener("mousedown", (ev) => dragStart(item, ev), false);
    el.addEventListener("mousemove", (ev) => dragProcess(item, ev), false);
   
}

// Alternative to load event
document.onreadystatechange = () => {
    if (document.readyState === "complete") {

        const frame = document.getElementById("main");
        
        item = document.getElementById("item") as HTMLElement;
        if( frame !== null && item !== null ) {
            initApp(frame, item);
            dragReset( item );
        }
        else console.error('#frame or #item === null') 



    }
};

window.onresize =  () => {
    console.info('window resized')
    dragReset( item ); // reset position;
}
