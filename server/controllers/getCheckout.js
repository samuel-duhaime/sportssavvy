// TODO: // Get the checkout info
const { getCollections } = require("../configs/mongoDB");

const getCheckout = async (req, res) => {
  // get id from frontend
  const id = req.params.checkoutId;
  // get collection
  const { checkout } = getCollections();
  try {
    // find checkout
    const checkoutResult = await checkout.findOne({ _id: id });
    if (checkoutResult) {
      return res.status(200).json({ status: 200, data: checkoutResult });
    } else {
      return res.status(400).json({
        status: 400,
        message: "this checkout does not exist",
      });
    }
  } catch (err) {
    // Error
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

module.exports = { getCheckout };
