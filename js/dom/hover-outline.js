const bodyChildren = document.querySelectorAll('body > *:not(#ui-br-ext-extention):not(script):not(noscript):not(style)');

const preventClick = (event) => preventClickHandler(event);

function addClickBlocker() {
    bodyChildren.forEach(el => {
        el.addEventListener('click', preventClick, {capture: true});
    });
}

function removeClickBlocker() {
    bodyChildren.forEach(el => {
        el.removeEventListener('click', preventClick, {capture: true});
    });
}

function preventClickHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    return false;
}


const hoverOn = (event) => hoverOnHandler(event);
const hoverOff = (event) => hoverOffHandler(event);

function addHover() {
    const body = document.querySelector('body');
    body.addEventListener('mouseover', hoverOn);
    body.addEventListener('mouseout', hoverOff);
}

function removeHover() {
    const body = document.querySelector('body');
    body.removeEventListener('mouseover', hoverOn);
    body.removeEventListener('mouseout', hoverOff);
}

function hoverOnHandler(event) {
    event.target.classList.add('ui-br-ext-hovered');
}

function hoverOffHandler(event) {
    event.target.classList.remove('ui-br-ext-hovered');
}