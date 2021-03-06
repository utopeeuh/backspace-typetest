//Get document element 
var textDisplay = document.getElementById("txtdisplay");
var inputField = document.getElementById("txt");
var retryButton = document.getElementById("retry");

// Initialize typing mode variables
let wordCount;

// Initialize dynamic variables
let randomWords = [];
let wordList = [];
let currentWord = 0;
let correctKeys = 0;
let startDate = 0;
let lang;

getCookie('wordCount') === '' ? setWordCount(50) : setWordCount(getCookie('wordCount'));
getCookie('lang') === '' ? lang = 'English' : lang = getCookie('lang');

function setWordCount(wc) {
    setCookie('wordCount', wc, 90);
    wordCount = wc;
    document.querySelectorAll('.modes > span').forEach(e => (e.style.borderBottom = ''));
    document.querySelector(`#word-${wordCount}`).style.borderBottom = '2px solid';
    getText();
}

function getText(){
  fetch('/text.json')
  .then(response => response.json())
  .then(json => {
     randomWords = json[lang];
     while (textDisplay.firstChild) {
      textDisplay.removeChild(textDisplay.lastChild);
    }
     setText();
  })
  .catch(err => console.error(err));
}

// Find a list of words and display it to textDisplay
function setText() {
    
    currentWord = 0;
    correctKeys = 0;
    wordList = [];
    inputField.value = '';
    inputField.className = '';

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
      var newWord = document.createElement("span");
      newWord.innerHTML = word + " ";
      textDisplay.appendChild(newWord);
    });
    var child = textDisplay.firstChild;
    child.classList.add("highlight");
}

//---------------------------------------------------------------------------------------

//Inputting text
inputField.addEventListener('keydown', e => {
	if (currentWord < wordList.length) inputFieldClass();
	
	function inputFieldClass() {

    if (e.key === ' ' && inputField.value.length === 0){
      inputField.value='';
    }

		if (e.key >= 'a' && e.key <= 'z') {
			let inputWordSlice = inputField.value + e.key;
			let currentWordSlice = wordList[currentWord].slice(0, inputWordSlice.length);
			inputField.className = inputWordSlice === currentWordSlice ? "clear" : "wrongfield";
		} 
		
		else if (e.key === 'Backspace') {
      // ctrl + backspace == clear word
			let inputWordSlice = e.ctrlKey ? '' : inputField.value.slice(0, inputField.value.length - 1);
			let currentWordSlice = wordList[currentWord].slice(0, inputWordSlice.length);
			inputField.className = inputWordSlice === currentWordSlice ? "clear" : "wrongfield";
		} 
		
		else if (e.key === ' ') {
			inputField.className = "clear"; 
		}
	}

  inputField.className = e.getModifierState("CapsLock") ? "clear" : "wrongfield";

  if (currentWord === 0 && inputField.value === ''){
    startDate = Date.now();
  }

  if (e.key === ' ') {
    e.preventDefault();

    if (inputField.value !== '') {
      // If it is not the last word increment currentWord,
      if (currentWord < wordList.length - 1) {

        //word is correct
        if (inputField.value === wordList[currentWord]) {
          textDisplay.childNodes[currentWord].classList.add("correct");
          correctKeys += wordList[currentWord].length + 1;
        } 
        
        //word is wrong
        else {
          textDisplay.childNodes[currentWord].classList.add("wrong");
        }

        textDisplay.childNodes[currentWord + 1].classList.add("highlight");
      } 
      
      //Last word and wrong
      else if (currentWord === wordList.length - 1) {
        textDisplay.childNodes[currentWord].classList.add("wrong");
        showResult();
      }

      inputField.value = '';
      currentWord++;
    }
  }
  // Else if it is the last word and input word is correct show the result
  else if (currentWord === wordList.length - 1) {
    if (inputField.value + e.key === wordList[currentWord]) {
      textDisplay.childNodes[currentWord].classList.add('correct');
      correctKeys += wordList[currentWord].length;
      currentWord++;
      showResult();
    }
  }
});

//---------------------------------------------------------------------------------------
function showResult() {
  let words, minute, acc;
  words = correctKeys / 5;
  minute = (Date.now() - startDate) / 1000 / 60;
  let totalKeys = -1;
  wordList.forEach(e => (totalKeys += e.length + 1));
  acc = Math.floor((correctKeys / totalKeys) * 100);
   
  let wpm = Math.floor(words / minute);
  document.querySelector('#bigstats').innerHTML = `${wpm} / ${acc} %`;
  setRecord(wpm, acc);

}

function setRecord(wpm, acc){
  var wc = wordCount;
  var score = wpm*acc;
  var currWPM = parseInt(getCookie(wc+"-wpm"));
  var currACC = parseInt(getCookie(wc+"-acc"));
  var currRecord = currWPM*currACC;

  if(currRecord === ''){
    currRecord = 0;
  }

  if( score > currRecord){
    ;
    setCookie(wc+"-wpm", wpm, 90);
    setCookie(wc+"-acc", acc, 90);
    setCookie(wc+"-date", convDate(), 90);
  }
}

function convDate (date){
  var d = new Date();
  var newDate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
  return newDate;
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
      console.log( c.substring(name.length, c.length))
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
