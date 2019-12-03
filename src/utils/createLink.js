/**
 * return the spotify log in link with all the options
 * @return {string}
 */
const createLink = (queryParams) => {
  let link = `${process.env.SITE_URL}/login-with-spotify?`;
  link += Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
  return link;
};

module.exports = createLink;
