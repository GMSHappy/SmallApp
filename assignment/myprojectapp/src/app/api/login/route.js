export async function GET(req) {
    console.log("In the API page");
    
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');



    console.log("Email:", email);
    console.log("Password:", pass);
  
    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://root:root@project.wbsrk.mongodb.net/?retryWrites=true&w=majority&appName=Project';
    const client = new MongoClient(url);
    const dbName = 'app';
  
    try {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = db.collection('login'); 
      const user = await collection.findOne({ "username": email, "pass": pass });
      if (user) {
        console.log("Login valid");
        return Response.json({ data: "valid", role: user.role || "customer" });
      } else {
        console.log("Login invalid");
        return Response.json({ data: "invalid" });
      }
    } catch (error) {
      console.error("Database error:", error);
      return Response.json({ data: "error", message: "Server error. Please try again later." });
    } finally {
  
      await client.close();
    }
  }
  