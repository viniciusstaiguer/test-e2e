import { once } from 'node:events';
import { createServer } from 'node:http';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from 'node:console';

dotenv.config();
const defaultUsers = {
  user: 'viniciusstaiguer',
  password: 'test'
}
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
async function loginRoute(request, response) {
  console.log('Login route');
  const { user, password } = JSON.parse(await once(request, 'data'));
  if (user !== defaultUsers.user || password !== defaultUsers.password) {
    response.writeHead(401);
    response.end(JSON.stringify({ error: 'User invalid!' }));
    return;
  }
  const token = JWT.sign({ user, message:'Hey Dude!' }, JWT_SECRET_KEY);
  response.end(JSON.stringify({ token }));
}

function isHeagersValid(headers) {
  try {
    const auth = headers.authorization.replace(/Bearer\s/ig, '');
    JWT.verify(auth, JWT_SECRET_KEY);
    return true
  } catch (error) {

    return false
  }
}

async function handler(request, response) {
  if (request.url === '/login' && request.method === 'POST') {
    return loginRoute(request, response);
  }
  if(!isHeagersValid(request.headers)) {
    response.writeHead(400);
    return response.end(JSON.stringify({ error: 'Invalid token!' }));
  }
  response.end(JSON.stringify({ result: 'Hey Welcome!' }));  
}

const app = createServer(handler)
  .listen(3000, () => console.log('Server is running on port 3000'));

export { app }