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

    const outlineSelectedElement = `.ui-br-ext-outlined-element{ 
        outline: 3px dashed!important;
        outline-color: red!important; 
      }`

    const head = document.head || document.getElementsByTagName('head')[0];

    const style = document.createElement('style');

    style.setAttribute('id','ui-br-ext-extention-style');    

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = noPointerEvent+noHighlight;
    } else {
        style.appendChild(document.createTextNode(noPointerEvent+noHighlight+outlineSelectedElement));
    }

    addClickToBody(getMouseCoordinates);
}

function onDeselect(){

    document.getElementById('ui-br-ext-extention-style')?.remove();

    removeClickFromBody(getMouseCoordinates);
    
    // Remove outline from any previously selected elements.
    document.querySelectorAll('.ui-br-ext-outlined-element').forEach(element => {
        element.classList.remove('ui-br-ext-outlined-element');
    });

}

function addClickToBody(eventFunction){

    const body = document.getElementsByTagName('html')[0];

    body.addEventListener('mousedown', eventFunction, true);

}

function removeClickFromBody(eventFunction){

    const body = document.getElementsByTagName('html')[0];

    body.removeEventListener('mousedown', eventFunction, true);

}

function getMouseCoordinates(event){

    if(event){
        const pageX = event.clientX;

        const pageY = event.clientY;

        findElementFromPoint(pageX, pageY);

    } 
    
}

function findElementFromPoint(pageX, pageY){

    // Temporarely removing 'pointer-evenet: none' style from head to find the element under pointer.
    document.getElementById('ui-br-ext-extention-style')?.remove();

    const element = document.elementFromPoint(pageX, pageY);

    if(
        element?.tagName.toLocaleLowerCase() != 'body'
        && element?.closest('#ui-br-ext-extention') === null
        ){
            
            // Enabling the 'pointer-evenet: none' after locating the element under the pointer.
            onSelect();
            outlineSelectedElement(element);
    }else{
      // Enabling the 'pointer-evenet: none' after locating the element under the pointer.
      onSelect();          
    }
}

/**
 * It styles the selected element by outlining it.
 * @param {selected element} element 
 */
function outlineSelectedElement(element){

    // Remove outline from any previously selected elements.
    document.querySelectorAll('.ui-br-ext-outlined-element').forEach(element => {
        element.classList.remove('ui-br-ext-outlined-element');
    });

    element.classList.add('ui-br-ext-outlined-element');

}