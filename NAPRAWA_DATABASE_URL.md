# 🔧 Naprawa błędu: Environment variable not found: DATABASE_URL

## ❌ Problem

Błąd w Terminalu:
```
error: Environment variable not found: DATABASE_URL.
```

**Co to znaczy:** Aplikacja nie może znaleźć connection string do bazy danych.

## ✅ Rozwiązanie

### Krok 1: Sprawdź czy plik .env istnieje

W Terminalu wpisz:
```bash
ls -la .env
```

**Jeśli zobaczysz:** `-rw-r--r-- ... .env` → plik istnieje ✅
**Jeśli zobaczysz:** `ls: .env: No such file or directory` → plik nie istnieje ❌

### Krok 2: Utwórz/edytuj plik .env

**Jeśli plik nie istnieje:**
```bash
touch .env
```

**Otwórz plik:**
```bash
open -a TextEdit .env
```

### Krok 3: Wklej connection string

**W pliku .env wklej** (zamień na swoje dane z Supabase):

```
DATABASE_URL="postgresql://postgres:[HASŁO]@db.[PROJEKT-ID].supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE:**
- Zamień `[HASŁO]` na hasło z Supabase
- Zamień `[PROJEKT-ID]` na ID projektu z Supabase
- Nie usuwaj cudzysłowów `"`
- Każda linia powinna być osobno

**Przykład jak powinno wyglądać:**
```
DATABASE_URL="postgresql://postgres:mojehaslo123@db.abcdefghijklmnop.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

### Krok 4: Zapisz plik

1. W TextEdit naciśnij **Cmd + S** (lub Plik → Zapisz)
2. Zamknij TextEdit

### Krok 5: Zainicjalizuj bazę danych

W Terminalu wpisz:
```bash
npx prisma db push
```

**Powinieneś zobaczyć:**
```
Your database is now in sync with your schema
```

### Krok 6: Uruchom ponownie aplikację

**Zatrzymaj aplikację:**
- W Terminalu naciśnij **Ctrl + C**

**Uruchom ponownie:**
```bash
npm run dev
```

## ✅ Po naprawie

Aplikacja powinna działać bez błędów!

---

## 🆘 Jeśli nadal nie działa

### Problem: "Can't reach database server"

**Rozwiązanie:**
- Sprawdź czy `DATABASE_URL` w `.env` jest poprawny
- Sprawdź czy hasło w `DATABASE_URL` jest poprawne
- Sprawdź czy baza danych w Supabase jest aktywna

### Problem: "Invalid connection string"

**Rozwiązanie:**
- Sprawdź czy connection string jest w cudzysłowach `"`
- Sprawdź czy nie ma błędów w kopiowaniu
- Sprawdź czy wszystkie części connection string są poprawne

### Problem: Plik .env nie zapisuje się

**Rozwiązanie:**
- Upewnij się, że zapisałeś plik (Cmd + S)
- Sprawdź czy masz uprawnienia do zapisu w folderze
- Spróbuj zapisać jako: `~/.cursor-tutor/proof-of-meeting/.env`

---

**Po wykonaniu tych kroków aplikacja powinna działać!** 🚀

