/* element */
const timeSqures = document.querySelectorAll(".square button")
const textComplete = document.querySelector(".textshow")
const textEvent = document.querySelector(".event")
const mainScreen = document.querySelector(".mainTimer")
const customEventSceen = document.querySelector(".chooseCustomEvent")
const userBtn = document.querySelector(".userbtn")
const deleteBtn = document.querySelector(".deletebtn")
const crossBtn = document.querySelector(".cross")
const form = document.querySelector(".foam")
const yearInput = document.querySelector("#year")
const monthInput = document.querySelector("#month")
const dayInput = document.querySelector("#day")
const minutesInput = document.querySelector("#minutes")
const hoursInput = document.querySelector("#hour")
const titleInput = document.querySelector("#title")



/* global variables */
let futuretime;
let userEvent = false
let defaultEvent = true
userEvent =  JSON.parse(localStorage.getItem("userEvent"))
const defaultEventText = "time Remaining For New Year"

/* event lisners */
userBtn.addEventListener("click",() => {
    mainScreen.classList.add("hidden")
    customEventSceen.classList.remove("hidden")

} )

crossBtn.addEventListener("click",showCountDown)
form.addEventListener("submit",(e) => {
    main(e)
} )


if (userEvent) {
    defaultEvent = false
    yearInput.value = JSON.parse(localStorage.getItem("year"))
    monthInput.value = JSON.parse(localStorage.getItem("months"))
    dayInput.value = JSON.parse(localStorage.getItem("date"))
    hoursInput.value = JSON.parse(localStorage.getItem("hours"))
    minutesInput.value = JSON.parse(localStorage.getItem("minutes"))
    titleInput.value = JSON.parse(localStorage.getItem("t"))
    returnUserTime()
}

if (defaultEvent) {
    defaultEventCreate()
}

let countDown = setInterval(startCountTime, 1000);

deleteBtn.addEventListener("click",() => {
    localStorage.setItem("userEvent", false)
    userEvent = false
    defaultEvent = true
    defaultEventCreate()
    localStorage.clear()
})
    
function main(foam) {
    foam.preventDefault()
    showCountDown()
    defaultEvent = false
    userEvent = true
    localStorage.setItem("userEvent",true)
    returnUserTime()
}

function defaultEventCreate() {
    const tempYear = new Date().getFullYear()
    const futureDate = new Date(tempYear, 11, 31 + 1,0,0,0)
    futuretime = futureDate.getTime()
    textEvent.textContent = defaultEventText +" "+ (tempYear + 1)
    setInterval(startCountTime, 1000);

}
function returnUserTime() {
    if (userEvent) {
        const title = titleInput.value
        localStorage.setItem("t",JSON.stringify(title))
        const year =  parseInt(yearInput.value)
        localStorage.setItem("year",year)
        let months = parseInt(monthInput.value)
        localStorage.setItem("months",months)
        months = validateMonth(months)
        const date = parseInt(dayInput.value)
        localStorage.setItem("date",date)
        const hours = parseInt(hoursInput.value)
        localStorage.setItem("hours",hours)
        const minutes = parseInt(minutesInput.value)
        localStorage.setItem("minutes",minutes)
        textEvent.textContent =  "Time Remaining for "  + title
        const futureDate2 = new Date(year,months,date,hours,minutes)
        futuretime =  futureDate2.getTime()
        setInterval(startCountTime, 1000);
    }
}
function validateMonth(num) {
    if (num === 1) {
        return num =  0
    } else {
        return num - 1
    }
    
}
function showCountDown() {
    mainScreen.classList.remove("hidden")
    customEventSceen.classList.add("hidden")
}


function startCountTime() {
    const todayTime = new Date().getTime() 
    const remainingTime = futuretime - todayTime

    const oneDay = 24 * 60 * 60 * 1000
    const oneHour = 60 * 60 * 1000
    const oneMinute = 60 * 1000
    const oneSecond = 1000

    let daysRemain = Math.floor(remainingTime / oneDay)
    let houresRemain = Math.floor((remainingTime %  oneDay) / oneHour)
    let minutesRemain = Math.floor((remainingTime %  oneHour) / oneMinute)
    let secondsRemain = Math.floor((remainingTime %  oneMinute) / oneSecond)
    const data = [daysRemain,houresRemain,minutesRemain,secondsRemain]
    timeSqures.forEach((square,index) => {
        square.textContent =  format(data[index])

    })
    if (remainingTime < 0) {
        clearInterval(countDown)
        textComplete.classList.remove("hidden")
        timeSqures.forEach((square) => {
            square.textContent = "00"

        })
    }
    function format(item) {
        if (item < 10) {
          return (item = `0${item}`);
        }
        return item;
    }
}
