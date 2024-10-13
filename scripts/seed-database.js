const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: '.env' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('godown');

    // Read and parse JSON files
    const godownsData = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'godowns.json'), 'utf-8'));
    const itemsData = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'items.json'), 'utf-8'));

    // Insert godowns data
    const godownsCollection = db.collection('locations');
    await godownsCollection.deleteMany({}); // Clear existing data
    const godownsResult = await godownsCollection.insertMany(godownsData);
    console.log(`${godownsResult.insertedCount} godowns inserted`);

    // Insert items data
    const itemsCollection = db.collection('items');
    await itemsCollection.deleteMany({}); // Clear existing data
    const itemsResult = await itemsCollection.insertMany(itemsData);
    console.log(`${itemsResult.insertedCount} items inserted`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();