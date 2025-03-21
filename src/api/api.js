import { createServer } from 'node:http';
import dotenv from 'dotenv';
import { loginRoute } from '../controllers/authController.js';
import { verifyToken } from '../services/authService.js';

dotenv.config();

async function handler(request, response) {
  try {
    if (request.url === '/login' && request.method === 'POST') {
      return await loginRoute(request, response);
    }

    const authHeader = request.headers.authorization;
    if (!authHeader || !verifyToken(authHeader.replace(/Bearer\s/ig, ''))) {
      response.writeHead(400);
      return response.end(JSON.stringify({ error: 'Invalid token!' }));
    }

    response.writeHead(200);
    response.end(JSON.stringify({ result: 'Hey Welcome!' }));
  } catch (error) {
    response.writeHead(500);
    response.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

const app = createServer(handler)
  .listen(3000, () => console.log('Server is running on port 3000'));

export { app };