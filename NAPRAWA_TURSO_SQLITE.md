# 🔧 Naprawa: Turso z Prisma SQLite

## ❌ Problem

Prisma z providerem `sqlite` oczekuje lokalnego pliku (`file:./dev.db`), ale Turso używa protokołu `libsql://`.

## ✅ Rozwiązanie: Użyj lokalnego SQLite i synchronizuj z Turso

Dla developmentu użyjemy lokalnego SQLite, a potem możemy synchronizować z Turso.

### Krok 1: Zaktualizuj plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na lokalny plik SQLite:**

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Zapisz:** Cmd + S

### Krok 2: Utwórz tabele w lokalnej bazie

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

### Krok 3: Zainstaluj Turso CLI (opcjonalnie - do synchronizacji)

**Jeśli chcesz synchronizować z Turso:**

1. **Zainstaluj Turso CLI:**
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. **Zaloguj się:**
   ```bash
   turso auth login
   ```

3. **Synchronizuj lokalną bazę z Turso:**
   ```bash
   turso db push proofofmeeting-chriss27172
   ```

**LUB użyj lokalnej repliki Turso:**

1. **Utwórz lokalną replikę:**
   ```bash
   turso db replicate proofofmeeting-chriss27172 --local
   ```

2. **Użyj lokalnej repliki w .env:**
   ```
   DATABASE_URL="file:./.turso/local.db"
   ```

### Krok 4: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

### Krok 5: Uruchom aplikację

**W Terminalu:**
```bash
npm run dev
```

---

## ✅ Alternatywa: Użyj bezpośrednio Turso (zaawansowane)

Jeśli chcesz użyć Turso bezpośrednio, musisz zainstalować adapter:

```bash
npm install @libsql/client
```

I użyć `@prisma/adapter-libsql` (jeśli dostępny) lub przepisać kod na bezpośrednie użycie `@libsql/client`.

**Ale najprostsze rozwiązanie to użyć lokalnego SQLite dla developmentu!**

---

## ✅ Rekomendacja

**Użyj lokalnego SQLite (`file:./dev.db`) dla developmentu** - to najprostsze i najszybsze rozwiązanie!

---

**Zaktualizuj .env na `file:./dev.db` i spróbuj ponownie!** 🔧

