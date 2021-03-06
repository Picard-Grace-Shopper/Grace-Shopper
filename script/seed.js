"use strict";
const pokemonArr = require("../seed");

const {
  db,

  models: { User, Product, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "Ash",
      firstName: "Ketchum",
      lastName: "Ketchum",
      email: "Ashketchum@gmail.com",
      password: "123",
      isAdmin: true,
      address: "123 Apple Road, Houston, Texas",
      phoneNumber: "123-456-7890",
    }),
    User.create({
      username: "Gary",
      firstName: "Gary",
      lastName: "Oak",
      email: "Garyoak@gmail.com",
      password: "123",
      isAdmin: false,
      address: "123 Strawberry Lane, LosAngles, California",
      phoneNumber: "777-888-9999",
    }),
    User.create({
      username: "Admin",
      firstName: "Admin",
      lastName: "Admin",
      email: "Admin@gmail.com",
      password: "1",
      isAdmin: true,
      address: "123 Cherry Drive, Miami, Florida",
      phoneNumber: "222-333-4444",
    }),
  ]);

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ items: 3, total: 1797, shippingAddress: "Home" }),
    Order.create({ items: 2, total: 2400, shippingAddress: "House" }),
    Order.create({ items: 3, total: 2400, shippingAddress: "Apartment" }),
  ]);

  const pokemonList = await Promise.all(
    pokemonArr.map((pokemon) => {
      return Product.create(pokemon);
    })
  );

  const [Ash, Gary] = users;
  const [order1, order2, order3] = orders;
  await Ash.setOrders([order1, order3]);
  await Gary.setOrders([order2]);
  await order1.addProducts([pokemonList[3]], {through: {Quantity: 1, Price: 599}});
  await order1.addProducts([pokemonList[4]], {through: {Quantity: 1, Price: 699}});
  await order1.addProducts([pokemonList[5]], {through: {Quantity: 1, Price: 799}});
  await order3.addProducts([pokemonList[8]], {through: {Quantity: 3, Price: 800}});
  await order2.addProducts([pokemonList[6]], {through: {Quantity: 3, Price: 800}});



  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${pokemonList.length} pokemonList`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
