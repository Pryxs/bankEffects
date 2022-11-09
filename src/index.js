import imageHoverEffect from './image-hover-effect/image-hover-effect.js';
import retroBackground from './retro-background/retro-background.js';
import grainBackground from './grain-background/grain-background.js';
import squareBackground from './square-background/square-background.js';
import intersection from './intersection-observer/intersection-observer.js';
import threeSandbox from './three-sandbox/three-sandbox.js';



function kebabToCamel(pageName){
    return pageName.replace(/-./g, x=>x[1].toUpperCase());
}

function getCurrentPage(){
    var path = window.location.pathname;
    var currentPage = path.split("/").pop().split('.')[0];
    return kebabToCamel(currentPage);
}

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
    case 'squareBackground':
        squareBackground();
        break;
    case 'intersection':
        intersection();
        break;
    case 'threeSandbox':
        threeSandbox();
        break;
    default:
}
