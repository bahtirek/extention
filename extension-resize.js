


function resizeExtension() {
    console.log('resize');
    let extension = document.getElementById('extension');
    let commentBox = document.getElementById('comment');
    let boxResize = document.getElementById('boxResize');
    let commentRect = commentBox.getBoundingClientRect();
    let mouseInitialX = 0;
    let mouseInitialY = 0;

    this.boxResize.addEventListener('mousedown',function(e){
        console.log(e);
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
    },true);
    

    this.boxResize.addEventListener('mouseup',function(event){
        event.stopPropagation();
        event.preventDefault();
        onMouseUp(followMouse);
    },true);

    function followMouse(e){
        commentRect = commentBox.getBoundingClientRect();
        if (commentRect.width < 350 || commentRect.height < 200) {
            onMouseUp();
        }
        if (e.pageY > 0 && e.pageY < window.innerHeight){
            if (e.clientY - commentRect.top - mouseInitialY > 200 ) {
                commentBox.style.height = e.clientY - commentRect.top - mouseInitialY + "px";
            }
        }
        if (e.pageX > 0 && e.pageX < window.innerWidth){
            if (e.clientX - commentRect.left - mouseInitialY > 350) {
                commentBox.style.width = e.clientX - commentRect.left - mouseInitialY + "px";
            }
        }
    }
} 

