import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Parse connection string - support both local SQLite and Turso local replica
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

let prisma: PrismaClient;

// Check if using Turso local replica (file:./.turso/local.db) or direct Turso (libsql://)
if (databaseUrl.startsWith('libsql://')) {
  // Direct Turso connection (for production)
  try {
    const url = databaseUrl.split('?')[0].replace('libsql://', 'https://');
    const authToken = new URL(databaseUrl).searchParams.get('authToken') || '';
    
    const libsql = createClient({
      url,
      authToken,
    });
    
    const adapter = new PrismaLibSQL(libsql);
    
    prisma = globalForPrisma.prisma ?? new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch (error) {
    console.error('Error creating Turso client, falling back to local SQLite:', error);
    // Fallback to local SQLite if Turso connection fails
    prisma = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
} else {
  // Local SQLite (works with both dev.db and .turso/local.db)
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };

