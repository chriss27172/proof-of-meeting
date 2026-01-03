# 🔧 Naprawa: Can't reach database server

## ❌ Problem

Błąd: `Can't reach database server at db.jihtiohbmzycnobbbkuw.supabase.co:5432`

**Przyczyna:** Connection string może być niepoprawny lub używasz direct connection zamiast connection pooling.

## ✅ Rozwiązanie

### Opcja 1: Użyj Connection Pooling (ZALECANE) ⭐

W Supabase są **dwa typy** connection stringów:
- **Direct connection** (port 5432) - może nie działać
- **Connection pooling** (port 6543) - bardziej niezawodne ✅

**Jak to naprawić:**

1. **W Supabase:**
   - Settings → Database
   - Przewiń do "Connection string"
   - Kliknij zakładkę **"URI"** (lub "Connection pooling")
   - Skopiuj connection string

2. **Sprawdź port:**
   - Jeśli widzisz `:5432` → to direct connection (może nie działać)
   - Jeśli widzisz `:6543` → to connection pooling (lepsze) ✅

3. **Jeśli masz port 5432, zmień na 6543:**
   ```
   # Zamiast:
   postgresql://postgres.xxx:[HASŁO]@db.xxx.supabase.co:5432/postgres
   
   # Użyj:
   postgresql://postgres.xxx:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

### Opcja 2: Sprawdź czy baza danych jest aktywna

1. **W Supabase:**
   - Otwórz projekt
   - Sprawdź czy projekt nie jest w trybie "Paused" (wstrzymany)
   - Jeśli jest wstrzymany, kliknij "Resume" aby go wznowić

### Opcja 3: Sprawdź connection string

**W pliku `.env` sprawdź:**

1. **Czy connection string jest w cudzysłowach?**
   ```
   DATABASE_URL="postgresql://..."
   ```
   ✅ Tak - powinno być w cudzysłowach

2. **Czy hasło jest poprawne?**
   - Sprawdź czy hasło w `DATABASE_URL` jest takie samo jak w Supabase
   - Hasło nie powinno mieć `[HASŁO]` - to tylko placeholder

3. **Czy connection string jest kompletny?**
   - Powinien zaczynać się od `postgresql://`
   - Powinien zawierać hasło
   - Powinien kończyć się na `/postgres`

### Opcja 4: Użyj Transaction Mode (najlepsze)

W Supabase:
1. Settings → Database
2. Connection string → **"Transaction"** (lub "Session")
3. Skopiuj connection string z portem **6543**

**Przykład poprawnego connection string:**
```
DATABASE_URL="postgresql://postgres.jihtiohbmzycnobbbkuw:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**LUB:**
```
DATABASE_URL="postgresql://postgres.jihtiohbmzycnobbbkuw:[HASŁO]@db.jihtiohbmzycnobbbkuw.supabase.co:6543/postgres"
```

## 🔍 Jak sprawdzić connection string

**W Terminalu wpisz:**
```bash
cat .env
```

**Sprawdź:**
- ✅ Czy zaczyna się od `postgresql://`
- ✅ Czy ma port `6543` (connection pooling) lub `5432` (direct)
- ✅ Czy hasło jest poprawne (nie ma `[HASŁO]`)
- ✅ Czy jest w cudzysłowach `"`

## 📝 Szybka naprawa

1. **Otwórz plik .env:**
   ```bash
   open -a TextEdit .env
   ```

2. **Zmień port z 5432 na 6543:**
   ```
   # Zamiast:
   ...@db.jihtiohbmzycnobbbkuw.supabase.co:5432/postgres
   
   # Użyj:
   ...@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
   
   **LUB** użyj connection pooling z Supabase (port 6543)

3. **Zapisz plik:** Cmd + S

4. **Spróbuj ponownie:**
   ```bash
   npx prisma db push
   ```

## ✅ Po naprawie

Jeśli wszystko jest poprawne, powinieneś zobaczyć:
```
Your database is now in sync with your schema
```

---

## 🆘 Jeśli nadal nie działa

1. **Sprawdź czy baza danych w Supabase jest aktywna**
2. **Sprawdź czy hasło jest poprawne**
3. **Użyj connection pooling (port 6543) zamiast direct (port 5432)**
4. **Sprawdź czy connection string jest kompletny**

---

**Najczęstszy problem:** Używasz portu 5432 (direct connection) zamiast 6543 (connection pooling). Zmień port na 6543! 🔧

