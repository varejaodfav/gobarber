import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('[INFO] (DATABASE) Connection successful');
  })
  .catch(error => {
    console.error(`[ERROR] (DATABASE) ${error.code}: ${error.message}`);
  });
