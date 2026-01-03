# 🖥️ Instrukcja Terminal - Krok po Kroku

## ✅ Co zrobić po otwarciu Terminala

### Krok 1: Przejdź do katalogu projektu

**W Terminalu wpisz:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
```

**Naciśnij Enter**

**Powinieneś zobaczyć:**
```
MacBook-Air-Chris:proof-of-meeting chrissulenta$
```

---

### Krok 2: Sprawdź czy .env jest zaktualizowany

**W Terminalu wpisz:**
```bash
cat .env
```

**Naciśnij Enter**

**Powinieneś zobaczyć:**
```
DATABASE_URL="postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**Jeśli NIE widzisz tego connection stringa:**
- Otwórz plik `.env` w edytorze tekstu:
```bash
open -a TextEdit .env
```
- Wklej connection string z Railway
- Zapisz: Cmd + S
- Zamknij edytor

---

### Krok 3: Wygeneruj Prisma Client

**W Terminalu wpisz:**
```bash
npx prisma generate
```

**Naciśnij Enter**

**Poczekaj** aż zobaczysz:
```
✔ Generated Prisma Client (v6.19.1) to ./node_modules/@prisma/client
```

**To może zająć 10-30 sekund - poczekaj!**

---

### Krok 4: Utwórz tabele w Railway PostgreSQL

**W Terminalu wpisz:**
```bash
npx prisma db push
```

**Naciśnij Enter**

**Poczekaj** aż zobaczysz:
```
Your database is now in sync with your Prisma schema.
```

**To może zająć 10-30 sekund - poczekaj!**

**To utworzy wszystkie tabele w Railway PostgreSQL!**

---

### Krok 5: Uruchom aplikację

**W Terminalu wpisz:**
```bash
npm run dev
```

**Naciśnij Enter**

**Poczekaj** aż zobaczysz:
```
✓ Ready in X.Xs
○ Local:        http://localhost:3000
```

**To oznacza, że aplikacja działa!** ✅

---

### Krok 6: Otwórz aplikację w przeglądarce

**W Terminalu zobaczysz:**
```
○ Local:        http://localhost:3000
```

**Kliknij na ten link** lub **skopiuj go** i wklej w przeglądarce.

**Aplikacja powinna się otworzyć!** 🚀

---

## ⚠️ Jeśli coś nie działa:

### Problem: "command not found"
**Rozwiązanie:** Upewnij się, że jesteś w katalogu projektu:
```bash
cd ~/.cursor-tutor/proof-of-meeting
```

### Problem: "Environment variable not found: DATABASE_URL"
**Rozwiązanie:** Sprawdź czy `.env` jest zaktualizowany:
```bash
cat .env
```

### Problem: "Can't reach database server"
**Rozwiązanie:** Sprawdź czy connection string jest poprawny w `.env`

---

## ✅ Gotowe!

**Po wykonaniu wszystkich kroków aplikacja powinna działać z Railway PostgreSQL!** 🚀

