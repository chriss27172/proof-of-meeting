# ✅ Poprawny Connection String - Finalna wersja

## 📝 Dane z Supabase

- **Host:** `db.lhodfhixrisaycfbpgxz.supabase.co`
- **Port:** `5432`
- **Database:** `postgres`
- **User:** `postgres`
- **Password:** `mojehaslo123321mojehaslo123442ahahaisdsdhd`

## ✅ Poprawny Connection String

```
postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres
```

## 🔧 Jak zaktualizować plik .env

### Krok 1: Otwórz plik .env

```bash
open -a TextEdit .env
```

### Krok 2: Zamień DATABASE_URL na:

```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres"
```

### Krok 3: Pełny plik .env

```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

### Krok 4: Zapisz plik

**Cmd + S**

### Krok 5: Spróbuj ponownie

```bash
npx prisma db push
```

## 🔍 Jeśli nadal nie działa

### Sprawdź czy baza jest naprawdę aktywna

1. **W Supabase:**
   - Otwórz projekt
   - Sprawdź czy projekt jest "Active" (nie "Paused")
   - Jeśli jest "Paused", kliknij "Resume"
   - Poczekaj 2-3 minuty aż baza się uruchomi

### Sprawdź Network Restrictions

1. **W Supabase:**
   - Settings → Database
   - Znajdź "Network restrictions" lub "IP allowlist"
   - Sprawdź czy są jakieś ograniczenia
   - Dla developmentu możesz wyłączyć ograniczenia

### Sprawdź czy port jest dostępny

**W Terminalu:**
```bash
nc -zv db.lhodfhixrisaycfbpgxz.supabase.co 5432
```

**Jeśli zobaczysz "Connection refused":**
- Port jest zablokowany
- Użyj connection pooling (port 6543)

**Jeśli zobaczysz "Connection succeeded":**
- Port działa
- Problem może być w Prisma lub formacie connection stringu

---

## ✅ Po aktualizacji

Aplikacja powinna działać z poprawnym connection stringiem!

---

**Użyj dokładnie tego connection stringu z podanymi danymi!** 🔧

