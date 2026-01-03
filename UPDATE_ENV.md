# 🔄 Aktualizacja .env z nowym connection stringiem

## 📝 Nowy Connection String

```
postgresql://postgres:[YOUR-PASSWORD]@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres
```

## ⚠️ WAŻNE

**Musisz zamienić `[YOUR-PASSWORD]` na prawdziwe hasło z Supabase!**

## 🔧 Jak zaktualizować

### Krok 1: Otwórz plik .env

```bash
open -a TextEdit .env
```

### Krok 2: Zaktualizuj DATABASE_URL

**Zamień całą linię `DATABASE_URL` na:**

```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres"
```

**Gdzie `[HASŁO]` to twoje prawdziwe hasło z Supabase.**

**Przykład (jeśli hasło to `mojehaslo123`):**
```
DATABASE_URL="postgresql://postgres:mojehaslo123@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres"
```

### Krok 3: Sprawdź czy plik .env wygląda tak:

```
DATABASE_URL="postgresql://postgres:twojehaslo@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

### Krok 4: Zapisz plik

**Cmd + S** (lub Plik → Zapisz)

### Krok 5: Zainicjalizuj bazę danych

```bash
npx prisma db push
```

### Krok 6: Uruchom aplikację

```bash
npm run dev
```

---

## 🔍 Gdzie znaleźć hasło?

Jeśli nie pamiętasz hasła:

1. **W Supabase:**
   - Settings → Database
   - Znajdź "Database password"
   - Kliknij "Reset database password"
   - Ustaw nowe hasło
   - **ZAPISZ hasło!**

2. **LUB** użyj connection string z Supabase (tam też będzie `[YOUR-PASSWORD]` do zamiany)

---

## ✅ Po aktualizacji

Aplikacja powinna działać z nową bazą danych!

