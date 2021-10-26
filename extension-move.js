

// test push.
var extension = document.getElementById('extension');
var containers = document.getElementsByClassName('container');
var viewportOffset = extension.getBoundingClientRect();
document.even

extension.addEventListener('mousedown',function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.target === extension) {
        onMouseDown();
    }
},true);

extension.addEventListener('mouseup',function(event){
    event.stopPropagation();
    event.preventDefault();
    onMouseUp();
},true);

extension.addEventListener('mouseout',function(event){
    event.stopPropagation();
    event.preventDefault();
    onMouseUp();
},true);

function moveExtension(e){
    var posX = e.pageX;
    var posY = e.pageY;
    console.log(posX, posY);
}

