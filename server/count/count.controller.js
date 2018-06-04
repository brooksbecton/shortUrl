const Count = require('./count.model');

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
  const count = await Count.get();
  if (count) {
    res.send(count);
  } else {
    // Create the count and retry
    const resp = await create();
    get(req, res);
  }
}

module.exports = { get };
