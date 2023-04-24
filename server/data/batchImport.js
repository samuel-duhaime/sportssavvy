"use strict";
const companiesData = require("./companies.json");
const itemsData = require("./items.json");
const usersData = require("./users.json");
const checkoutData = require("./checkout.json");
const {
  connectMongoDB,
  getCollections,
  closeMongoDB,
} = require("../configs/mongoDB");

// Import all the data
const batchImport = async () => {
  connectMongoDB()
    .then(async () => {
      const { items, companies, users, checkout } = getCollections(); // Get the collections

      // Modify the items with only number price
      const itemsDataWithNumberPrice = itemsData.map((item) => {
        let price = Number(item.price.slice(1));

        // 2 price was different format. We need to change it.
        if (item.price === "$2,495.00") {
          price = 2495;
        } else if (item.price === "$72.59 (refurbished)") {
          price = 72.59;
        }

        return { ...item, price };
      });

      // Insert the itemsDataWithNumberPrice in MongoDB
      const itemsResult = await items.insertMany(itemsDataWithNumberPrice);

      // Insert the companiesData in MongoDB
      const companiesResult = await companies.insertMany(companiesData);

      // Insert the usersData in MongoDB
      const usersResult = await users.insertMany(usersData);

      // Insert the checkoutResult in MongoDB
      const checkoutResult = await checkout.insertMany(checkoutData);

      // Creating an index in MongoDB for search bar functionality
      await items.createIndex({ name: 1 }, { collation: { locale: "en" } });

      console.log({
        itemsInsertedCount: itemsResult.insertedCount,
        companiesInsertedCount: companiesResult.insertedCount,
        usersInsertedCount: usersResult.insertedCount,
        checkoutInsertedCount: checkoutResult.insertedCount,
      });
    })
    .then(() => {
      closeMongoDB();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Call the batchImport
batchImport();
