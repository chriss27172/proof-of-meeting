# 🔧 Naprawa: Invalid database string format

## ❌ Problem

Błąd: `invalid port number in database URL`

**Możliwe przyczyny:**
1. Zły format connection stringu
2. Port 5432 nie działa (direct connection)
3. Problem z kodowaniem znaków specjalnych

## ✅ Rozwiązanie - Użyj Connection Pooling

**Connection pooling jest bardziej niezawodne i lepiej radzi sobie ze specjalnymi znakami.**

### Krok 1: Pobierz Connection Pooling z Supabase

1. **W Supabase:**
   - Settings → Database
   - Przewiń do "Connection string"
   - Kliknij zakładkę **"Transaction"** (lub "Connection pooling")
   - Skopiuj connection string (powinien mieć port `6543`)

### Krok 2: Zaktualizuj plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na connection pooling:**

**Format 1 (z aws-0):**
```
DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:Q3gB1f%2Awi%2A%23cO%26wH@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 2 (z db, jeśli masz):**
```
DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:Q3gB1f%2Awi%2A%23cO%26wH@db.hwbfxpupcfqzpitnthxc.supabase.co:6543/postgres"
```

**WAŻNE:**
- Port musi być `6543` (connection pooling)
- Nazwa użytkownika: `postgres.hwbfxpupcfqzpitnthxc` (z ID projektu)
- Hasło zakodowane: `Q3gB1f%2Awi%2A%23cO%26wH`

### Krok 3: Pełny plik .env

```
DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:Q3gB1f%2Awi%2A%23cO%26wH@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Zapisz:** Cmd + S

### Krok 4: Spróbuj ponownie

```bash
npx prisma db push
```

## 🔍 Alternatywne rozwiązanie - Sprawdź format

Jeśli nadal nie działa, sprawdź czy connection string ma poprawny format:

**Poprawny format:**
```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

**Przykład:**
```
postgresql://postgres.hwbfxpupcfqzpitnthxc:Q3gB1f%2Awi%2A%23cO%26wH@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**Sprawdź:**
- ✅ Czy zaczyna się od `postgresql://`
- ✅ Czy ma `:` po username
- ✅ Czy ma `@` przed hostem
- ✅ Czy ma `:` przed portem
- ✅ Czy ma `/` przed nazwą bazy
- ✅ Czy jest w cudzysłowach `"`

## 🆘 Jeśli nadal nie działa

**Spróbuj użyć connection string bezpośrednio z Supabase:**

1. W Supabase: Settings → Database
2. Connection string → "Transaction" (port 6543)
3. Skopiuj CAŁY connection string
4. Wklej do `.env` (zamień tylko `[YOUR-PASSWORD]` na zakodowane hasło)

---

**Użyj connection pooling (port 6543) - to powinno rozwiązać problem!** 🔧

