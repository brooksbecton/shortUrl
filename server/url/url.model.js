const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { emojis } = require('./constants');
const APIError = require('../helpers/APIError');

const UrlSchema = new mongoose.Schema({
  hashId: { type: [Number], required: true },
  url: { type: String, required: true }
});

UrlSchema.statics = {
  /**
   * Creates a unique hash based of a given alphabet and count
   * {@link https://stackoverflow.com/questions/742013/how-to-code-a-url-shortener | Example}
   * @param {Array} alphabet
   * @param {Array} count
   */
  shorten({ alphabet, count }) {
    const digits = [];
    while (count >= 0) {
      const remainder = count % alphabet.length;
      digits.push(remainder);
      count = Math.floor(count / alphabet.length);
      count--;
    }
    return digits.reverse();
  },
  /**
   * Takes hash from a shortUrl and returns the url for that hash
   * @async
   * @param {String} hash
   * @returns {String|undefined}
   */
  async deShorten(hash) {
    const idList = Array.from(hash).map(emoji => emojis.indexOf(emoji));
    if (!(idList.indexOf(-1) !== -1)) {
      try {
        return await this.findOne({ hashId: idList }, (err, url) => {
          if (!err && url) {
            return url;
          } else {
            return undefined;
          }
        });
      } catch (error) {
        return new Error('No Short Url for ' + hash);
      }
    }
  },
  /**
   * Get url
   * @param {ObjectId} id - The objectId of url.
   * @returns {Promise<Url, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(url => {
        if (url) {
          return url;
        }
        const err = new APIError('No such url exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * List urls in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of urls to be skipped.
   * @param {number} limit - Limit number of urls to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Url
 */
module.exports = mongoose.model('Url', UrlSchema);
