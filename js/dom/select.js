function onSelect(){
    console.log('on select');
    const allPointerEvent = 'body *{pointer-events: all!important; }';
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
        style.styleSheet.cssText = allPointerEvent+noHighlight;
    } else {
        style.appendChild(document.createTextNode(allPointerEvent+noHighlight));
    }
    addClickToHtml(getMouseCoordinates);
}

function onDeselect(){

    document.getElementById('ui-br-ext-extention-style')?.remove();

    removeClickFromBody(getMouseCoordinates);
    
    // Remove outline from any previously selected elements.
    document.querySelectorAll('.ui-br-ext-outlined-element').forEach(element => {
        element.classList.remove('ui-br-ext-outlined-element');
        element.style.cssText = window.bugReportextention.currentElementInlineStyle;
    });

    // Reset the global variable that holds the previously selected element properties.
    // Used to calculte element's parent.
    if(ui_br_ext_previousElement){
        ui_br_ext_previousElement.element = null,
        ui_br_ext_previousElement.parentCount = 0
    }

    // Disabling the "Report Bug" button if select operator is turned off.
    displayReportBugButton(false);

}

function addClickToHtml(eventFunction){

    const html = document.getElementsByTagName('html')[0];

    html.addEventListener('mousedown', eventFunction, true);

    addClickBlocker();

    addHover();

}

function removeClickFromBody(eventFunction){

    const html = document.getElementsByTagName('html')[0];

    html.removeEventListener('mousedown', eventFunction, true);

    removeClickBlocker();

    removeHover();

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
            
            outlineSelectedElement(element);
            displayReportBugButton(true);
            window.bugReportextention.selectedElement = element;
            //Used to crop dynamic elements
            window.bugReportextention.selectedElementRect = element.getBoundingClientRect();
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
        element.style.cssText = window.bugReportextention.currentElementInlineStyle;
    });

    element.classList.add('ui-br-ext-outlined-element');
    window.bugReportextention.currentElementInlineStyle = element.style.cssText;
    element.style.cssText = window.bugReportextention.currentElementInlineStyle + "outline: 3px dashed!important; outline-color: red!important; ";

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


/**
 * Gets the xpath of an outlined/selected element.
 * @param {selected/outlined element} element 
 * @returns xpath of outlined/selected element.
 */
function getElementXpath(elm){

    let allNodes = document.getElementsByTagName('*'); 
    let segs = []
    for (; elm && elm.nodeType == 1; elm = elm.parentNode) 
    { 
        if (elm.hasAttribute('id')) { 

            for (let i=0; i < allNodes.length; i++) { 
                
                    // Once next parent with ID is found, relative xpath is constructed based on that parent.
                    if (allNodes[i].hasAttribute('id') && allNodes[i].id == elm.id){
                        segs.unshift('//*[@id="' + elm.getAttribute('id') + '"]');
                        return segs.join('/'); 
                    }  
                }; 
             
        } else { 
            for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                if (sib.localName == elm.localName){
                    i++;
                }  
            }; 
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
        }; 

        if(elm.localName.toLowerCase() === 'html'){
            break;
        }
    }; 

    return segs.length ? '/' + segs.join('/') : null;    
}