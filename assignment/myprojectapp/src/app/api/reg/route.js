const { MongoClient } = require("mongodb");

export async function GET(req) {
    console.log("In the API page for adding a new registration");

    const url = "mongodb+srv://root:root@project.wbsrk.mongodb.net/?retryWrites=true&w=majority&appName=Project";
    const client = new MongoClient(url);
    const dbName = "app";

    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const pass = searchParams.get("pass");
        const username = searchParams.get("username");

        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection("register_now");
        const loginCollection = db.collection("login"); // Login collection for seamless integration

        // Insert into the "register_now" collection
        await collection.insertOne({ email, username, pass });
        console.log("User registered in 'register_now' collection");

        // Insert into the "login" collection for login functionality
        await loginCollection.insertOne({ username: email, pass });
        console.log("User registered in 'login' collection");

        return new Response(JSON.stringify({ data: "registered" }), { status: 200 });
    } catch (error) {
        console.error("Database error:", error);
        return new Response(JSON.stringify({ data: "error", message: "Server error. Please try again later." }), { status: 500 });
    } finally {
        await client.close();
    }
}
