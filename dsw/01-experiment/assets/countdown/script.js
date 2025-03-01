const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const colonElement = document.getElementById("colon");
const tick = new Audio("tick.flac");
const alarm = new Audio("alarm.wav");
const SECOND_DURATION_IN_MS = 1000;

let countdownHandle;
let countdownTimer = 120;

function startCountdown() {
  updateTimerElements();
  countdownHandle = setInterval(updateTimer, SECOND_DURATION_IN_MS);
}

function cancelCountdown() {
  clearInterval(countdownHandle);
  countdownHandle = undefined;
}

function updateTimerElements() {
  minutesElement.innerText = Math.floor(countdownTimer / 60);
  secondsElement.innerText = (countdownTimer % 60).toString().padStart(2, "0");

  if (countdownTimer < 30) {
    minutesElement.classList.toggle("red");
    secondsElement.classList.toggle("red");
    colonElement.classList.toggle("red");
  } else {
    minutesElement.classList.remove("red");
    secondsElement.classList.remove("red");
    colonElement.classList.remove("red");
  }
}

function updateTimer(seconds = -1, sound = true) {
  countdownTimer += seconds;
  updateTimerElements();
  if (sound && countdownTimer > 0) {
    tick.play();
  }
  if (countdownTimer <= 0) {
    cancelCountdown();
    if (sound) {
      alarm.play();
    }
  }
}

function toggleCountdown() {
  if (countdownHandle) {
    cancelCountdown();
  } else {
    startCountdown();
  }
}

/**
 * Handles the keydown event.
 *
 * @param {KeyboardEvent} ev - The keyboard event object.
 */
function handleKeydown(ev) {
  console.log({ ev });

  if (ev.key == "Escape") {
    cancelCountdown();
    countdownTimer = 120;
  }
  if (ev.key == " ") {
    toggleCountdown();
  }
  if (ev.key == "ArrowUp") {
    countdownTimer += 10;
  }
  if (ev.key == "ArrowDown") {
    countdownTimer -= 10;
  }

  updateTimerElements();
}

document.onkeydown = handleKeydown;
updateTimerElements();