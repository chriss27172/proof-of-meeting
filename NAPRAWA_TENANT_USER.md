# 🔧 Naprawa: Tenant or user not found

## ❌ Problem

Błąd: `FATAL: Tenant or user not found`

**Przyczyna:** Connection string jest niepoprawny - najczęściej:
- ❌ Złe hasło
- ❌ Niepoprawna nazwa użytkownika
- ❌ Niekompletny connection string

## ✅ Rozwiązanie

### Krok 1: Sprawdź connection string w Supabase

1. **W Supabase:**
   - Settings → Database
   - Connection string → zakładka **"Transaction"** (port 6543)
   - **Skopiuj CAŁY connection string** (przycisk "Copy")

2. **Sprawdź format:**
   Connection string powinien wyglądać tak:
   ```
   postgresql://postgres.lhodfhixrisaycfbpgxz:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
   
   **LUB:**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

### Krok 2: Sprawdź plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Sprawdź czy:**
- ✅ Connection string jest w cudzysłowach `"`
- ✅ Hasło jest poprawne (nie ma `[YOUR-PASSWORD]` ani `[HASŁO]`)
- ✅ Connection string jest kompletny (zaczyna się od `postgresql://`)

### Krok 3: Poprawny format connection string

**Dla connection pooling (port 6543) możliwe formaty:**

**Format 1 (z ID projektu w username):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 2 (bez ID w username):**
```
DATABASE_URL="postgresql://postgres:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**WAŻNE:** Użyj dokładnie tego formatu który pokazuje Supabase!

### Krok 4: Sprawdź hasło

**Jeśli connection string z Supabase ma `[YOUR-PASSWORD]`:**
- Musisz zamienić `[YOUR-PASSWORD]` na prawdziwe hasło
- Hasło to to, które ustawiłeś podczas tworzenia projektu

**Jeśli nie pamiętasz hasła:**
1. W Supabase: Settings → Database
2. "Database password" → "Reset database password"
3. Ustaw nowe hasło
4. **ZAPISZ hasło!**
5. Zaktualizuj connection string w `.env`

### Krok 5: Jeśli hasło ma specjalne znaki

Jeśli hasło ma znaki specjalne, zakoduj je:
- `*` → `%2A`
- `#` → `%23`
- `&` → `%26`
- `@` → `%40`

## 🔍 Jak sprawdzić czy connection string jest poprawny

**W Terminalu:**
```bash
cat .env | grep DATABASE_URL
```

**Sprawdź:**
- ✅ Czy zaczyna się od `postgresql://`
- ✅ Czy hasło jest prawdziwe (nie ma `[YOUR-PASSWORD]`)
- ✅ Czy port to `6543`
- ✅ Czy host to `aws-0-us-west-1.pooler.supabase.com`

## ✅ Najlepsze rozwiązanie

**Użyj connection string BEZPOŚREDNIO z Supabase:**

1. W Supabase: Settings → Database
2. Connection string → "Transaction" (port 6543)
3. Skopiuj CAŁY connection string
4. Wklej do `.env`
5. **Zamień tylko `[YOUR-PASSWORD]` na prawdziwe hasło**

---

**Najczęstszy problem: Hasło w connection string jest niepoprawne lub zostało placeholder `[YOUR-PASSWORD]`. Zamień na prawdziwe hasło!** 🔧

