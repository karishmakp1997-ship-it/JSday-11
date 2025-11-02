let startTime;
let elapsedTime = 0;
let timerInterval;

// Load from sessionStorage if available
if (sessionStorage.getItem("startTime")) {
    startTime = Number(sessionStorage.getItem("startTime"));
    elapsedTime = Number(sessionStorage.getItem("elapsedTime"));
    if (sessionStorage.getItem("running") === "true") {
        startTimer();
    } else {
        updateDisplay(elapsedTime);
    }
}

document.getElementById("start").addEventListener("click", () => {
    if (!timerInterval) {
        if (!startTime) startTime = Date.now() - elapsedTime;
        startTimer();
        sessionStorage.setItem("running", "true");
        sessionStorage.setItem("startTime", startTime);
    }
});

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = Date.now() - startTime;
    sessionStorage.setItem("elapsedTime", elapsedTime);
    sessionStorage.setItem("running", "false");
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    startTime = null;
    updateDisplay(0);
    sessionStorage.clear();
});

function startTimer() {
    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        updateDisplay(elapsedTime);
        sessionStorage.setItem("elapsedTime", elapsedTime);
    }, 100);
}

function updateDisplay(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    document.getElementById("display").textContent = `${hours}:${minutes}:${seconds}`;
}