# 🚀 Baza danych dla produkcji - Rekomendacja

## ✅ Moja rekomendacja: Railway PostgreSQL

**Dlaczego Railway?**
- ✅ Najprostszy setup
- ✅ Działa z Prisma bez problemów
- ✅ Darmowy tier (500 MB, $5 credit)
- ✅ Automatyczne backupy
- ✅ Cloud - dostęp zewszędzie
- ✅ Działa dla wszystkich użytkowników

---

## 📝 Krok po kroku - Railway PostgreSQL

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

### Krok 4: Zaktualizuj schema.prisma

**Otwórz plik:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
open -a TextEdit prisma/schema.prisma
```

**Zamień provider na PostgreSQL:**
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
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**WAŻNE:** Wklej dokładnie connection string z Railway (nie zmieniaj niczego!)

**Zapisz:** Cmd + S

### Krok 6: Zaktualizuj schema (dodaj @db.Text dla PostgreSQL)

**Otwórz plik schema.prisma:**
```bash
open -a TextEdit prisma/schema.prisma
```

**Znajdź pola `bio`, `notes` (w Meeting), `data` (w Attestation), `notes` (w Reputation) i dodaj `@db.Text`:**

```prisma
bio           String?  @db.Text
notes         String?  @db.Text
data          String   @db.Text
```

**Zapisz:** Cmd + S

### Krok 7: Utwórz tabele

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

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

## 🔄 Alternatywa: Neon PostgreSQL

Jeśli Railway nie działa, spróbuj Neon:
- Instrukcja: `KONFIGURACJA_NEON.md`
- Podobny setup jak Railway
- Również działa z Prisma

---

**Załóż konto w Railway i skopiuj connection string!** 🚂

