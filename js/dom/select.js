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

    // Reset the global variable that holds the previously selected element properties.
    if(ui_br_ext_previousElement){
        ui_br_ext_previousElement.element = null,
        ui_br_ext_previousElement.parentCount = 0
    }

    // Disabling the "Report Bug" button if select operator is turned off.
    displayReportBugButton(false);


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

// Global variable to hold previously clicked element properties.
let ui_br_ext_previousElement = {

    element : null,
    parentCount : 0

}

// Global variable that defines how many parents are included on repeated click on the same element.
const ui_br_ext_parentLimit = 5;

function findElementFromPoint(pageX, pageY){

    // Temporarely removing 'pointer-evenet: none' style from head to find the element under pointer.
    document.getElementById('ui-br-ext-extention-style')?.remove();

    let element = document.elementFromPoint(pageX, pageY);

    const retainSelectedElement = document.elementFromPoint(pageX, pageY);

    if(element 
       && ui_br_ext_previousElement.element !== null
       && ui_br_ext_previousElement.parentCount < ui_br_ext_parentLimit 
       && element?.closest('#ui-br-ext-extention') === null){

        // Previously selected element's top and left coordicates.
        const previousElementRect = ui_br_ext_previousElement.element.getBoundingClientRect();
        const previousElementTop = previousElementRect.top;
        const previousElementLeft = previousElementRect.left;

        // Currently selected element's top and left coordicates.
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top;
        const elementLeft = elementRect.left;

        if(previousElementTop === elementTop && previousElementLeft === elementLeft){

            /**
             * if selected element's parent is already outlined, then we outline the next parent (up to 5).
             */
            let parentElement = null;
            let parentOutlined = false;

            for(let i=1; i<ui_br_ext_parentLimit; i++){

                parentElement = parentElement !== null
                ? parentElement.parentElement
                : element.parentElement;

                if(parentElement?.classList.contains('ui-br-ext-outlined-element')){
                    parentOutlined = true;
                    ui_br_ext_previousElement.parentCount ++;
                    break;
                }

            }

            if(!parentOutlined){
                ui_br_ext_previousElement.parentCount ++;
            }

            element = parentOutlined
            ? parentElement.parentElement
            : element.parentElement;

        }

    }

    ui_br_ext_previousElement.element = retainSelectedElement;

    if(
        element?.tagName.toLocaleLowerCase() != 'body'
        && element?.tagName.toLocaleLowerCase() != 'html'
        && element?.closest('#ui-br-ext-extention') === null
        ){
            
            // Enabling the 'pointer-evenet: none' after locating the element under the pointer.
            onSelect();
            outlineSelectedElement(element);
            displayReportBugButton(true);
    }else{
      // Enabling the 'pointer-evenet: none' after locating the element under the pointer.
      onSelect();          
    }

    if(ui_br_ext_previousElement.parentCount === ui_br_ext_parentLimit){
        ui_br_ext_previousElement.element = null,
        ui_br_ext_previousElement.parentCount = 0
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
/**
 * 
 * @param {boolean, true - enables a button, false - disbales a button} enable 
 */
function displayReportBugButton(enable){

    const reportBugButton = document.getElementById('ui-br-ext-report-bug-button');

    reportBugButton.style.display = enable 
    ? reportBugButton.classList.remove('ui-br-ext-report-bug-inactive') 
    : reportBugButton.classList.add('ui-br-ext-report-bug-inactive');    

}