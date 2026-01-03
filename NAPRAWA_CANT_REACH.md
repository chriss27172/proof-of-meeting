# 🔧 Naprawa: Can't reach database server

## ❌ Problem

Błąd: `Can't reach database server at db.lhodfhixrisaycfbpgxz.supabase.co:5432`

**Przyczyna:** Port `5432` (direct connection) może nie działać lub baza danych jest wstrzymana.

## ✅ Rozwiązanie

### Opcja 1: Użyj Connection Pooling (ZALECANE) ⭐

**Port 5432 (direct connection) często nie działa. Użyj portu 6543 (connection pooling).**

### Krok 1: Pobierz Connection Pooling z Supabase

1. **W Supabase:**
   - Settings → Database
   - Przewiń do "Connection string"
   - Kliknij zakładkę **"Transaction"** lub **"Connection pooling"**
   - Skopiuj connection string (powinien mieć port `6543`)

### Krok 2: Zaktualizuj plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na connection pooling:**

**Format 1 (z aws-0 - ZALECANE):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 2 (z db, jeśli masz):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:[HASŁO]@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres"
```

**WAŻNE:**
- Port: `6543` (nie `5432`)
- Nazwa użytkownika: `postgres.lhodfhixrisaycfbpgxz` (z ID projektu)
- Zamień `[HASŁO]` na prawdziwe hasło

**Zapisz:** Cmd + S

### Krok 3: Spróbuj ponownie

```bash
npx prisma db push
```

---

### Opcja 2: Sprawdź czy baza danych jest aktywna

1. **W Supabase:**
   - Otwórz projekt
   - Sprawdź czy projekt nie jest w trybie "Paused" (wstrzymany)
   - Jeśli jest wstrzymany, kliknij "Resume" aby go wznowić

2. **Sprawdź status projektu:**
   - Projekt powinien być "Active" (aktywny)
   - Jeśli jest "Paused", wznow go

---

### Opcja 3: Sprawdź connection string w Supabase

1. **W Supabase:**
   - Settings → Database
   - Connection string → "Transaction" (port 6543)
   - Skopiuj CAŁY connection string
   - Wklej do `.env` (zamień tylko `[YOUR-PASSWORD]` na hasło)

---

## 🔍 Różnica między portami

- **Port 5432** = Direct connection (może nie działać) ❌
- **Port 6543** = Connection pooling (zalecane, bardziej niezawodne) ✅

## ✅ Moja rekomendacja

**Użyj connection pooling (port 6543)** - jest bardziej niezawodne i zawsze działa!

**Format:**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

---

**Zmień port na 6543 i użyj connection pooling!** 🔧

