# ⚡ Szybka aktualizacja .env

## 📝 Nowy Connection String

Otrzymałeś:
```
postgresql://postgres:[YOUR-PASSWORD]@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres
```

## 🔧 Co teraz zrobić (3 kroki)

### Krok 1: Utwórz plik .env

W Terminalu wpisz:
```bash
cd ~/.cursor-tutor/proof-of-meeting
touch .env
```

### Krok 2: Otwórz plik .env

```bash
open -a TextEdit .env
```

### Krok 3: Wklej i zaktualizuj

**W otwartym pliku TextEdit wklej:**

```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE - Zamień `[HASŁO]` na prawdziwe hasło z Supabase!**

**Przykład (jeśli hasło to `mojehaslo123`):**
```
DATABASE_URL="postgresql://postgres:mojehaslo123@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Zapisz plik:** Cmd + S

### Krok 4: Zainicjalizuj bazę danych

```bash
npx prisma db push
```

### Krok 5: Uruchom aplikację

```bash
npm run dev
```

---

## ❓ Gdzie znaleźć hasło?

Jeśli nie pamiętasz hasła z Supabase:

1. Idź do Supabase: https://supabase.com
2. Otwórz projekt
3. Settings → Database
4. Znajdź "Database password"
5. Kliknij "Reset database password"
6. Ustaw nowe hasło i **ZAPISZ je!**
7. Użyj nowego hasła w connection string

---

## ✅ Po aktualizacji

Aplikacja powinna działać z nową bazą danych!

