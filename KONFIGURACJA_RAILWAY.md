# 🚂 Konfiguracja Railway PostgreSQL

## ✅ Dlaczego Railway?

- **Prosty setup** - łatwa konfiguracja
- **Darmowy** dla developmentu
- **Działa z Prisma** - bez problemów
- **Cloud** - dostęp zewszędzie

---

## 📝 Krok po kroku

### Krok 1: Załóż konto w Railway

1. Idź na: https://railway.app
2. Kliknij "Start a New Project"
3. Zaloguj się przez GitHub
4. Kliknij "New Project"

### Krok 2: Utwórz PostgreSQL

1. Kliknij "New" → "Database" → "PostgreSQL"
2. Poczekaj 1-2 minuty aż baza się utworzy
3. Kliknij na bazę danych

### Krok 3: Skopiuj connection string

1. Kliknij zakładkę "Variables"
2. Znajdź `DATABASE_URL`
3. Kliknij "Copy" obok wartości
4. Connection string wygląda tak:
   ```
   postgresql://postgres:password@host:port/railway
   ```

### Krok 4: Zaktualizuj schema.prisma

**Otwórz plik:**
```bash
open -a TextEdit prisma/schema.prisma
```

**Zamień provider na:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Zapisz:** Cmd + S

### Krok 5: Zaktualizuj .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na connection string z Railway:**

```
DATABASE_URL="postgresql://postgres:password@host:port/railway"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**Zapisz:** Cmd + S

### Krok 6: Utwórz tabele

```bash
npx prisma db push
```

### Krok 7: Przetestuj

```bash
npm run dev
```

---

## ✅ Gotowe!

Aplikacja powinna teraz działać z Railway PostgreSQL! 🚀

---

**Załóż konto w Railway i skopiuj connection string!** 🚂

