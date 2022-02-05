const { findById } = require('./DAL');

async function test(req, res) {
  const found = await findById('0xb21115ff7cba56c1971546a628a8ce1595eddbc5d1fac4a0c50bf65f7d3b3dcd');
  console.log({ found });
  const notFound = await findById('la');
  console.log({ notFound });
  res.send('ok');
}

module.exports = {
  test,
};
