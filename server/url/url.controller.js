const { emojis } = require('./constants');
const Url = require('./url.model');
const Count = require('./../count/count.model');

/**
 * Returns a given hash's full URL
 * @property {string} req.body.hash - Short Url Hash
 * @returns {String} - url
 */
async function get(req, res) {
  const hash = req.params.hash;
  const hashId = await Url.deShorten(hash);
  if (hashId) {
    res.send(hashId);
  } else {
    res.sendStatus(404);
  }
}

async function list(req, res) {
  const url = await Url.list();
  res.json(url);
}

async function post(req, res) {
  const url = req.body.url;
  const result = await Url.post(url);
  res.json(result);
}

async function create(req, res, next) {
  const newUrl = req.body.url;
  const count = await Count.get();
  const resp = await Url.findOne({ url: newUrl });

  //If there is already a short URL for the given URL
  if (resp) {
    return res.send(resp);
  } else {
    try {
      const hashId = Url.shorten({ alphabet: emojis, count });
      const url = new Url({
        url: newUrl,
        hashId
      });
      try {
        const savedUrl = await url.save();
        await Count.increment();
        res.json(savedUrl);
      } catch (error) {
        res.send(error);
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = { create, get, list };
