import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function getCustomSession() {
  console.log('Loading session...');
  const password = 'VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf';

  const session = await getIronSession(cookies(), {
    password,
    cookieName: 'app',
    ttl: 24 * 60 * 60, 
  });

  return session;
}
