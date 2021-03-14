var currLang = document.getElementsByClassName("currLang");
currLang[0].innerHTML = getCookie("lang"); 

var circleBorder;

setBorder();

function setBorder(){
  var langName = currLang[0].innerHTML.substring(0, 3);
  langName = langName.toLowerCase();
  circleBorder = document.getElementsByClassName(langName);
  circleBorder[0].classList.add("selected");
}

function setLang(langChoice){
    circleBorder[0].classList.remove("selected");
    setCookie('lang',langChoice,90);
    currLang[0].innerHTML = getCookie("lang"); 
    setBorder();
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