/**
 * a function that refresh the beraer token in the client with a cockie
 * @return {promise} promise fetch with new barer token in the body and the cockie
 */

const refreshToken = () => {
  console.log('refresh Token');
  const refreshTokenUrl = '/refresh-spotify-token';
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(refreshTokenUrl, options);
};

function AuthenticatedFetch(fetchWithAuthenticationNeeds, url, options) {
  return new Promise((resolve, reject) => {
    fetchWithAuthenticationNeeds(url, options)
      .then(response => response.json())
      .then((myJson) => {
        if (myJson.error) {
          if (myJson.error.status >= 400 && myJson.error.status <= 404) {
            // if true, continue to refresh token and then reFetch
            return myJson;
          }
        } else {
          resolve(myJson); // fulfilled
          throw Error('fulfilled, error throwen just to stop the then refresh token flow');
        }
      })
      .then(() => refreshToken())
      .then(response => response.json())
      .then(() => fetchWithAuthenticationNeeds(url, options))
      .then(response => response.json())
      .then(myJson => resolve(myJson))
      .catch((error) => {
        reject(error); // rejected
      });
  });
}

export default AuthenticatedFetch;
