

var holdStarter = null;

var holdDelay = 200;

var holdActive = false;

function onMouseDown(callback){

    holdStarter = setTimeout(function() {

        holdStarter = null;

        holdActive = true;

        window.addEventListener('mousemove', callback, true);

    }, holdDelay);

}

function onMouseUp(callback){

    if (holdStarter) {

        clearTimeout(holdStarter);

        window.removeEventListener('mousemove', callback, true);

    }

    else if (holdActive) {

        holdActive = false;

        window.removeEventListener('mousemove', callback, true);

    }

}