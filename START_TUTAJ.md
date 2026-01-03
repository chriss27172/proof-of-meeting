# 🚀 START TUTAJ - Najprostsza instrukcja

## Krok 1: Otwórz Terminal

**Na Mac:**
1. Naciśnij `Cmd + Spacja` (Command + Spacja)
2. Wpisz "Terminal"
3. Naciśnij Enter

**Lub:**
- Przejdź do: Aplikacje → Narzędzia → Terminal

---

## Krok 2: Przejdź do folderu projektu

W Terminalu **skopiuj i wklej** tę komendę (naciśnij Cmd+C aby skopiować, Cmd+V aby wkleić):

```
cd ~/.cursor-tutor/proof-of-meeting
```

Naciśnij **Enter**.

---

## Krok 3: Sprawdź czy masz Node.js

W Terminalu wpisz:

```
node --version
```

**Jeśli zobaczysz numer** (np. v22.0.0) → ✅ Masz Node.js! Przejdź do Kroku 4.

**Jeśli zobaczysz błąd** → Musisz zainstalować Node.js:
1. Idź na: https://nodejs.org
2. Pobierz wersję "LTS" 
3. Zainstaluj (kliknij dwukrotnie pobrany plik)
4. Zamknij i otwórz Terminal ponownie
5. Sprawdź ponownie: `node --version`

---

## Krok 4: Zainstaluj zależności

W Terminalu wpisz:

```
npm install
```

**Poczekaj 2-5 minut** aż się zainstaluje (zobaczysz dużo tekstu).

---

## Krok 5: Skonfiguruj bazę danych (NAJŁATWIEJSZA OPCJA - Neon)

### 5a. Utwórz darmowe konto na Neon:

1. Idź na: https://neon.tech
2. Kliknij **"Sign Up"** (lub "Get Started")
3. Zaloguj się (przez GitHub, Google, lub email)
4. Kliknij **"Create a project"**
5. Wypełnij:
   - Name: `proof-of-meeting`
   - Region: wybierz najbliższy (np. "Europe (Frankfurt)")
6. Kliknij **"Create project"**
7. Poczekaj 1-2 minuty

### 5b. Skopiuj connection string:

1. **Po utworzeniu projektu:**
   - Zobaczysz ekran z connection stringiem
   - **Kliknij przycisk "Copy"** ← NAJŁATWIEJ!
   
2. **LUB jeśli nie widzisz connection stringu:**
   - W panelu Neon kliknij **"Connection Details"**
   - Skopiuj connection string (przycisk "Copy")
   
3. **Connection string wygląda mniej więcej tak:**
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   - **To jest connection string do bazy danych!**

### 5c. Utwórz plik .env:

W Terminalu wpisz:

```
touch .env
```

Następnie:

```
open -a TextEdit .env
```

W otwartym pliku **wklej** connection string z Neon (skopiowany w kroku 5b):

```
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE:**
- Wklej **dokładnie** connection string z Neon (nie zmieniaj niczego!)
- Connection string już zawiera hasło i wszystkie potrzebne parametry

**Zapisz plik** (Cmd + S) i zamknij.

---

## Krok 6: Utwórz tabele w bazie

W Terminalu wpisz:

```
npx prisma db push
```

Poczekaj aż zobaczysz: "Your database is now in sync"

---

## Krok 7: Uruchom aplikację

W Terminalu wpisz:

```
npm run dev
```

**Poczekaj** aż zobaczysz: "Ready - started server on 0.0.0.0:3000"

---

## Krok 8: Otwórz w przeglądarce

1. Otwórz Chrome/Safari/Firefox
2. W pasku adresu wpisz: `http://localhost:3000`
3. Naciśnij Enter

**Powinieneś zobaczyć stronę aplikacji!** 🎉

---

## ❓ Masz problem?

**"command not found"** → Zainstaluj Node.js z https://nodejs.org

**Błąd bazy danych** → Sprawdź czy plik `.env` ma poprawny `DATABASE_URL`

**Port zajęty** → Zamknij inne aplikacje lub użyj: `npm run dev -- -p 3001`

**Nie widzę folderu** → W Terminalu wpisz: `cd ~/.cursor-tutor/proof-of-meeting`

---

## 📖 Więcej szczegółów?

Zobacz plik: `INSTRUKCJA_DLA_POCZATKUJACYCH.md`

