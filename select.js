function onSelect(){

    let noPointerEvent = '*:not(body){pointer-events: none; }';
    let noHighlight = `*{
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }`;
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.setAttribute('id','extention-style');    

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = noPointerEvent+noHighlight;
    } else {
        style.appendChild(document.createTextNode(noPointerEvent+noHighlight));
    }

    document.querySelectorAll('.alwayOn').forEach(element => {
        element.style.pointerEvents ='auto';
    });
}

function onDeselect(){

    document.getElementById('extention-style').remove();

}