
window.bugReportExtension = {};


function moveExtention() {
    let extension = document.getElementById('ui-br-ext-extension');
    let header = document.getElementById('ui-br-ext-header');
    let extensionPosTop = 0;
    let extensionPosLeft = 0;

    header.addEventListener('mousedown',function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.target === header) {
            let rect = event.target.getBoundingClientRect();
            extensionPosTop = event.clientY - rect.top;
            extensionPosLeft = event.clientX - rect.left;
            onMouseDown(followMouse);
        }
    },true);

    header.addEventListener('mouseup',function(event){
        event.stopPropagation();
        event.preventDefault();
        onMouseUp(followMouse);
    },true);

    function followMouse(e){
        console.log(e.clientX, e.clientY);
        if (e.clientY > 0 && e.clientY < window.innerHeight){
            extension.style.top = e.clientY - extensionPosTop + "px";
        }
        if (e.clientX > 0 && e.clientX < window.innerWidth){
            extension.style.left = e.clientX - extensionPosLeft + "px";
        }
    }
} 







