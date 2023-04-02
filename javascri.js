let breakIncrementButton = document.getElementById('break-increment');
let breakDecrementButton = document.getElementById('break-decrement');
let sessionIncrementButton = document.getElementById('session-increment');
let sessionDecrementButton = document.getElementById('session-decrement');
let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');

let breakLength = document.getElementById('break-length');
let sessionLength = document.getElementById('session-length');
let timeLeft = document.getElementById('time-left');

let displayText = document.getElementById('timer-label');

let timerStatus = "beign";
let timer
let breakTimer


// Timer session increment
sessionIncrementButton.addEventListener("click", () => {
    let intSession = parseInt(sessionLength.innerHTML);
    if (intSession <= 58) {
        sessionLength.innerHTML = parseInt(intSession + 1);
        showTime(parseInt(sessionLength.innerHTML) * 60)
    } else {
        sessionLength.innerHTML = 60
        showTime(60*60)
    }
})

//Timer session decrement
sessionDecrementButton.addEventListener("click", () => { 
    let intSession = parseInt(sessionLength.innerHTML);
    if (intSession >= 2) {
        sessionLength.innerHTML = parseInt(intSession - 1);
        showTime(parseInt(sessionLength.innerHTML) * 60)
    } else {
        sessionLength.innerHTML = 1
        showTime(1*60)       
    } 
})


// Break increment
breakIncrementButton.addEventListener("click", () => {
    let intBreak = parseInt(breakLength.innerHTML);
    if (intBreak <= 58) {
        breakLength.innerHTML = parseInt(intBreak + 1); 
    } else {
        breakLength.innerHTML = 60
    }
     
})

//Break decrement
breakDecrementButton.addEventListener("click", () => { 
    let intBreak = parseInt(breakLength.innerHTML);
    breakLength.innerHTML = parseInt(intBreak - 1);
    if (intBreak >= 2) {
        breakLength.innerHTML = parseInt(intBreak - 1);
    } else {
        breakLength.innerHTML = 1
    } 

})

// Start stop the timer
startStopButton.addEventListener("click", () => {
    if (timerStatus === "beign" || timerStatus === "stopped") {
        // Timer is started
        timerStatus = "counting";
        let timeCalc = timeLeft.innerHTML.split(":")
        let minCalc = parseInt(timeCalc[0])
        let secCalc = parseInt(timeCalc[1])
        let toatalTimeInMinutes = minCalc * 60 + secCalc
        startTimer(parseInt(toatalTimeInMinutes))
    } else if (timerStatus === "counting") {       
        timerStatus = "stopped";
        clearInterval(timer);
    } else {
        timerStatus = "beign";
    }
})

// Reset the timer
resetButton.addEventListener("click", () => {
    clearInterval(timer);
    clearInterval(breakTimer);
    timerStatus = "beign";
    displayText.innerText = "Session"
    sessionLength.innerHTML = 25
    breakLength.innerText = 5
    showTime(parseInt(sessionLength.innerHTML) * 60)
    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime = 0;
})

// function for running the timer
function startTimer(time) {
    displayText.innerText = "Session"
    if (typeof timer !== undefined) {
        clearInterval(timer); 
    }
    let allowedTime = time;
    showTime(allowedTime)
    timer = setInterval(() => {      
        if (allowedTime == 0) {
            // clearInterval(timeout)
            clearInterval(timer)
            showTime(0)
            showTime(parseInt(breakLength.innerHTML) * 60)
            startBreak(parseInt(breakLength.innerHTML) * 60)
            document.getElementById('beep').play();
        } else {
            allowedTime--
            showTime(allowedTime)
        }        
    }, 1000);
}


// function for displaying the timer
function showTime(allowedTime) {
    let minutes = pad(Math.floor(allowedTime / 60))
    let seconds = pad(allowedTime % 60)
    let time = `${minutes}:${seconds}`
    document.title = time
    timeLeft.innerText = time
}

function pad(number) {
    return number < 10 ? `0${number.toString()}` : number
}

//break running logic
function startBreak(time) {
    displayText.innerText = "Break"
    if (typeof timer !== undefined) {
        clearInterval(breakTimer); 
    }
    let allowedTime = time;
    showTime(allowedTime)
    timer = setInterval(() => {      
        if (allowedTime == 0) {
            // clearInterval(timeout)
            clearInterval(breakTimer)
            showTime(0)
            showTime(parseInt(sessionLength.innerHTML) * 60)
            startTimer(parseInt(sessionLength.innerHTML) * 60)
            document.getElementById('beep').play();
        } else {
            allowedTime--
            showTime(allowedTime)
        }        
    }, 1000);
}