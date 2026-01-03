# ⚡ Szybka naprawa - Brak DATABASE_URL

## ❌ Problem

Błąd: `Environment variable not found: DATABASE_URL`

**Przyczyna:** Plik `.env` nie istnieje lub jest pusty.

## ✅ Szybkie rozwiązanie (3 kroki)

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

### Krok 3: Wklej connection string z Supabase

**W otwartym pliku TextEdit wklej:**

```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.[PROJEKT-ID].supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE - Zamień:**
- `[HASŁO]` → hasło które zapisałeś w Supabase
- `[PROJEKT-ID]` → ID projektu z Supabase (znajdziesz w connection string)

**Przykład:**
```
DATABASE_URL="postgresql://postgres:mojehaslo123@db.abcdefghijklmnop.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**Zapisz plik:** Cmd + S

### Krok 4: Zainicjalizuj bazę danych

```bash
npx prisma db push
```

### Krok 5: Uruchom ponownie aplikację

**Zatrzymaj:** Ctrl + C w Terminalu

**Uruchom:**
```bash
npm run dev
```

---

## 📋 Gdzie znaleźć connection string w Supabase?

1. Idź na: https://supabase.com
2. Otwórz projekt
3. Kliknij: ⚙️ Settings → Database
4. Przewiń w dół do "Connection string"
5. Kliknij zakładkę "URI"
6. Skopiuj tekst (przycisk "Copy")
7. Wklej do pliku `.env` (zamień `[YOUR-PASSWORD]` na hasło)

---

## ✅ Po naprawie

Aplikacja powinna działać bez błędów! 🎉

