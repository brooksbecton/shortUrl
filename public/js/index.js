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

async function shortenUrl(url) {
  return new Promise(async (resolve, reject) => {
    if (isUrl(url)) {
      const result = await postData('/api/url', { url });
      const abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
      const shortUrl = Array.from(result.hashId.toString())
        .map(n => abc[n])
        .join();
      resolve(shortUrl);
    } else {
      reject('Not Valid URL');
    }
  });
}

async function main() {
  const targetUrl = document.querySelector('.targetUrl').value;
  let result;
  try {
    result = await shortenUrl(targetUrl);
  } catch (error) {
    result = 'Not a Valid URL';
  }
  document.querySelector('.resultURL').innerHTML = result;
}

function isUrl(str) {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
