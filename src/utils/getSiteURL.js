/**
 * return the site url, can run in node and the browser
 * @return {string} The site url
 */
const getSiteURL = () => (process.env.SITE_URL ? process.env.SITE_URL : document.location.origin);


module.exports = getSiteURL;
