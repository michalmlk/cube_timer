let countTime, scramble, scrambleContent, stopWatch, avgOf5, avgOf12, resetBtn, historyBtn, clearBtn, time, timeList, cubeSize, timesArea, timesAreaShadow

let mins = 0;
let secs = 0;
let milisecs = 0;
let recordCounter = 0;
let spaceCounter = 0;

// scramble

const twoScramble = ['R', `R'`, 'L', `L'`, 'F', `F'`, 'B', `B'`, 'U', `U'`, 'D', `D'`, 'R2', `R2'`, 'L2', `L2'`, 'F2', `F2'`, 'B2', `B2'`, 'U2', `U2'`, 'D2', `D2'`]
const threeScramble = ['R', `R'`, 'L', `L'`, 'F', `F'`, 'B', `B'`, 'U', `U'`, 'D', `D'`, 'U2', 'F2', 'D2', 'B2', 'L2', 'R2', `U2'`, `F2'`, `D2'`, `R2'`, `L2'`, `B2'`]
//generate scramble

const generateScramble = () => {
    scrambleContent.textContent = ""
    if (cubeSize.value === "22") {
        for (let i = 0; i < 9; i++) {
            const moveIndex = Math.floor(Math.random() * 23 + 1);
            scrambleContent.textContent += twoScramble[moveIndex] + "  "
        }
    } else if (cubeSize.value === "33") {
        for (let i = 0; i < 20; i++) {
            const moveIndex = Math.floor(Math.random() * 23 + 1);
            scrambleContent.textContent += threeScramble[moveIndex] + "  "
        }
    }
}
//clear times
const clearTimes = () => {
    timeList.innerHTML = ''
    recordCounter = 0
}
const closeTimeList = () =>{
    timesArea.classList.remove('visible')
}
// space valid
const checkSpace = (e) => {

    if (e.code === 'Space') {
        spaceCounter++;
        console.log(spaceCounter);
    }
    spaceCounter % 2 === 1 ? handleStart() : handleStop()
}
// start/stop handlers
const handleStart = () => {
    scrambleContent.classList.add('hide')
    countTime = setInterval(() => {
        // time.style.visibility = 'hidden'
        milisecs++
        if (milisecs <= 9 && secs <= 9) {
            // milisecs++;
            stopWatch.textContent = `0${mins}:0${secs}:0${milisecs}`
        } else if (milisecs > 9 && milisecs <= 99 && secs <= 9) {
            // milisecs++;
            stopWatch.textContent = `0${mins}:0${secs}:${milisecs}`
        } else if (milisecs <= 9 && secs > 9) {
            // milisecs++;
            stopWatch.textContent = `0${mins}:${secs}:0${milisecs}`
        } else if (milisecs > 9 && milisecs <= 99 && secs > 9) {
            // milisecs++;
            stopWatch.textContent = `0${mins}:${secs}:${milisecs}`
        } else if (milisecs > 99) {
            milisecs = 0;
            secs++;
        }
        if (secs > 59) {
            mins++
            secs = 0;
            if (mins < 9) {
                stopWatch.textContent = `0${mins}:0${secs}:${milisecs}`
            } else {
                stopWatch.textContent = `${mins}:0${secs}:${milisecs}`
            }
        }
    }, 10);
}
const handleStop = () => {
    scrambleContent.classList.remove('hide')
    clearInterval(countTime)
    time.textContent = stopWatch.textContent
    time.classList.add('visible')

    const recCount = document.createElement('span')
    recordCounter++;
    recCount.textContent = recordCounter;
    const recMeas = document.createElement('span')
    recMeas.textContent = stopWatch.textContent + " "
    const newRec = document.createElement('li')
    newRec.append(recCount, recMeas)
    timeList.append(newRec)
    mins = 0
    secs = 0
    milisecs = 0
    generateScramble()
}
const prepareDOMElements = () => {
    scramble = document.querySelector('.scramble')
    stopWatch = document.querySelector('.stopWatch')
    time = document.querySelector('.time')
    avgOf5 = document.querySelector('.avg-of-5')
    avgOf12 = document.querySelector('.avg-of-12')

    resetBtn = document.querySelector('.reset')
    historyBtn = document.querySelector('.history')
    clearBtn = document.querySelector('.btn.clear')

    timeList = document.querySelector('.time-list')
    timesArea = document.querySelector('.times-area')
    timesAreaShadow = document.querySelector('.times-area-shadow')
    cubeSize = document.querySelector('#size-select')
    scrambleContent = document.querySelector('.scramble-content')
}

const prepareDOMEvents = () => {
    window.addEventListener('keyup', checkSpace)
    resetBtn.addEventListener('click', () => {
        stopWatch.textContent = '00:00:00'
    })
    cubeSize.addEventListener('click', generateScramble)
    historyBtn.addEventListener('click', () => {
        timesArea.classList.toggle('visible')
    })
    clearBtn.addEventListener('click', clearTimes)
    window.addEventListener('click', e =>{
        e.target===timesAreaShadow  ? timesAreaShadow.classList.remove('visible') : false
    })
}

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}
window.addEventListener('DOMContentLoaded', main)