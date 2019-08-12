/**
 * a function that returns the value of a specified cookie
 * @param  {cockieName} the name of the cockie we are after
 * @return {string} empety string or the cockie we want
 */
function getCookie(cockieName) {
  var name = cockieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
module.exports = getCookie