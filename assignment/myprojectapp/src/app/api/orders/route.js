import { MongoClient } from 'mongodb';

export async function GET(req) {
  const uri = 'mongodb+srv://root:root@project.wbsrk.mongodb.net/?retryWrites=true&w=majority&appName=Project';
  const dbName = 'app';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const orders = await db.collection('orders').find({}).toArray();

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch orders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
