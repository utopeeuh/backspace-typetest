let sectionList = ["bgColor", "mainColor", "txtColor", "corColor", "wroColor"];
showColor();

function showColor(){
  sectionList.forEach(e=>{
    let currSection = document.getElementById(e);
    currSection.setAttribute("value", getCookie(e));
  })
}

function seeColor(section){
  console.log("Section: " + section);
  let sectionColor = document.getElementById(section).value;
  console.log("Color: " + sectionColor);
  setCookie(section, sectionColor, 90);
}

function setNone(){
  setCookie("isNone", true, 90);
  setCustomColor();
}

function setTheme(_newTheme) {    
  const newTheme = _newTheme.toLowerCase();
  console.log("new theme: " + newTheme);
  fetch(`./themes/${newTheme}.css`)
    .then(response => {
      if (response.status === 200) {
        response
          .text()
          .then(css => {
            setCookie('theme', newTheme, 90);
            document.querySelector('#theme').setAttribute('href', `themes/${newTheme}.css`);
          })
          .catch(err => console.error(err));
      }else {
        console.log(`theme ${newTheme} is undefine`);
      }
    })
  .catch(err => console.error(err));
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
