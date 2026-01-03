# 🔄 Aktualizacja - Nowa baza danych

## 📝 Nowe parametry z Supabase

- **Host:** `db.lhodfhixrisaycfbpgxz.supabase.co`
- **Port:** `5432`
- **Database:** `postgres`
- **User:** `postgres`
- **Password:** `[YOUR-PASSWORD]` ← zamień na prawdziwe hasło!

## ✅ Poprawny connection string

```
postgresql://postgres:[HASŁO]@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres
```

## 🔧 Jak zaktualizować plik .env

### Krok 1: Otwórz plik .env

```bash
open -a TextEdit .env
```

### Krok 2: Zaktualizuj DATABASE_URL

**Zamień całą linię DATABASE_URL na:**

```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres"
```

**WAŻNE:** Zamień `[HASŁO]` na prawdziwe hasło (nowe hasło które ustawiłeś)!

**Przykład (jeśli nowe hasło to `nowehaslo123`):**
```
DATABASE_URL="postgresql://postgres:nowehaslo123@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres"
```

### Krok 3: Pełny plik .env

```
DATABASE_URL="postgresql://postgres:nowehaslo123@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Zapisz plik:** Cmd + S

### Krok 4: Zainicjalizuj bazę danych

```bash
npx prisma db push
```

**Powinieneś zobaczyć:**
```
Your database is now in sync with your schema
```

### Krok 5: Uruchom aplikację

```bash
npm run dev
```

---

## ⚠️ Jeśli hasło ma specjalne znaki

Jeśli nowe hasło ma znaki specjalne (`*`, `#`, `&`, `@`, itp.), musisz je zakodować:

- `*` → `%2A`
- `#` → `%23`
- `&` → `%26`
- `@` → `%40`
- `%` → `%25`

**Przykład:**
- Hasło: `haslo*123#`
- Zakodowane: `haslo%2A123%23`
- Connection string: `postgresql://postgres:haslo%2A123%23@db.lhodfhixrisaycfbpgxz.supabase.co:5432/postgres`

---

## ✅ Po aktualizacji

Aplikacja powinna działać z nową bazą danych!

---

**Zaktualizuj plik .env z nowym connection stringiem i hasłem!** 🚀

