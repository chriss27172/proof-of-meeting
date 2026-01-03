# 🚂 Instrukcja: Railway PostgreSQL dla produkcji

## ✅ Dlaczego Railway?

- ✅ Najprostszy setup
- ✅ Działa z Prisma bez problemów
- ✅ Darmowy tier (500 MB, $5 credit)
- ✅ Cloud - dostęp zewszędzie
- ✅ Działa dla wszystkich użytkowników

---

## 📝 Krok po kroku

### Krok 1: Załóż konto w Railway

1. **Otwórz przeglądarkę:**
   - Idź na: https://railway.app
   - Kliknij **"Start a New Project"**
   - Zaloguj się przez **GitHub** (najłatwiej)

2. **Utwórz projekt:**
   - Kliknij **"New Project"**
   - Wybierz **"Empty Project"**

### Krok 2: Utwórz PostgreSQL

1. **W projekcie:**
   - Kliknij **"New"** → **"Database"** → **"PostgreSQL"**
   - Poczekaj 1-2 minuty aż baza się utworzy

2. **Kliknij na bazę danych** (PostgreSQL)

### Krok 3: Skopiuj connection string

1. **Kliknij zakładkę "Variables"**
2. **Znajdź `DATABASE_URL`**
3. **Kliknij "Copy"** obok wartości
4. **Connection string wygląda tak:**
   ```
   postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   ```

### Krok 4: Schema.prisma już zaktualizowana ✅

**Schema.prisma jest już skonfigurowana dla PostgreSQL!**

### Krok 5: Zaktualizuj .env

**Otwórz plik .env:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
open -a TextEdit .env
```

**Zamień DATABASE_URL na connection string z Railway:**

```
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**WAŻNE:** Wklej dokładnie connection string z Railway (nie zmieniaj niczego!)

**Zapisz:** Cmd + S

### Krok 6: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

**Poczekaj** aż zobaczysz: `✔ Generated Prisma Client` ✅

### Krok 7: Utwórz tabele

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

**To utworzy wszystkie tabele w Railway PostgreSQL!**

### Krok 8: Przetestuj

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

Aplikacja powinna teraz działać z Railway PostgreSQL dla wszystkich użytkowników! 🚀

---

## 🔄 Przełączanie między lokalnym SQLite a Railway

**Dla developmentu (lokalny SQLite):**
```
DATABASE_URL="file:./dev.db"
```

**Dla produkcji (Railway PostgreSQL):**
```
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
```

**Po zmianie DATABASE_URL:**
1. Zmień provider w `schema.prisma` (`sqlite` lub `postgresql`)
2. `npx prisma generate`
3. `npx prisma db push`
4. `npm run dev`

---

**Załóż konto w Railway i skopiuj connection string!** 🚂

