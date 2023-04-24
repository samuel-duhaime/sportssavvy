const { getCollections } = require("../configs/mongoDB");

// Add or remove an item to the user cart
const patchUserCartItems = async (req, res) => {
  const { userId } = req.params;
  const { itemId, quantity } = req.body;
  console.log(req.body);
  if (!itemId || quantity === undefined) {
    // Action not authorized
    return res
      .status(400)
      .json({ status: 400, message: "Action not authorized" });
  }

  try {
    const { items, users } = getCollections(); // get collections

    const getItem = await items.findOne({ _id: itemId });
    const getUser = await users.findOne({ _id: userId });

    // No item
    if (!getItem) {
      return res.status(404).json({ status: 404, message: "No item" });
    }

    // No user
    if (!getUser) {
      return res.status(404).json({ status: 404, message: "No user" });
    }

    // Not enough item stock
    if (getItem.numInStock < quantity) {
      return res
        .status(404)
        .json({ status: 404, message: "Not enough item stock" });
    }

    /* Update the cartItems */
    const userCartItems = getUser.cartItems; // Get the user cartItems
    const isItemInCart = userCartItems.some((item) => item._id === itemId); // Check if item is already in cart
    // Push new item if more than 1
    if (!isItemInCart) {
      if (quantity > 0)
        userCartItems.push({ _id: itemId, quantity, price: getItem?.price });
    }
    // Change quantity of oldItem
    const newUserCartItems = userCartItems
      .map((item) => {
        // If same than itemId
        if (item._id === itemId) {
          if (quantity > 0) {
            return { _id: item._id, quantity, price: item.price };
          } else {
            return null;
          }
        } else {
          return { _id: item._id, quantity: item.quantity, price: item.price };
        }
      })
      .filter(Boolean); // Filter null object

    // All good
    if (newUserCartItems) {
      await users.updateOne(
        { _id: userId },
        { $set: { cartItems: newUserCartItems } }
      );

      return res
        .status(200)
        .json({ status: 200, data: { cartItems: newUserCartItems } });
    } else {
      // Undefined error
      return res.status(200).json({ status: 404, message: "Undefined error" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { patchUserCartItems };
