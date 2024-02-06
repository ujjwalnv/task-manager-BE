// File will import constants from .env
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env['PORT'] ?? 8080;

export {
    PORT
}