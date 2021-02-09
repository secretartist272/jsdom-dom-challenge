let timer = document.getElementById("counter")
let timerInterval = setInterval(function () {
    timer.innerText = parseInt(timer.innerText) + 1
}, 1000)
let plusButton = document.getElementById("plus")
let minusButton = document.getElementById("minus")
let likeButton = document.getElementById("heart")
let pauseButton = document.getElementById("pause")
let likesList = document.getElementsByClassName("likes")[0]
let body = document.body
let likeTracker = {}
let form = document.getElementById("comment-form")
let commentsList = document.getElementById("list")

function handleClick(e) {
    console.log("clicking")
    switch (e.target.id) {
        case "plus":
            timer.innerText = parseInt(timer.innerText) + 1
            break;
        case "minus":
            if (parseInt(timer.innerText) > 0) {
                timer.innerText = parseInt(timer.innerText) - 1
            }
            break;
        case "heart":
            let likedNums = Object.keys(likeTracker)
            let numString = timer.innerText
            if (likedNums.includes(numString)) {
                likeTracker[`${numString}`]++
                let numOfLikes = likeTracker[`${numString}`]
                let li = likesList.querySelector(`li[data-id="${numString}"]`)
                li.innerText = `${numString} has been liked ${numOfLikes} times`
                console.log("in here", likeTracker)
            } else {
                console.log("not here", likeTracker)
                likeTracker[`${numString}`] = 1
                let li = document.createElement("li")
                li.dataset.id = numString
                li.innerText = numString + " " + "has been liked 1 time"
                likesList.appendChild(li)
            }
            break
        case "pause":
            clearInterval(timerInterval)
            plusButton.disabled = true
            minusButton.disabled = true
            likeButton.disabled = true
            let resumeButton = document.createElement("button")
            resumeButton.innerText = "resume"
            resumeButton.id = "resume"
            e.target.parentNode.replaceChild(resumeButton, pauseButton)
            break
        case "resume":
            console.log("resuming")
            timerInterval = setInterval(function () {
                timer.innerText = parseInt(timer.innerText) + 1
            }, 1000)
            plusButton.disabled = false
            minusButton.disabled = false
            likeButton.disabled = false
            pauseButton = document.createElement("button")
            pauseButton.innerText = "pause"
            pauseButton.id = "pause"
        default:
            break;
    }
}

function submitHandler(e) {
    e.preventDefault()
    let comment = e.target[0].value
    let pTag = document.createElement("p")
    pTag.innerText = comment
    commentsList.appendChild(pTag)
    form.reset()
}






form.addEventListener("submit", submitHandler)
body.addEventListener("click", handleClick)