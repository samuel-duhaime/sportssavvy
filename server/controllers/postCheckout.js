const { getCollections } = require("../configs/mongoDB");
const { v4: uuidv4 } = require("uuid");

// Add a new checkout when user paid
const postCheckout = async (req, res) => {
  const {
    userId,
    email,
    cardNumber,
    cardExpiration,
    cvc,
    country,
    zip,
    address,
  } = req.body;

  const { items } = getCollections();

  // verify data
  const checkoutFlag =
    userId &&
    email &&
    cardNumber &&
    cardExpiration &&
    cvc &&
    country &&
    zip &&
    address &&
    cardNumber.toString().length === 16 &&
    cvc.toString().length === 3;

  if (!checkoutFlag) {
    // Verify the data
    return res
      .status(400)
      .json({ status: 400, message: "Please verify your input data" });
  }

  try {
    const { checkout, users } = getCollections(); // get collection

    const getUser = await users.findOne({ _id: userId });

    if (!getUser) {
      // No user
      return res.status(404).json({ status: 404, message: "No user" });
    }

    if (getUser.cartItems.length < 1) {
      // No items in the cart
      return res.status(404).json({ status: 404, message: "No cart items" });
    }

    // insert checkout data
    const checkoutData = {
      _id: uuidv4(),
      email,
      cardNumber,
      cardExpiration,
      cvc,
      country,
      zip,
      address,
      purchasedItemIds: getUser.cartItems,
    };

    // Create a new checkout
    const checkoutResult = await checkout.insertOne(checkoutData);

    if (checkoutResult.insertedId) {
      // If checkout created

      // Update the items in the cartItems
      getUser.cartItems.map(async (item) => {
        const getItem = await items.findOne({ _id: item._id }); // Find the single item

        // Update the single item
        await items.updateOne(
          { _id: item._id },
          {
            $set: {
              numInStock: getItem.numInStock - item.quantity,
            },
          }
        );
      });

      await users.updateOne({ _id: userId }, { $set: { cartItems: [] } }); // Remove the users cartItems
    }

    // If all good
    return res
      .status(200)
      .json({ status: 200, checkoutId: checkoutResult.insertedId });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { postCheckout };
