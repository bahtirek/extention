
window.bugReportExtension = {};

moveExtension();

function moveExtension() {
    let extension = document.getElementById('extension');
    let extensionPosTop = 0;
    let extensionPosLeft = 0;

    this.extension.addEventListener('mousedown',function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.target === extension) {
            let rect = event.target.getBoundingClientRect();
            extensionPosTop = event.clientY - rect.top;
            extensionPosLeft = event.clientX - rect.left;
            onMouseDown(followMouse);
        }
    },true);

    this.extension.addEventListener('mouseup',function(event){
        event.stopPropagation();
        event.preventDefault();
        onMouseUp(followMouse);
    },true);

    function followMouse(e){
        if (e.pageY > 0 && e.pageY < window.innerHeight){
            this.extension.style.top = e.pageY - extensionPosTop + "px";
        }
        if (e.pageX > 0 && e.pageX < window.innerWidth){
            this.extension.style.left = e.pageX - extensionPosLeft + "px";
        }
    }
} 







