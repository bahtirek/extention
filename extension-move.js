
window.bugReportExtension = {};

moveExtension();

function moveExtension() {
    let extension = document.getElementById('extension');
    let header = document.getElementById('header');
    let extensionPosTop = 0;
    let extensionPosLeft = 0;

    this.header.addEventListener('mousedown',function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.target === header) {
            let rect = event.target.getBoundingClientRect();
            extensionPosTop = event.clientY - rect.top;
            extensionPosLeft = event.clientX - rect.left;
            onMouseDown(followMouse);
        }
    },true);

    this.header.addEventListener('mouseup',function(event){
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







