import JWT from 'jsonwebtoken';

const defaultUsers = {
  user: 'viniciusstaiguer',
  password: 'test'
};
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export function validateUser(user, password) {
  return user === defaultUsers.user && password === defaultUsers.password;
}

export function generateToken(user) {
  return JWT.sign({ user, message: 'Hey Dude!' }, JWT_SECRET_KEY);
}

export function verifyToken(token) {
  try {
    JWT.verify(token, JWT_SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}