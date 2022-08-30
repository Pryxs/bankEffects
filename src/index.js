import imageHoverEffect from './image-hover-effect/image-hover-effect.js';
import retroBackground from './retro-background/retro-background.js';
import grainBackground from './grain-background/grain-background.js';
import verticalSlider from './vertical-slider/vertical-slider.js';
// import loader from './loader/loader.js';



function kebabToCamel(pageName){
    return pageName.replace(/-./g, x=>x[1].toUpperCase());
}

function getCurrentPage(){
    var path = window.location.pathname;
    var currentPage = path.split("/").pop().split('.')[0];
    return kebabToCamel(currentPage);
}
console.log(getCurrentPage())
switch (getCurrentPage()) {
    case 'imageHoverEffect':
        imageHoverEffect();
        break;
    case 'retroBackground':
        retroBackground();
        break;
    case 'grainBackground':
        grainBackground();
        break;
    case 'verticalSlider':
        verticalSlider();
        break;
    case 'loader':
        // loader();
        break;
    default:
}
