import { once } from 'node:events';
import { validateUser, generateToken } from '../services/authService.js';

export async function loginRoute(request, response) {
  console.log('Login route');
  const { user, password } = JSON.parse(await once(request, 'data'));
  if (!validateUser(user, password)) {
    response.writeHead(401);
    response.end(JSON.stringify({ error: 'User invalid!' }));
    return;
  }
  const token = generateToken(user);
  response.end(JSON.stringify({ token }));
}