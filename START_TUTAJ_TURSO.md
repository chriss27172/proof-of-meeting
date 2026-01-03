# 🚀 START TUTAJ - Turso (Najprostsza instrukcja)

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

## Krok 5: Załóż konto w Turso

1. **Otwórz przeglądarkę:**
   - Idź na: https://turso.tech
   - Kliknij **"Sign Up"** (lub "Get Started")

2. **Zaloguj się:**
   - Możesz użyć GitHub, Google, lub email
   - Wybierz najwygodniejszą opcję

---

## Krok 6: Utwórz bazę danych w Turso

1. **Po zalogowaniu:**
   - Kliknij **"Create Database"** (lub "New Database")
   - Wpisz nazwę: `proof-of-meeting`
   - Wybierz region (najbliższy Tobie, np. "Frankfurt" lub "Amsterdam")
   - Kliknij **"Create"**

2. **Poczekaj 10-20 sekund** aż baza się utworzy

---

## Krok 7: Skopiuj connection string

1. **Po utworzeniu bazy:**
   - Zobaczysz ekran z connection stringiem
   - **Kliknij przycisk "Copy"** obok connection stringu ← NAJŁATWIEJ!

2. **LUB jeśli nie widzisz connection stringu:**
   - W panelu Turso kliknij na swoją bazę danych (`proof-of-meeting`)
   - Znajdź sekcję **"Connect"** lub **"Connection string"**
   - Kliknij **"Copy"**

3. **Connection string wygląda mniej więcej tak:**
   ```
   libsql://proof-of-meeting-username.turso.io?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   - **To jest connection string do bazy danych!**

---

## Krok 8: Zaktualizuj plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Wklej connection string z Turso (skopiowany w Kroku 7):**

```
DATABASE_URL="libsql://proof-of-meeting-username.turso.io?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE:**
- Wklej **dokładnie** connection string z Turso (nie zmieniaj niczego!)
- Connection string już zawiera wszystkie potrzebne parametry

**Zapisz plik** (Cmd + S) i zamknij.

---

## Krok 9: Utwórz tabele w bazie

W Terminalu wpisz:

```
npx prisma db push
```

Poczekaj aż zobaczysz: "Your database is now in sync" lub podobny komunikat sukcesu.

---

## Krok 10: Uruchom aplikację

W Terminalu wpisz:

```
npm run dev
```

**Poczekaj** aż zobaczysz: "Ready - started server on 0.0.0.0:3000"

---

## Krok 11: Otwórz w przeglądarce

1. Otwórz Chrome/Safari/Firefox
2. W pasku adresu wpisz: `http://localhost:3000`
3. Naciśnij Enter

**Powinieneś zobaczyć stronę aplikacji!** 🎉

---

## ❓ Masz problem?

**"command not found"** → Zainstaluj Node.js z https://nodejs.org

**Błąd bazy danych** → Sprawdź czy plik `.env` ma poprawny `DATABASE_URL` (connection string z Turso)

**Port zajęty** → Zamknij inne aplikacje lub użyj: `npm run dev -- -p 3001`

**Nie widzę folderu** → W Terminalu wpisz: `cd ~/.cursor-tutor/proof-of-meeting`

---

## 📖 Więcej szczegółów?

Zobacz plik: `INSTRUKCJA_TURSO.md`

---

**Zacznij od Kroku 1 - otwórz Terminal!** 🚀

