// List of possible words
var words = ["hangman", "javascript", "programming", "PIANO", "sequence", "Shipes"];

// Select a random word from the list
var word = words[Math.floor(Math.random() * words.length)];

var guesses = [];
var maxWrongGuesses = 6;
var wrongGuesses = 0;

// Hangman drawing stages
var hangmanCanvas = document.getElementById("hangman-canvas");
var hangmanContext = hangmanCanvas.getContext("2d");

function drawHangman() {
  hangmanContext.beginPath();
  if (wrongGuesses === 1) {
    // Draw the gallows
    hangmanContext.moveTo(20, 380);
    hangmanContext.lineTo(380, 380);
    hangmanContext.lineTo(200, 380);
    hangmanContext.lineTo(200, 20);
    hangmanContext.lineTo(100, 20);
    hangmanContext.lineTo(100, 60);
    hangmanContext.stroke();
  } else if (wrongGuesses === 2) {
    // Draw the head
    hangmanContext.arc(100, 100, 40, 0, 2 * Math.PI);
    hangmanContext.stroke();
  } else if (wrongGuesses === 3) {
    // Draw the body
    hangmanContext.moveTo(100, 140);
    hangmanContext.lineTo(100, 260);
    hangmanContext.stroke();
  } else if (wrongGuesses === 4) {
    // Draw the left arm
    hangmanContext.moveTo(100, 160);
    hangmanContext.lineTo(60, 220);
    hangmanContext.stroke();
  } else if (wrongGuesses === 5) {
    // Draw the right arm
    hangmanContext.moveTo(100, 160);
    hangmanContext.lineTo(140, 220);
    hangmanContext.stroke();
  } else if (wrongGuesses === 6) {
    // Draw the left leg
    hangmanContext.moveTo(100, 260);
    hangmanContext.lineTo(60, 320);
    hangmanContext.stroke();
    // Draw the right leg
    hangmanContext.moveTo(100, 260);
    hangmanContext.lineTo(140, 320);
    hangmanContext.stroke();
  }
}

// Display the word with correctly guessed letters and underscores for the unguessed letters
function displayWord() {
  var wordDiv = document.getElementById("word");
  var displayedWord = "";
  for (var i = 0; i < word.length; i++) {
    if (guesses.includes(word[i])) {
      displayedWord += word[i] + " ";
    } else {
      displayedWord += "_ ";
    }
  }
  wordDiv.textContent = displayedWord;
}

// Display the guessed letters
function displayGuesses() {
  var guessesDiv = document.getElementById("guesses");
  guessesDiv.textContent = "Guesses: " + guesses.join(", ");
}

// Check if the game has been won
function checkWin() {
  var correctCount = 0;
  for (var i = 0; i < word.length; i++) {
    if (guesses.includes(word[i])) {
      correctCount++;
    }
  }
  if (correctCount === word.length) {
    alert("Congratulations! You won!");
    resetGame();
  }
}

// Check if the game has been lost
function checkLoss() {
  if (wrongGuesses === maxWrongGuesses) {
    alert("Game over! The word was: " + word);
    resetGame();
  }
}

// Reset the game
function resetGame() {
  guesses = [];
  wrongGuesses = 0;
  word = words[Math.floor(Math.random() * words.length)];
  hangmanContext.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
  displayWord();
  displayGuesses();
}

// Initialize the game
function initGame() {
  drawHangman();
  displayWord();
  displayGuesses();

  // Create buttons for each letter of the alphabet
  var buttonsDiv = document.getElementById("buttons");
  for (var i = 0; i < 26; i++) {
    var button = document.createElement("button");
    var letter = String.fromCharCode(65 + i).toLowerCase();
    button.textContent = letter;
    button.addEventListener("click", function() {
      var selectedLetter = this.textContent;
      if (!guesses.includes(selectedLetter)) {
        guesses.push(selectedLetter);
        if (!word.includes(selectedLetter)) {
          wrongGuesses++;
          drawHangman();
        }
      }
      displayWord();
      displayGuesses();
      checkWin();
      checkLoss();
    });
    buttonsDiv.appendChild(button);
  }
}

// Start the game
initGame();