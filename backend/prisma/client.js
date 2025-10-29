const { PrismaClient } = require('@prisma/client');

// Use a single PrismaClient instance. In development, attach to global to avoid
// open handles/hot-reload creating multiple instances.
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global._prisma) {
    global._prisma = new PrismaClient();
  }
  prisma = global._prisma;
}

module.exports = prisma;
