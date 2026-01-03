# 🚀 Konfiguracja Turso z Prisma - KROK PO KROKU

## ✅ Co musimy zrobić

1. Zainstalować adapter Prisma dla LibSQL
2. Zaktualizować schema.prisma
3. Zaktualizować prisma.ts
4. Zaktualizować .env z connection stringiem z Turso

---

## 📝 Krok po kroku

### Krok 1: Zainstaluj adapter

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
npm install @libsql/client @prisma/adapter-libsql
```

### Krok 2: Zaktualizuj schema.prisma

**Otwórz plik:**
```bash
open -a TextEdit prisma/schema.prisma
```

**Zamień generator na:**
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
}
```

**Datasource zostaje bez zmian:**
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**Zapisz:** Cmd + S

### Krok 3: Zaktualizuj prisma.ts

**Otwórz plik:**
```bash
open -a TextEdit src/lib/prisma.ts
```

**Zamień na:**
```typescript
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Parse connection string from Turso
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

let prisma: PrismaClient;

if (databaseUrl.startsWith('libsql://')) {
  // Turso connection
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
} else {
  // Local SQLite
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };
```

**Zapisz:** Cmd + S

### Krok 4: Zaktualizuj .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na connection string z Turso:**

```
DATABASE_URL="libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc0NDI5ODUsImlkIjoiN2E1MzM5YzktMmZhOC00Zjc4LTk5N2YtZjJlNTUzOWJjMjI4IiwicmlkIjoiN2YwMGEyMjMtM2YzZi00ZDY5LTg0ZDgtOGE2YjQxY2ZmZTA5In0.HDNkdqblr7BX-57JHUWzNyGr0e0LJVQyEUA25pr4Ib2xtLaJot61PMM2ejmrhtesKdDOJpzZCEHsSLlvi331Ag"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**Zapisz:** Cmd + S

### Krok 5: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

### Krok 6: Utwórz tabele w Turso

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

### Krok 7: Przetestuj

**W Terminalu:**
```bash
npm run dev
```

---

## ✅ Gotowe!

Aplikacja powinna teraz działać z Turso! 🚀

---

## 🔄 Przełączanie między lokalnym SQLite a Turso

**Dla lokalnego SQLite:**
```
DATABASE_URL="file:./dev.db"
```

**Dla Turso:**
```
DATABASE_URL="libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=..."
```

---

**Wykonaj kroki 1-7 aby połączyć się z Turso!** 🚀

