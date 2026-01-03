# ✅ Konfiguracja Turso - Twoje dane

## 📝 Connection String

```
libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc0NDI5ODUsImlkIjoiN2E1MzM5YzktMmZhOC00Zjc4LTk5N2YtZjJlNTUzOWJjMjI4IiwicmlkIjoiN2YwMGEyMjMtM2YzZi00ZDY5LTg0ZDgtOGE2YjQxY2ZmZTA5In0.HDNkdqblr7BX-57JHUWzNyGr0e0LJVQyEUA25pr4Ib2xtLaJot61PMM2ejmrhtesKdDOJpzZCEHsSLlvi331Ag
```

## 🔧 Krok po kroku

### Krok 1: Otwórz plik .env

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
open -a TextEdit .env
```

### Krok 2: Wklej connection string

**Zamień całą zawartość pliku na:**

```
DATABASE_URL="libsql://proofofmeeting-chriss27172.aws-eu-west-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc0NDI5ODUsImlkIjoiN2E1MzM5YzktMmZhOC00Zjc4LTk5N2YtZjJlNTUzOWJjMjI4IiwicmlkIjoiN2YwMGEyMjMtM2YzZi00ZDY5LTg0ZDgtOGE2YjQxY2ZmZTA5In0.HDNkdqblr7BX-57JHUWzNyGr0e0LJVQyEUA25pr4Ib2xtLaJot61PMM2ejmrhtesKdDOJpzZCEHsSLlvi331Ag"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Zapisz plik:** Cmd + S

### Krok 3: Utwórz tabele w bazie

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

### Krok 4: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

**Poczekaj** aż zobaczysz: `✔ Generated Prisma Client` ✅

### Krok 5: Uruchom aplikację

**W Terminalu:**
```bash
npm run dev
```

**Poczekaj** aż zobaczysz: `Ready - started server on 0.0.0.0:3000` ✅

### Krok 6: Otwórz w przeglądarce

1. Otwórz Chrome/Safari/Firefox
2. W pasku adresu wpisz: `http://localhost:3000`
3. Naciśnij Enter

**Powinieneś zobaczyć stronę aplikacji!** 🎉

---

## ✅ Gotowe!

Aplikacja powinna teraz działać z Turso! 🚀

