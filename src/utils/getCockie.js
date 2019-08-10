/**
 * a function that returns the value of a specified cookie
 * @param  {cockieName} the name of the cockie we are after
 * @return {string} empety string or the cockie we want
 */

function getCookie(cockieName) {
  const name = `${cockieName}=`;
  // this runs only on the browser so there is
  // eslint-disable-next-line no-undef
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
export default getCookie;
