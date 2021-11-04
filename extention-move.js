
window.bugReportextention = {};


function moveExtention() {
    let extention = document.getElementById('ui-br-ext-extention');
    let header = document.getElementById('ui-br-ext-header');
    let extentionPosTop = 0;
    let extentionPosLeft = 0;

    header.addEventListener('mousedown',function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.target === header) {
            let rect = event.target.getBoundingClientRect();
            extentionPosTop = event.clientY - rect.top;
            extentionPosLeft = event.clientX - rect.left;
            extention.classList.add('ui-br-ext-moving');
            onMouseDown(followMouse);
        }
    },true);

    header.addEventListener('mouseup',function(event){
        event.stopPropagation();
        event.preventDefault();
        extention.classList.remove('ui-br-ext-moving');
        onMouseUp(followMouse);
    },true);

    function followMouse(e){
        if (e.clientY > 0 && e.clientY < window.innerHeight){
            extention.style.top = e.clientY - extentionPosTop + "px";
        }
        if (e.clientX > 0 && e.clientX < window.innerWidth){
            extention.style.left = e.clientX - extentionPosLeft + "px";
        }
    }
} 







