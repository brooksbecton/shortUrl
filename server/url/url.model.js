const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { emojis } = require('./constants');
const APIError = require('../helpers/APIError');

const UrlSchema = new mongoose.Schema({
  hashId: { type: Number, required: true },
  url: { type: String, required: true },
  shortUrl: { type: String, required: true }
});

UrlSchema.statics = {
  // based here: https://stackoverflow.com/questions/742013/how-to-code-a-url-shortener
  shorten({ alphabet, count }) {
    const digits = [];
    while (count > 0) {
      const remainder = count % alphabet.length;
      digits.push(remainder);
      count = Math.floor(count / alphabet.length);
    }
    return digits.reverse();
  },
  deShorten(hash) {
    const userEmojis = hash.split('');

    const idList = userEmojis.map(emoji => emojis.indexOf(emoji));
    const hashId = idList.join();
    return this.findOne({ hashId });
  },
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */

  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such url exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
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
