

let extension = document.getElementById('extension');
let extensionPosTop = 0;
let extensionPosLeft = 0;

extension.addEventListener('mousedown',function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.target === extension) {
        let rect = event.target.getBoundingClientRect();
        extensionPosTop = event.clientY - rect.top;
        extensionPosLeft = event.clientX - rect.left;
        onMouseDown();
    }
},true);

extension.addEventListener('mouseup',function(event){
    event.stopPropagation();
    event.preventDefault();
    onMouseUp();
},true);

function moveExtension(e){
    extension.style.top = e.pageY - extensionPosTop + "px";
    extension.style.left = e.pageX - extensionPosLeft + "px";
}

