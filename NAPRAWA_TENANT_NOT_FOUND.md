# 🔧 Naprawa: Tenant or user not found

## ❌ Problem

Błąd: `FATAL: Tenant or user not found`

**Przyczyna:** Connection string jest niepoprawny - najczęściej:
- ❌ Złe hasło
- ❌ Niepoprawna nazwa użytkownika
- ❌ Niekompletny connection string

## ✅ Rozwiązanie

### Krok 1: Sprawdź connection string w Supabase

1. **Idź do Supabase:**
   - https://supabase.com
   - Otwórz projekt
   - Settings → Database

2. **Znajdź Connection string:**
   - Przewiń do "Connection string"
   - Kliknij zakładkę **"URI"** lub **"Transaction"**
   - **Skopiuj CAŁY tekst** (przycisk "Copy")

3. **Sprawdź format:**
   Connection string powinien wyglądać tak:
   ```
   postgresql://postgres.jihtiohbmzycnobbbkuw:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
   
   **LUB:**
   ```
   postgresql://postgres:[HASŁO]@db.jihtiohbmzycnobbbkuw.supabase.co:5432/postgres
   ```

### Krok 2: Sprawdź hasło

**WAŻNE:** W connection string z Supabase zobaczysz:
```
postgresql://postgres.xxx:[YOUR-PASSWORD]@...
```

**Musisz zamienić `[YOUR-PASSWORD]` na prawdziwe hasło!**

**Jak znaleźć hasło:**
- To hasło które **wymyśliłeś** podczas tworzenia projektu w Supabase
- Jeśli nie pamiętasz, musisz je zresetować w Supabase

### Krok 3: Sprawdź plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Sprawdź czy:**
- ✅ Connection string jest w cudzysłowach `"`
- ✅ Hasło jest poprawne (nie ma `[YOUR-PASSWORD]` ani `[HASŁO]`)
- ✅ Connection string jest kompletny (zaczyna się od `postgresql://`)

**Przykład POPRAWNEGO connection string:**
```
DATABASE_URL="postgresql://postgres.jihtiohbmzycnobbbkuw:mojehaslo123@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Przykład NIEPOPRAWNEGO (z placeholder):**
```
DATABASE_URL="postgresql://postgres.jihtiohbmzycnobbbkuw:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```
❌ To nie zadziała - musisz zamienić `[HASŁO]` na prawdziwe hasło!

### Krok 4: Jeśli nie pamiętasz hasła

**Opcja A: Reset hasła w Supabase**

1. W Supabase: Settings → Database
2. Znajdź sekcję "Database password"
3. Kliknij "Reset database password"
4. Ustaw nowe hasło
5. **ZAPISZ hasło!**
6. Zaktualizuj connection string w `.env` z nowym hasłem

**Opcja B: Użyj nowego connection string**

1. Po zresetowaniu hasła, Supabase pokaże nowy connection string
2. Skopiuj go i wklej do `.env`

### Krok 5: Sprawdź format connection string

**Poprawny format:**
```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

**Dla Supabase:**
- `[USERNAME]` = `postgres.jihtiohbmzycnobbbkuw` (lub `postgres`)
- `[PASSWORD]` = **twoje hasło** (bez `[YOUR-PASSWORD]`)
- `[HOST]` = `aws-0-us-west-1.pooler.supabase.com` (lub `db.jihtiohbmzycnobbbkuw.supabase.co`)
- `[PORT]` = `6543` (connection pooling) lub `5432` (direct)
- `[DATABASE]` = `postgres`

### Krok 6: Spróbuj ponownie

Po poprawieniu connection string:

```bash
npx prisma db push
```

## 🔍 Jak sprawdzić czy connection string jest poprawny

**W Terminalu:**
```bash
cat .env | grep DATABASE_URL
```

**Sprawdź:**
- ✅ Czy zaczyna się od `postgresql://`
- ✅ Czy hasło jest prawdziwe (nie ma `[HASŁO]` ani `[YOUR-PASSWORD]`)
- ✅ Czy connection string jest w cudzysłowach `"`
- ✅ Czy nie ma błędów w kopiowaniu

## ✅ Przykład poprawnego .env

```
DATABASE_URL="postgresql://postgres.jihtiohbmzycnobbbkuw:mojehaslo123@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE:** 
- `mojehaslo123` to przykład - użyj swojego prawdziwego hasła!
- Hasło nie powinno mieć `[` ani `]`

---

## 🆘 Najczęstsze błędy

1. **Zostawiłeś `[YOUR-PASSWORD]` w connection string**
   - ❌ `...:[YOUR-PASSWORD]@...`
   - ✅ `...:mojehaslo123@...`

2. **Zostawiłeś `[HASŁO]` w connection string**
   - ❌ `...:[HASŁO]@...`
   - ✅ `...:mojehaslo123@...`

3. **Złe hasło**
   - Sprawdź czy hasło jest takie samo jak w Supabase
   - Jeśli nie pamiętasz, zresetuj hasło w Supabase

---

**Najczęstszy problem: Hasło w connection string jest niepoprawne lub zostało placeholder `[YOUR-PASSWORD]`. Zamień na prawdziwe hasło!** 🔧

