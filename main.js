//Get document element 
var textDisplay = document.getElementById("txtdisplay");
var inputField = document.getElementById("txt");

// Initialize typing mode variables
let wordCount = 50;

// Initialize dynamic variables
let randomWords = [];
let wordList = [];
let currentWord = 0;
let correctKeys = 0;
let startDate = 0;

getCookie('wordCount') === '' ? setWordCount(50) : setWordCount(getCookie('wordCount'));

function setWordCount(wc) {
  
    setCookie('wordCount', wc, 90);
    wordCount = wc;
    document.querySelectorAll('.modes > span').forEach(e => (e.style.borderBottom = ''));
    document.querySelector(`#word-${wordCount}`).style.borderBottom = '2px solid';
    getText();
}

function getText(){
  fetch('text.json')
  .then(response => response.json())
  .then(json => {
     randomWords = json["english"];
     while (textDisplay.firstChild) {
      textDisplay.removeChild(textDisplay.lastChild);
    }
     setText();
  })
  .catch(err => console.error(err));
}

// Find a list of words and display it to textDisplay
function setText() {
    
    console.log(randomWords);
    currentWord = 0;
    correctKeys = 0;
    wordList = [];
    inputField.value = '';
    inputField.className = '';
    textDisplay.style.display = 'block';

    wordList = [];
    while (wordList.length < wordCount) {
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        if (wordList[wordList.length - 1] !== randomWord || wordList[wordList.length - 1] === undefined) {
            wordList.push(randomWord);
        }
    }
    showText();
}

function showText() {
    wordList.forEach(word => {
      var newWord = document.createTextNode(word + " ");
      textDisplay.appendChild(newWord);
    });
    textDisplay.firstChild.classList.add('highlight')
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
