const { getCollections } = require("../configs/mongoDB");

// Get all the items depending of some queries
const getItems = async (req, res) => {
  const LIMIT_PER_PAGE = 24;

  const {
    category, // undefined, string or array
    price, // undefined, string or array
    companyId, // undefined, string or array
    body, // undefined, string, or array
    limit = LIMIT_PER_PAGE, // Default to limit 24 items
    sortPrice = -1, // Default to price high to low
    page = 1,
    search, // string
  } = req.query;

  try {
    const { items } = getCollections(); // items collection

    // Put the category in an array
    const categories =
      typeof category === "object"
        ? category
        : typeof category === "string"
        ? [category]
        : null;

    // Put the price in an array
    const priceArray =
      typeof price === "object"
        ? price
        : typeof price === "string"
        ? [price]
        : null;

    // Get the good price command for MongoDB
    const priceCommand =
      priceArray?.includes("Under 100$") && priceArray?.includes("Over 100$")
        ? null
        : priceArray?.includes("Under 100$")
        ? { $lt: 100 }
        : priceArray?.includes("Over 100$")
        ? { $gt: 100 }
        : null;

    // Put the companyId in an array with only Number
    const companiesId =
      typeof companyId === "object"
        ? companyId.map((company) => Number(company))
        : typeof companyId === "string"
        ? [Number(companyId)]
        : null;

    // Put the body part in an array
    const bodies =
      typeof body === "object"
        ? body
        : typeof body === "string"
        ? [body]
        : null;

    // Get total number of items
    const totalNumberItems = await items.countDocuments({
      /* Check if variables exist */
      ...(search && { $text: { $search: search } }),
      ...(categories && { category: { $in: categories } }),
      ...(priceCommand && { price: priceCommand }),
      ...(companiesId && { companyId: { $in: companiesId } }),
      ...(bodies && { body_location: { $in: bodies } }),
    });

    // Find the items
    const getItems = await items
      .find({
        /* Check if variables exist */
        ...(search && { $text: { $search: search } }),
        ...(categories && { category: { $in: categories } }),
        ...(priceCommand && { price: priceCommand }),
        ...(companiesId && { companyId: { $in: companiesId } }),
        ...(bodies && { body_location: { $in: bodies } }),
      })
      .sort({ price: sortPrice }) // Sort by price
      .skip(Number((page - 1) * LIMIT_PER_PAGE)) // Skip to the page
      .limit(Number(limit)) // Limit items
      .toArray();

    if (getItems.length > 0) {
      // All good
      return res.status(200).json({
        status: 200,
        totalNumberItems,
        data: getItems,
      });
    } else {
      // No items
      return res.status(404).json({
        status: 404,
        query: req.query,
        message: "No items",
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

module.exports = { getItems };
