let sentenceBox = document.getElementById("sentence");
let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let input = document.querySelector("#inputText");
let speed = document.querySelector("#speed");
let correctLetters = document.querySelector("#correctLetters");
let wrongLetters = document.querySelector("#wrongLetters");
let correctWords = document.querySelector("#correctWords");
let timerBox = document.getElementById("timerBox");
let timerspan = document.getElementById("timer");
let resultBox = document.getElementById("result");
let resultBtn = document.getElementById("resultBtn");

const sentences = ["The quick brown fox jumps over the lazy dog."];
let seconds = 0;
let minutes = 0;
let totalTime;
let totalcorrectLetters = 0;
let totalfalseLetters = 0;
let sentenceindex = 0;
let sentenceText = sentences[0];
let currentSentenceCharac;

// Typing Test Start Function
startBtn.addEventListener("click", () => {
  showSentence();
  showInputBar();
  startBtn.style.display = "none";
});

// Typing Sentence Show Function
function showSentence() {
  sentenceBox.style.display = "block";
  sentenceBox.innerText = sentenceText;
}

// Input Bar Show Function
function showInputBar() {
  input.style.display = "block";
}

// Input Actions = Timer Start and Character Check
let timerStarted = false;
input.addEventListener("focus", () => {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
});
// Timer Start Function
let timerInterval;
function startTimer() {
  timerBox.style.display = "flex";
  timerInterval = setInterval(() => {
    seconds++;

    if (seconds === 60) {
      minutes++;
      seconds = 0; // Seconds reset
    }

    // Agar value 10 se chhoti hai toh "0" add karein
    let secStr = seconds < 10 ? `0${seconds}` : seconds;
    let minStr = minutes < 10 ? `0${minutes}` : minutes;

    // Agar minutes > 0 hain toh "min:sec" dikhaye, warna sirf "sec"
    let timeStr = minutes > 0 ? `${minStr}:${secStr}` : `00:${secStr}`;

    timerspan.innerText = timeStr;
  }, 1000);
}
input.addEventListener("input", () => {
  checkCharacter();
});

// Character Check Function
function checkCharacter() {
  currentInpCharac = input.value.slice(-1);
  currentSentenceCharac = sentenceText[sentenceindex];
  currentSentenceCharac = currentSentenceCharac.toLowerCase();
  currentInpCharac = currentInpCharac.toLowerCase();
  if (currentInpCharac === currentSentenceCharac) {
    updateCorrectChar();
    updateSentenceChar();
  } else {
    updateFalseChar();
    removeFalseLetter();
    wrongLetterRedAnimation();
  }
  if (input.value.length === sentenceText.length - 1) {
    input.disabled = true;
    totalTime = `${minutes}:${seconds}`;
    console.log("Total Time is: " + totalTime);
    clearInterval(timerInterval);
    showResultBtn();
  }
}

// Increase the correct letters count
function updateCorrectChar() {
  ++totalcorrectLetters;
  correctLetters.innerText = totalcorrectLetters;
  correctWords.innerText = totalcorrectLetters / 5;
}
function updateSentenceChar() {
  ++sentenceindex;
}
// Wrong Character
function updateFalseChar() {
  ++totalfalseLetters;
  wrongLetters.innerText = totalfalseLetters;
}
function wrongLetterRedAnimation() {
  input.classList.add("inputError");

  setTimeout(() => {
    input.classList.remove("inputError");
  }, 1000);
}
function removeFalseLetter() {
  input.value = input.value.slice(0, -1);
}

// Check WPM Function

function CheckSpeed() {
  let timeInSeconds = minutes * 60 + seconds;
  if (timeInSeconds === 0) timeInSeconds = 1;
  words = totalcorrectLetters / 5;
  wpm = Math.round(words / (timeInSeconds / 60));
  speed.innerText = wpm;
}

// Show Results
function showResultBtn() {
  resultBtn.style.display = "block";
}
resultBtn.addEventListener("click", () => {
  showResult();
});
function showResult() {
  CheckSpeed();
  resultBox.style.display = "block";
}
// Restart Typing Test Function
restartBtn.addEventListener("click", () => {
  hideSentence();
  hideInput();
});

// To Do
// Input main jo kuch type karlia wo backspace se hte ga nae

// Result ko show karein jab typing test khatam ho jaye
// Result ko local storage mein save karein and override krain
// last result ko show krain

// Restart button ko kaam karein jo typing test ko restart karein
// Input field ko clear karein jab typing test khatam ho jaye

// Additional Improvements
// Show Every Letter as button
// When user type the letter, it should be highlighted in green color
// When use type one letter correctly, the next letter should be highlighted

// When user type the wrong letter, it should be highlighted in red color
// Active Letter will not move to next
