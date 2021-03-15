function throttle(event, time) {
    let timer = null;
    if(!timer) {
        return function(...args) {
            timer = setTimeout(() => {
                timer = null;
                event.call(this, ...args)
            }, time)
        }
    }
}

function debounce(event ,time) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            event.call(this, ...args)
        }, time)
    }
}