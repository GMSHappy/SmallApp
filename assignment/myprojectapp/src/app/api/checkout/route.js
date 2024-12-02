import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const uri = 'mongodb+srv://root:root@project.wbsrk.mongodb.net/?retryWrites=true&w=majority&appName=Project';
  const dbName = 'app';
  const client = new MongoClient(uri);

  try {
    const body = await req.json();
    const userEmail = body?.email;

    if (!userEmail) {
      return new Response(JSON.stringify({ success: false, error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await client.connect();
    const db = client.db(dbName);
    const cartCollection = db.collection('shopping_cart');
    const ordersCollection = db.collection('orders');

    const items = await cartCollection.find({}).toArray();
    if (items.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Cart is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const order = {
      email: userEmail,
      items: items.map(item => ({ name: item.name, price: item.price })),
      total,
      orderDate: new Date(),
    };

    await ordersCollection.insertOne(order);
    await cartCollection.deleteMany({});

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ciansuneram6@gmail.com',
        pass: 'nzes xcgp hhtm eujo',
      },
    });

    const mailOptions = {
      from: 'ciansuneram6@gmail.com',
      to: userEmail,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Total: $${total.toFixed(2)}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
