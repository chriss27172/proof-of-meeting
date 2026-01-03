# 🔄 Reset terminala i sprawdzenie

## ✅ Tak, reset terminala może pomóc!

Czasami zmienne środowiskowe są cache'owane. Oto co zrobić:

## 🔧 Krok po kroku

### Krok 1: Sprawdź plik .env

**W Terminalu wpisz:**
```bash
cat .env
```

**Sprawdź czy:**
- ✅ `DATABASE_URL` ma port `6543` (nie `5432`)
- ✅ Hasło jest prawdziwe (nie ma `[YOUR-PASSWORD]` ani `[HASŁO]`)
- ✅ Connection string jest w cudzysłowach `"`

### Krok 2: Zamknij terminal i otwórz nowy

1. **Zamknij obecny terminal:**
   - Naciśnij `Cmd + Q` w Terminalu
   - LUB zamknij okno Terminala

2. **Otwórz nowy terminal:**
   - Naciśnij `Cmd + Spacja`
   - Wpisz "Terminal"
   - Naciśnij Enter

### Krok 3: Przejdź do projektu

```bash
cd ~/.cursor-tutor/proof-of-meeting
```

### Krok 4: Sprawdź czy .env jest poprawny

```bash
cat .env
```

**Upewnij się, że connection string wygląda tak:**
```
DATABASE_URL="postgresql://postgres:twojehaslo@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres"
```

**Gdzie `twojehaslo` to twoje prawdziwe hasło.**

### Krok 5: Zainicjalizuj bazę danych

```bash
npx prisma db push
```

## 🔍 Jeśli nadal nie działa

### Sprawdź czy Prisma widzi zmienne środowiskowe

```bash
npx prisma db push --schema=./prisma/schema.prisma
```

### Sprawdź czy plik .env jest w dobrym miejscu

```bash
pwd
ls -la .env
```

**Powinieneś zobaczyć:**
- `pwd` → `/Users/chrissulenta/.cursor-tutor/proof-of-meeting`
- `ls -la .env` → `-rw-r--r-- ... .env`

### Sprawdź zawartość .env jeszcze raz

```bash
cat .env | grep DATABASE_URL
```

**Wyślij mi wynik** (możesz zamaskować hasło) - zobaczę czy format jest poprawny.

## ✅ Po resecie terminala

1. ✅ Nowy terminal odczyta świeże zmienne środowiskowe
2. ✅ Cache zostanie wyczyszczony
3. ✅ Prisma odczyta nowy connection string

---

**Tak, reset terminala może pomóc! Zamknij i otwórz nowy terminal, a następnie spróbuj ponownie.** 🔄

