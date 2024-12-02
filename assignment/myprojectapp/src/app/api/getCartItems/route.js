import { MongoClient } from 'mongodb';

export async function GET(req) {
  const uri = 'mongodb+srv://root:root@project.wbsrk.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'app'; // Your database name
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // Your collection name

    // Fetch all cart items
    const cartItems = await collection.find().toArray();

    return new Response(JSON.stringify(cartItems), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch cart items' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
