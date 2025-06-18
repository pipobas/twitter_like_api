const app = require('./app'); 
require('dotenv').config(); 
const PORT = process.env.PORT || 8080;  

const prisma = require( './prisma/client');

(async () => {
  try {
    await prisma.$connect();
    console.log('connected to the database');

    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('Graceful shutdown');
      await prisma.$disconnect();
      process.exit();
    });
  } catch (e) {
    console.error('Startup failed', e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();