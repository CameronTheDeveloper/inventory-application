#! /usr/bin/env node

console.log(
    'This script populates some test Categories and Items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Category = require('./models/category');
  const Item = require('./models/item');
  
  const categories = [];
  const items = [];

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function categoryCreate(index, name, desc) {
    const category = new Category({ name: name, description: desc });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(index, name, desc, category, price) {
    const itemDetails = { name: name, description: desc, price: price};
    
    if (category != false) itemDetails.category = category;
    
    const item = new Item(itemDetails);
  
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "House", "A diverse range of furniture and home decor items designed to enhance the comfort, style, and functionality of your living space"),
      categoryCreate(1, "Office", "A comprehensive selection of office furniture, equipment, and supplies to create an efficient and comfortable workspace"),
      categoryCreate(2, "Outdoors", "A variety of outdoor furniture, decor, and accessories perfect for enhancing your garden, patio, or backyard"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(0,
        "Couch",
        "A comfortable and stylish seating option",
        categories[0],
        179.99
      ),
      itemCreate(1,
        "Desk",
        "A spacious and sturdy desk for your office work",
        categories[1],
        249.99
      ),
      itemCreate(2,
        "Chair",
        "An ergonomic office chair to support long hours of work",
        categories[1],
        129.99
      ),
      itemCreate(3,
        "Lamp",
        "A stylish lamp to brighten your workspace",
        categories[1],
        49.99
      ),
      itemCreate(4,
        "Patio Set",
        "A durable and comfortable patio set for outdoor relaxation",
        categories[2],
        399.99
      ),
      itemCreate(5,
        "Grill",
        "A high-quality grill for outdoor cooking",
        categories[2],
        299.99
      ),
      itemCreate(6,
        "Bookshelf",
        "A spacious bookshelf for organizing your books and decor",
        categories[0],
        99.99
      ),
      itemCreate(7,
        "Rug",
        "A stylish rug to add warmth and comfort to any room",
        categories[0],
        59.99
      ),
    ]);
  }