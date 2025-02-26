let hourDisplay = document.getElementById('hour');
let minDisplay = document.getElementById('minute');
let secDisplay = document.getElementById('second');
let millisecDisplay = document.getElementById('millisecond');
let markedDiv = document.getElementById('marked');

let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');
let markBtn = document.getElementById('mark');

let msec = 0;
let sec = 0;
let min = 0;
let hrs = 0;
let counter = 0;
let flag = 1;

let msString = '00';
let secString = '00';
let minString = '00';
let hrsString = '00';

let timerId = null;

startBtn.addEventListener('click', function(){
    if(flag == 0){
        flag = !flag;
        startBtn.innerText = 'Start';
        clearInterval(timerId);
        timerId = null;
    }else{
        flag = !flag;
        startBtn.innerText = 'Stop';
        timerId = setInterval(start, 10);
    }
});

resetBtn.addEventListener('click', function(){
    clearInterval(timerId);
    timerId = null;
    flag = 1;
    startBtn.innerText = 'Start';
    hourDisplay.innerHTML = '00';
    minDisplay.innerHTML = '00';
    secDisplay.innerHTML = '00';
    millisecDisplay.innerHTML = '00';
    msec = sec = min = hrs = 0;
    counter = 0;
    msString = minString = secString = hrsString = '00';
    markedDiv.innerHTML = '';
    markedDiv.classList.remove('show');
    setTimeout(()=>{
        markedDiv.style.display = 'none';
    }, 500);
});

markBtn.addEventListener('click', function(){
    let markElement = document.createElement('div');
    markElement.classList.add('saved');
    markedDiv.style.display = 'block';
    setTimeout(()=>{
        markedDiv.classList.add('show');
    }, 10);
    
    counter++;
    let ctrString = counter < 10 ? `0${counter}` : counter;
    
    let timeRecord = `${hrsString} : ${minString} : ${secString} : ${msString}`;
    
    let firstChild = markedDiv.firstChild;
    let timeDiff = '00 : 00 : 00 : 00';
    if (firstChild && firstChild.nodeType === 1) {
        timeDiff = timeDifference(timeRecord, (firstChild.querySelector('h4').innerText));
    }
    
    markElement.innerHTML = `<div class="counter">${ctrString}.</div><div class="time"> + ${timeDiff} </div><h4>${timeRecord}</h4>`;
    
    markedDiv.insertBefore(markElement, markedDiv.firstChild);
    setTimeout(() => {
        markElement.classList.add('show');
    }, 50);
});

function timeDifference(currTime, prevTime){
    let currParts = currTime.split(' : ').map(part => parseInt(part, 10));
    let prevParts = prevTime.split(' : ').map(part => parseInt(part, 10));

    let hrs = currParts[0] - prevParts[0];
    let min = currParts[1] - prevParts[1];
    let sec = currParts[2] - prevParts[2];
    let msec = currParts[3] - prevParts[3];

    if (msec < 0) {
        msec += 100;
        sec -= 1;
    }
    
    if (sec < 0) {
        sec += 60;
        min -= 1;
    }

    if (min < 0) {
        min += 60;
        hrs -= 1;
    }

    let msString = msec < 10 ? `0${msec}` : msec;
    let secString = sec < 10 ? `0${sec}` : sec;
    let minString = min < 10 ? `0${min}` : min;
    let hrsString = hrs < 10 ? `0${hrs}` : hrs;

    return `${hrsString} : ${minString} : ${secString} : ${msString}`;
}

function start(){
    msec++;
    if(msec == 100){
        sec++;
        msec = 0;
        if(sec == 60){
            min++;
            sec = 0;
            if(min == 60){
                min = 0;
                hrs++;
            }
        }
    }
    msString = msec < 10 ? `0${msec}` : msec;
    secString = sec < 10 ? `0${sec}` : sec;
    minString = min < 10 ? `0${min}` : min;
    hrsString = hrs < 10 ? `0${hrs}` : hrs;

    hourDisplay.innerHTML = `${hrsString}`;
    minDisplay.innerHTML = `${minString}`;
    secDisplay.innerHTML = `${secString}`;
    millisecDisplay.innerHTML = `${msString}`;
}