import { getCustomSession } from '../sessionCode.js';

export async function GET(req) {
  try {
    const session = await getCustomSession();

    const role = session.role || 'No role set';
    const email = session.email || 'No email set';

    console.log('Role:', role);
    console.log('Email:', email);

    return new Response(JSON.stringify({ role, email }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving session data:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve session data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
