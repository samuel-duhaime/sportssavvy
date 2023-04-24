const { getCollections } = require("../configs/mongoDB");

// Get the user info
const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const { users } = getCollections(); // users collection

    const getUser = await users.findOne({ _id: userId }); // Find the user

    if (getUser) {
      // All good
      return res.status(200).json({
        status: 200,
        data: getUser,
      });
    } else {
      // No user
      return res.status(404).json({
        status: 404,
        message: "User does not exist",
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

module.exports = { getUser };
