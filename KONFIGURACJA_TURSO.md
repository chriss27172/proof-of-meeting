# 🚀 Konfiguracja Turso (LibSQL/SQLite)

## ✅ Dlaczego Turso?

- **Bardzo szybki** - SQLite-based
- **Prosty setup** - łatwa konfiguracja
- **Darmowy** dla developmentu
- **Lokalny i cloud** - działa wszędzie

## 📝 Krok po kroku - Setup Turso

### Krok 1: Zaktualizuj Prisma Schema

Musimy zmienić provider z PostgreSQL na SQLite.

**Otwórz plik:** `prisma/schema.prisma`

**Zamień:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Na:**
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### Krok 2: Zaktualizuj plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Dodaj connection string z Turso:**

**Format dla Turso (cloud):**
```
DATABASE_URL="libsql://[PROJECT-NAME]-[USERNAME].turso.io?authToken=[TOKEN]"
```

**Format dla Turso (lokalny):**
```
DATABASE_URL="file:./dev.db"
```

**Pełny plik .env:**
```
DATABASE_URL="libsql://[PROJECT-NAME]-[USERNAME].turso.io?authToken=[TOKEN]"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Zapisz:** Cmd + S

### Krok 3: Zaktualizuj zależności

```bash
npm install
```

### Krok 4: Utwórz tabele w bazie

```bash
npx prisma db push
```

### Krok 5: Wygeneruj Prisma Client

```bash
npx prisma generate
```

---

## 🔍 Jak znaleźć connection string w Turso?

1. **W Turso Dashboard:**
   - Otwórz swój projekt
   - Kliknij na bazę danych
   - Znajdź "Connection string" lub "Connect"
   - Skopiuj connection string

2. **Connection string wygląda tak:**
   ```
   libsql://project-name-username.turso.io?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## ✅ Po konfiguracji

Aplikacja powinna działać z Turso!

---

**Podaj mi connection string z Turso, a pomogę Ci go skonfigurować!** 🚀

