


function resizeExtention() {
    let extention = document.getElementById('ui-br-ext-extention');
    let commentBox = document.getElementById('ui-br-ext-comment');
    let boxResize = document.getElementById('ui-br-ext-boxResize');
    let commentRect = commentBox.getBoundingClientRect();
    let mouseInitialX = 0;
    let mouseInitialY = 0;

    boxResize.addEventListener('mousedown',function(e){
        e.stopPropagation();
        e.preventDefault();
        let rect = e.target.getBoundingClientRect();
        mouseInitialY = rect.bottom - e.clientY;
        mouseInitialX = rect.right - e.clientX;
        onMouseDown(followMouse);
        commentBox.addEventListener('click', function(){
            e.stopPropagation();
            e.preventDefault();
            onMouseUp(followMouse)
        } )
        extention.addEventListener('click', function(){
            e.stopPropagation();
            e.preventDefault();
            onMouseUp(followMouse)
        } )
    },true);
    

    boxResize.addEventListener('mouseup',function(event){
        event.stopPropagation();
        event.preventDefault();
        onMouseUp(followMouse);
    },true);

    function followMouse(e){
        commentRect = commentBox.getBoundingClientRect();
        if (commentRect.width < 350 || commentRect.height < 200) {
            onMouseUp();
        }
        if (e.clientY > 0 && e.clientY < window.innerHeight){
            if (e.clientY - commentRect.top - mouseInitialY > 200 ) {
                commentBox.style.height = e.clientY - commentRect.top - 10  + "px";
            }
        }
        if (e.clientX > 0 && e.clientX < window.innerWidth){
            if (e.clientX - commentRect.left - mouseInitialX > 350) {
                commentBox.style.width = e.clientX - commentRect.left  + "px";
            }
        }
    }
} 

