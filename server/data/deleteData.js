const {
  connectMongoDB,
  getCollections,
  closeMongoDB,
} = require("../configs/mongoDB");

// IMPORTANT: Delete all the data. Do at your own risk.
const deleteData = async () => {
  connectMongoDB()
    .then(async () => {
      const { items, companies, users, checkout } = getCollections(); // Get the collections

      // Delete all the itemsData in MongoDB
      const itemsResult = await items.deleteMany({});

      // Delete all the companiesData in MongoDB
      const companiesResult = await companies.deleteMany({});

      // Delete all the usersData in MongoDB
      const usersResult = await users.deleteMany({});

      // Delete all the checkoutData in MongoDB
      const checkoutResult = await checkout.deleteMany({});

      console.log({
        itemsDeletedCount: itemsResult.deletedCount,
        companiesDeletedCount: companiesResult.deletedCount,
        usersDeletedCount: usersResult.deletedCount,
        checkoutDeletedCount: checkoutResult.deletedCount,
      });
    })
    .then(() => {
      closeMongoDB();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Call deleteData
deleteData();
