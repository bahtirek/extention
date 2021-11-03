function onSelect(){

    const noPointerEvent = 'body *{pointer-events: none; }';
    const noHighlight = `*{
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }`;
    const head = document.head || document.getElementsByTagName('head')[0];

    const style = document.createElement('style');

    style.setAttribute('id','ui-br-ext-extention-style');    

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = noPointerEvent+noHighlight;
    } else {
        style.appendChild(document.createTextNode(noPointerEvent+noHighlight));
    }

    addClickToBody();
}

function onDeselect(){

    document.getElementById('ui-br-ext-extention-style')?.remove();

    //removeClickFromBody();

}

function addClickToBody(){

    const body = document.getElementsByTagName('body')[0];

    body.addEventListener('mousedown', function (event) {
        getMouseCoordinates(event);
    }, true);

}

function removeClickFromBody(){

    const body = document.getElementsByTagName('body')[0];

    body.removeEventListener('mousedown', getMouseCoordinates());

}

function getMouseCoordinates(event){

    const pageX = event.pageX;

    console.log(pageX);
    
}