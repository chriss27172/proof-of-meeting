# 🔍 Sprawdź connection string - szczegółowa diagnoza

## ❌ Problem

Błąd: `FATAL: Tenant or user not found`

**Mimo że hasło jest poprawne, nadal nie działa.**

## 🔍 Możliwe przyczyny

1. **Niepoprawna nazwa użytkownika**
2. **Zły format connection stringu**
3. **Problem z regionem/hostem**

## ✅ Rozwiązanie - Sprawdź dokładny format

### Krok 1: Sprawdź connection string w Supabase

1. **W Supabase:**
   - Settings → Database
   - Connection string → zakładka **"Transaction"** (port 6543)
   - **Skopiuj CAŁY connection string**

2. **Sprawdź format:**
   - Czy username to `postgres` czy `postgres.lhodfhixrisaycfbpgxz`?
   - Jaki jest dokładny host?
   - Jaki jest port?

### Krok 2: Sprawdź aktualny plik .env

**W Terminalu wpisz:**
```bash
cat .env
```

**Sprawdź czy connection string wygląda poprawnie.**

### Krok 3: Możliwe poprawne formaty

**Format 1 (z ID projektu w username):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 2 (bez ID w username - spróbuj tego):**
```
DATABASE_URL="postgresql://postgres:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 3 (z db zamiast aws-0):**
```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres"
```

### Krok 4: Spróbuj różnych formatów

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Spróbuj Format 2 (najprostszy):**
```
DATABASE_URL="postgresql://postgres:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Zapisz:** Cmd + S

**Spróbuj:**
```bash
npx prisma db push
```

**Jeśli nie działa, spróbuj Format 3:**
```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres"
```

## 🔍 Diagnoza - Sprawdź connection string

**W Terminalu wpisz:**
```bash
cat .env | grep DATABASE_URL
```

**Wyślij mi wynik** - zobaczę czy format jest poprawny (oczywiście możesz zamaskować hasło).

## ✅ Najlepsze rozwiązanie

**Użyj connection string BEZPOŚREDNIO z Supabase:**

1. W Supabase: Settings → Database
2. Connection string → "Transaction" (port 6543)
3. **Skopiuj CAŁY connection string** (przycisk "Copy")
4. Wklej do `.env`
5. **Zamień TYLKO `[YOUR-PASSWORD]` na hasło** (nie zmieniaj niczego innego!)

---

**Sprawdź dokładny format connection stringu z Supabase i użyj go dokładnie tak jak jest!** 🔧

