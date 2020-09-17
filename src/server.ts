import 'dotenv/config';
import express from 'express';

// Rotas da API
import routes from './routes';

const app = express();

// Porta padrão da API
const defaultPort = 3333;

// Verifica se a porta informada é válida
function checkPort(port: number): number {
  if (!Number.isInteger(port) || port < 0) {
    console.warn(
      `[WARNING] Invalid port setting "${process.env.API_PORT}". Using default`,
      defaultPort,
    );

    return defaultPort;
  }

  return port;
}

// Endpoint da API
const apiPort = checkPort(+process.env.API_PORT);
const apiURL = (process.env.API_URL as string) || 'http://localhost';

app.use(express.json());
app.use(routes);

try {
  app
    .listen(apiPort, () => {
      console.log(`[INFO] Server listening at ${apiURL}:${apiPort}`);
    })
    .on('error', error => {
      console.error(`[ERROR] ${error.message}`);
    });
} catch (error) {
  console.error(`[ERROR] ${error.code}: ${error.message}`);
}
