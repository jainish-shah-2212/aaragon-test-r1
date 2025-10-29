const express = require('express');
const app = express();
const prisma = require('./prisma/client');
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
//   credentials: true // If you are using cookies or authentication headers
}));
// Routes
const boardRouter = require('./routes/board');

app.use('/api/boards', boardRouter);
// health
app.get('/', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Graceful shutdown
async function shutdown() {
  console.log('Shutting down...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = app;
