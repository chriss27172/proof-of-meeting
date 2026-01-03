# ✅ Poprawny connection string

## 📝 Connection string z Supabase

Otrzymałeś:
```
postgresql://postgres:[YOUR-PASSWORD]@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres
```

## ⚠️ Problem

Port `5432` (direct connection) może nie działać. Użyj connection pooling (port `6543`).

## ✅ Rozwiązanie

### Opcja 1: Zmień port na 6543 (ZALECANE) ⭐

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na:**

```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres"
```

**WAŻNE:**
- Port: `6543` (nie `5432`)
- Zamień `[HASŁO]` na prawdziwe hasło
- Reszta pozostaje taka sama

**Zapisz:** Cmd + S

**Spróbuj:**
```bash
npx prisma db push
```

### Opcja 2: Pobierz Connection Pooling z Supabase

1. **W Supabase:**
   - Settings → Database
   - Connection string → zakładka **"Transaction"** (port 6543)
   - Skopiuj connection string
   - Powinien mieć port `6543`

2. **Wklej do `.env`** (zamień `[YOUR-PASSWORD]` na hasło)

## 📋 Pełny plik .env

```
DATABASE_URL="postgresql://postgres:twojehaslo@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Gdzie `twojehaslo` to twoje prawdziwe hasło.**

---

## 🔧 Szybka naprawa

1. Otwórz `.env`: `open -a TextEdit .env`
2. Zmień port z `5432` na `6543`
3. Zamień `[YOUR-PASSWORD]` na prawdziwe hasło
4. Zapisz: Cmd + S
5. Spróbuj: `npx prisma db push`

---

**Zmień port na 6543 i zamień [YOUR-PASSWORD] na prawdziwe hasło!** 🔧

