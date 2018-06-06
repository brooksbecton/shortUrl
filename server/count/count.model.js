const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const CountSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now }
});

CountSchema.statics = {
  /**
   * Get the current count
   * @returns {Promise<count, APIError>}
   */
  async get() {
    const counts = await this.find()
      .sort({ createdAt: -1 })
      .exec();

    if (counts.length !== 0) {
      // Create the default count
      return counts[0].count;
    }
    const err = new APIError('No Count availible', httpStatus.NOT_FOUND);
    return Promise.reject(err);
  },
  /**
   * Increments the current count
   * @returns {Promise<count, APIError>}
   */
  increment() {
    return this.find()
      .sort({ createdAt: -1 })
      .exec()
      .then(counts => {
        if (counts.length !== 0) {
          const counter = counts[0];
          counter.count += 1;

          return counter.save();
        }
        const err = new APIError('No Count availible', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef Count
 */
module.exports = mongoose.model('Count', CountSchema);
