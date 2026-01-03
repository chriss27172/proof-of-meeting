# 🔧 Naprawa: Invalid port number

## ❌ Problem

Błąd: `invalid port number in database URL`

**Przyczyna:** Prisma może nie akceptować portu 6543 w tym formacie, lub format connection stringu jest niepoprawny.

## ✅ Rozwiązanie - Spróbuj Direct Connection

Może connection pooling nie działa z Prisma. Spróbuj direct connection (port 5432) z poprawnym formatem.

### Krok 1: Otwórz plik .env

```bash
open -a TextEdit .env
```

### Krok 2: Użyj Direct Connection (port 5432)

**Zamień DATABASE_URL na:**

```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres"
```

**Różnice:**
- Host: `db.lhodfhixrisaycfbpgxz.supabase.co` (nie `aws-0-us-west-1.pooler.supabase.com`)
- Port: `5432` (direct connection)
- Username: `postgres` (bez ID projektu)

### Krok 3: Pełny plik .env

```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres"
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

**Sprawdź:**
- ✅ Czy zaczyna się od `postgresql://`
- ✅ Czy ma `:` po username
- ✅ Czy ma `@` przed hostem
- ✅ Czy ma `:` przed portem
- ✅ Czy ma `/` przed nazwą bazy
- ✅ Czy port to liczba (5432 lub 6543)
- ✅ Czy jest w cudzysłowach `"`

## 🆘 Jeśli nadal nie działa

**Spróbuj użyć connection string BEZPOŚREDNIO z Supabase:**

1. W Supabase: Settings → Database
2. Connection string → zakładka **"URI"** (port 5432)
3. Skopiuj CAŁY connection string
4. Wklej do `.env` (zamień tylko `[YOUR-PASSWORD]` na hasło)
5. **Nie zmieniaj niczego innego!**

---

**Spróbuj direct connection (port 5432) z hostem `db.lhodfhixrisaycfbpgxz.supabase.co`!** 🔧

