import { getCustomSession } from "../sessionCode.js";

export async function POST(req) {
  try {
    const session = await getCustomSession();
    const body = await req.json(); // Parse the JSON request body

    // Save data to the session
    session.email = body.email;
    await session.save();

    console.log("Session data saved:", session);

    // Redirect to /smallapp
    return new Response(null, {
      status: 302, // HTTP status for redirection
      headers: {
        Location: "/smallapp", 
      },
    });
  } catch (error) {
    console.error("Error saving session data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save session data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
