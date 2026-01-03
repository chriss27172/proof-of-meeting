# 🚀 Instrukcja krok po kroku - Turso

## Krok 1: Załóż konto w Turso

1. **Otwórz przeglądarkę:**
   - Idź na: https://turso.tech
   - Kliknij **"Sign Up"** (lub "Get Started")

2. **Zaloguj się:**
   - Możesz użyć GitHub, Google, lub email
   - Wybierz najwygodniejszą opcję

---

## Krok 2: Utwórz bazę danych

1. **Po zalogowaniu:**
   - Kliknij **"Create Database"** (lub "New Database")
   - Wpisz nazwę: `proof-of-meeting`
   - Wybierz region (najbliższy Tobie, np. "Frankfurt" lub "Amsterdam")
   - Kliknij **"Create"**

2. **Poczekaj 10-20 sekund** aż baza się utworzy

---

## Krok 3: Skopiuj connection string

1. **Po utworzeniu bazy:**
   - Zobaczysz ekran z connection stringiem
   - **Kliknij przycisk "Copy"** obok connection stringu ← NAJŁATWIEJ!

2. **LUB jeśli nie widzisz connection stringu:**
   - W panelu Turso kliknij na swoją bazę danych (`proof-of-meeting`)
   - Znajdź sekcję **"Connect"** lub **"Connection string"**
   - Kliknij **"Copy"**

3. **Connection string wygląda mniej więcej tak:**
   ```
   libsql://proof-of-meeting-username.turso.io?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   - **To jest connection string do bazy danych!**
   - **Zapisz go** - będziesz go potrzebować!

---

## Krok 4: Zaktualizuj Prisma Schema (zmiana z PostgreSQL na SQLite)

**Musimy zmienić bazę danych z PostgreSQL na SQLite (Turso używa SQLite).**

### 4a. Otwórz plik schema.prisma:

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
open -a TextEdit prisma/schema.prisma
```

### 4b. Znajdź linię z `provider = "postgresql"`:

**Znajdź (około linii 2-3):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 4c. Zamień na:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**Zapisz plik:** Cmd + S

---

## Krok 5: Zaktualizuj plik .env

### 5a. Otwórz plik .env:

**W Terminalu:**
```bash
open -a TextEdit .env
```

### 5b. Zamień DATABASE_URL na connection string z Turso:

**Usuń stary DATABASE_URL i wklej nowy:**

```
DATABASE_URL="libsql://proof-of-meeting-username.turso.io?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE:**
- Wklej **dokładnie** connection string z Turso (skopiowany w Kroku 3)
- Nie zmieniaj niczego - wklej go tak jak jest!

**Zapisz plik:** Cmd + S

---

## Krok 6: Zainstaluj zależności (jeśli potrzeba)

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
npm install
```

**Poczekaj** aż się zainstaluje (1-2 minuty).

---

## Krok 7: Utwórz tabele w bazie danych

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` lub podobny komunikat sukcesu.

**Jeśli zobaczysz błąd:**
- Sprawdź czy connection string w `.env` jest poprawny
- Sprawdź czy plik `schema.prisma` ma `provider = "sqlite"`

---

## Krok 8: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

**Poczekaj** aż zobaczysz: `✔ Generated Prisma Client`

---

## Krok 9: Uruchom aplikację

**W Terminalu:**
```bash
npm run dev
```

**Poczekaj** aż zobaczysz: `Ready - started server on 0.0.0.0:3000`

---

## Krok 10: Otwórz w przeglądarce

1. Otwórz Chrome/Safari/Firefox
2. W pasku adresu wpisz: `http://localhost:3000`
3. Naciśnij Enter

**Powinieneś zobaczyć stronę aplikacji!** 🎉

---

## ❓ Masz problem?

### "command not found"
→ Zainstaluj Node.js z https://nodejs.org

### "Error: P1001: Can't reach database server"
→ Sprawdź czy connection string w `.env` jest poprawny (skopiowany z Turso)

### "Error: P1013: The provided database string is invalid"
→ Sprawdź czy connection string zaczyna się od `libsql://` i ma `?authToken=`

### "Error: Schema engine error"
→ Sprawdź czy w `schema.prisma` jest `provider = "sqlite"` (nie "postgresql")

### "Port zajęty"
→ Zamknij inne aplikacje lub użyj: `npm run dev -- -p 3001`

---

## ✅ Podsumowanie

1. ✅ Załóż konto w Turso
2. ✅ Utwórz bazę danych
3. ✅ Skopiuj connection string
4. ✅ Zmień `provider = "sqlite"` w `schema.prisma`
5. ✅ Wklej connection string do `.env`
6. ✅ `npm install`
7. ✅ `npx prisma db push`
8. ✅ `npx prisma generate`
9. ✅ `npm run dev`
10. ✅ Otwórz `http://localhost:3000`

---

**Zacznij od Kroku 1 - załóż konto w Turso!** 🚀

