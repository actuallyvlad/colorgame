var numSquares = 6;
var colors = [];
var pickedColor;
var bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var h1BackgroundColor = window.getComputedStyle(h1).backgroundColor;
var resetButton = document.querySelector("#reset");
var modeButtons =  document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    
    squares[i].addEventListener("click", function(){
      var clickedColor = this.style.backgroundColor;
      
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play again?";
      }
      else {
        this.style.backgroundColor = bodyBackgroundColor;
        messageDisplay.textContent = "Try Again";
      }
    });
  }
} 

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  h1.style.backgroundColor = h1BackgroundColor;
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    }
    else {
      squares[i].style.display = "none";
    }
  }
}

resetButton.addEventListener("click", function(){
  reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function generateRandomColors(num) {
  var randomColors = [];

  for (var i = 0; i < num; i++) {
    randomColors.push(randomColor());
  }

  return randomColors;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
  
  return rgb;
}
