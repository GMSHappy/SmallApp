import { MongoClient } from 'mongodb';

export async function GET(req) {
  const uri = 'mongodb+srv://root:root@project.wbsrk.mongodb.net/?retryWrites=true&w=majority'; 
  const client = new MongoClient(uri);
  const dbName = 'app'; // Your database name

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Products'); // Your products collection

    const products = await collection.find().toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
