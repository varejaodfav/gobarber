import 'dotenv/config';
import express from 'express';

import routes from './routes';

const app = express();

const apiURL = (process.env.API_URL as string) || 'localhost';
const apiPort = Number(process.env.API_PORT) || 3333;

if (isNaN(Number(process.env.API_PORT))) {
  console.warn(
    `[Warning] Invalid port setting "${process.env.API_PORT}". Using default!`,
  );
}

app.use(routes);

try {
  app
    .listen(apiPort, () => {
      console.log(`[Info] Server is running at http://${apiURL}:${apiPort}`);
    })
    .on('error', error => {
      console.error(`[Error] ${error.message}`);
    });
} catch (error) {
  console.error(`[Error]: ${error.code} ${error.message}`);
}
