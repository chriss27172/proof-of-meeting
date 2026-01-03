# 🔧 Naprawa: Tenant or user not found (Connection Pooling)

## ❌ Problem

Błąd: `FATAL: Tenant or user not found` przy connection pooling (port 6543)

**Przyczyna:** Nazwa użytkownika lub format connection stringu jest niepoprawny dla connection pooling.

## ✅ Rozwiązanie

### Connection Pooling wymaga innego formatu username!

**Dla connection pooling (port 6543):**
- Username może być: `postgres.lhodfhixrisaycfbpgxz` (z ID projektu)
- LUB: `postgres` (bez ID)

### Krok 1: Sprawdź dokładny format w Supabase

1. **W Supabase:**
   - Settings → Database
   - Connection string → zakładka **"Transaction"** (port 6543)
   - **Skopiuj CAŁY connection string**
   - Sprawdź jaki jest username w connection stringu

### Krok 2: Poprawne formaty dla Connection Pooling

**Format 1 (z ID projektu w username - ZALECANE):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 2 (bez ID w username - spróbuj jeśli Format 1 nie działa):**
```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 3 (z parametrem pgbouncer):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### Krok 3: Zaktualizuj plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Spróbuj Format 1 (z ID projektu):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Zapisz:** Cmd + S

**Spróbuj:**
```bash
npx prisma db push
```

**Jeśli nie działa, spróbuj Format 2 (bez ID):**
```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

## 🔍 Najlepsze rozwiązanie

**Użyj connection string BEZPOŚREDNIO z Supabase:**

1. W Supabase: Settings → Database
2. Connection string → "Transaction" (port 6543)
3. **Skopiuj CAŁY connection string** (przycisk "Copy")
4. Wklej do `.env`
5. **Zamień TYLKO `[YOUR-PASSWORD]` na hasło**
6. **Nie zmieniaj niczego innego!**

---

## 📋 Sprawdź aktualny connection string

**W Terminalu:**
```bash
cat .env | grep DATABASE_URL
```

**Wyślij mi wynik** (możesz zamaskować hasło) - zobaczę czy format jest poprawny.

---

**Spróbuj Format 1 (z ID projektu w username) - to powinno działać!** 🔧

