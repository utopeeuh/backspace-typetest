var types = ["15","30", "50", "100", "200"];

types.forEach( e=>{
    var wpmRecord = document.getElementById(`${e}-wpm`);
    var accRecord = document.getElementById(`${e}-acc`);
    var dateRecord = document.getElementById(`${e}-date`);

    const wpmCurr = getCookie(`${e}-wpm`);
    const accCurr = getCookie(`${e}-acc`);
    const dateCurr = getCookie(`${e}-date`);
    
    if(wpmCurr !== ''){
        wpmRecord.innerHTML = wpmCurr;
        accRecord.innerHTML = accCurr+"%";
        dateRecord.innerHTML = dateCurr;
    }
})

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