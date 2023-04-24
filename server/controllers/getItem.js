const { getCollections } = require("../configs/mongoDB");

const getItem = async (req, res) => {
  const id = req.params.itemId;
  try {
    const { items } = getCollections(); // items collection

    // Find the item
    const getItem = await items.findOne({ _id: Number(id) });
    if (getItem) {
      return res.status(200).json({
        status: 200,
        data: getItem,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "this item does not exist",
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

module.exports = { getItem };
