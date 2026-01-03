# 🔗 Instrukcja: Połączenie .env z Turso

## 📝 Twoje dane z Turso

- **Connection String:** `libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc0NDI5ODUsImlkIjoiN2E1MzM5YzktMmZhOC00Zjc4LTk5N2YtZjJlNTUzOWJjMjI4IiwicmlkIjoiN2YwMGEyMjMtM2YzZi00ZDY5LTg0ZDgtOGE2YjQxY2ZmZTA5In0.HDNkdqblr7BX-57JHUWzNyGr0e0LJVQyEUA25pr4Ib2xtLaJot61PMM2ejmrhtesKdDOJpzZCEHsSLlvi331Ag`

---

## ✅ Krok po kroku

### Krok 1: Otwórz plik .env

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
open -a TextEdit .env
```

**LUB użyj dowolnego edytora tekstu**

### Krok 2: Zaktualizuj DATABASE_URL

**Zamień linię z `DATABASE_URL` na:**

```
DATABASE_URL="libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc0NDI5ODUsImlkIjoiN2E1MzM5YzktMmZhOC00Zjc4LTk5N2YtZjJlNTUzOWJjMjI4IiwicmlkIjoiN2YwMGEyMjMtM2YzZi00ZDY5LTg0ZDgtOGE2YjQxY2ZmZTA5In0.HDNkdqblr7BX-57JHUWzNyGr0e0LJVQyEUA25pr4Ib2xtLaJot61PMM2ejmrhtesKdDOJpzZCEHsSLlvi331Ag"
```

### Krok 3: Pełny plik .env

**Cały plik .env powinien wyglądać tak:**

```
DATABASE_URL="libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc0NDI5ODUsImlkIjoiN2E1MzM5YzktMmZhOC00Zjc4LTk5N2YtZjJlNTUzOWJjMjI4IiwicmlkIjoiN2YwMGEyMjMtM2YzZi00ZDY5LTg0ZDgtOGE2YjQxY2ZmZTA5In0.HDNkdqblr7BX-57JHUWzNyGr0e0LJVQyEUA25pr4Ib2xtLaJot61PMM2ejmrhtesKdDOJpzZCEHsSLlvi331Ag"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**Zapisz plik:** Cmd + S

### Krok 4: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

**Poczekaj** aż zobaczysz: `✔ Generated Prisma Client` ✅

### Krok 5: Utwórz tabele w Turso

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

**To utworzy wszystkie tabele w Turso!**

### Krok 6: Przetestuj połączenie

**W Terminalu:**
```bash
npm run dev
```

**Jeśli wszystko działa, zobaczysz:**
```
Ready - started server on 0.0.0.0:3000
```

---

## ✅ Gotowe!

Aplikacja powinna teraz działać z Turso! 🚀

---

## 🔄 Przełączanie między lokalnym SQLite a Turso

**Dla lokalnego SQLite (development):**
```
DATABASE_URL="file:./dev.db"
```

**Dla Turso (produkcja):**
```
DATABASE_URL="libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=..."
```

**Po zmianie DATABASE_URL:**
1. `npx prisma generate`
2. `npx prisma db push` (jeśli potrzeba)
3. `npm run dev`

---

## 📋 Sprawdzenie

**Sprawdź czy połączenie działa:**
```bash
npx prisma db pull
```

**Jeśli działa, zobaczysz:**
```
✔ Introspected database
```

---

**Wykonaj kroki 1-6 aby połączyć się z Turso!** 🚀

