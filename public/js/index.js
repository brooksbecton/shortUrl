/**
 * Wrapper for fetch POSTing
 * @param {String} url
 * @param {Object} data
 */
function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  }).then(response => response.json()); // parses response to JSON
}

/**
 * Creates a shortUrl and returns it's unique hash
 * @async
 * @param {String} url
 */
async function shortenUrl(url) {
  return new Promise(async (resolve, reject) => {
    if (isUrl(url)) {
      const result = await postData('/api/url', { url });
      const abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
      const hash = result.hashId.map(n => abc[n]).join('');
      resolve(hash);
    } else {
      reject('Not Valid URL');
    }
  });
}

/**
 * Driver for creating a short url
 * @async
 */
async function main() {
  const targetUrl = document.querySelector('.targetUrl').value;
  let result;
  try {
    result = await shortenUrl(targetUrl);
    const url = window.location + 'r/' + result;
    const resultDom = document.querySelector('.resultURL');
    resultDom.innerHTML = "<a class='animated fadeIn' href='" + url + " '>" + url + '</a>';
  } catch (error) {
    document.querySelector('.resultURL').innerHTML = '<strong><p>' + error + '</p></strong>';
  }
}

/**
 * @param {String} str
 * @returns {Boolean}
 */
function isUrl(str) {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
