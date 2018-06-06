const Count = require('./count.model');

/**
 * Creates a new count document
 * @param {Number} count
 */
async function create(count = 0) {
  const newCount = new Count({
    count
  });

  const resp = await newCount.save();
  return resp;
}

/**
 * Returns a given hash's full URL
 * @async
 * @returns {Number} - count
 */
async function get(req, res) {
  try {
    const count = await Count.get();
    res.send({ count });
  } catch (e) {
    // Create the count and retry
    const resp = await create();
    get(req, res);
  }
}

module.exports = { get };
