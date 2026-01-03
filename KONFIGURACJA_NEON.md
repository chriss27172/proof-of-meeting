# 🌟 Konfiguracja Neon PostgreSQL

## ✅ Dlaczego Neon?

- **Prosty setup** - łatwa konfiguracja
- **Darmowy** dla developmentu
- **Działa z Prisma** - bez problemów
- **Cloud** - dostęp zewszędzie

---

## 📝 Krok po kroku

### Krok 1: Załóż konto w Neon

1. Idź na: https://neon.tech
2. Kliknij "Sign Up"
3. Zaloguj się (GitHub, Google, lub email)
4. Kliknij "Create a project"

### Krok 2: Utwórz bazę danych

1. Wpisz nazwę: `proof-of-meeting`
2. Wybierz region (najbliższy)
3. Kliknij "Create project"
4. Poczekaj 1-2 minuty

### Krok 3: Skopiuj connection string

1. Po utworzeniu projektu zobaczysz connection string
2. Kliknij "Copy" obok connection stringu
3. Connection string wygląda tak:
   ```
   postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
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

**Zamień DATABASE_URL na connection string z Neon:**

```
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
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

Aplikacja powinna teraz działać z Neon PostgreSQL! 🚀

---

**Załóż konto w Neon i skopiuj connection string!** 🌟

