const { emojis } = require('./constants');
const Url = require('./url.model');
const Count = require('./../count/count.model');

/**
 * Returns a given hash's full URL
 * @async
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

/**
 * Returns a list of short url documents
 * @returns {[String]}
 */
async function list(req, res) {
  const urls = await Url.list();
  res.json(urls);
}

/**
 * Attempts to create a short url given a url
 * @param {string} req.body.url - url to hash
 * @returns {Object} - Url Document
 */
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
