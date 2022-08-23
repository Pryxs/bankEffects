import imageHoverEffect from './image-hover-effect/image-hover-effect.js';
import retroBackground from './retro-background/retro-background.js';

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
    default:
}
