import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://root:root@project.wbsrk.mongodb.net/?retryWrites=true&w=majority&appName=Project';
const client = new MongoClient(uri); // Initialize MongoDB client

export async function POST(req) {
  try {
    const dbName = 'app'; // Your database name
    const body = await req.json(); // Parse request body for product data

    // Connect to the database
    if (!client.isConnected) {
      await client.connect();
    }

    const db = client.db(dbName);
    const collection = db.collection('shopping_cart');

    // Insert the item into the shopping cart
    await collection.insertOne(body);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return new Response(JSON.stringify({ error: 'Failed to add item to cart' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
