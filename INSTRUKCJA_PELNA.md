# 📖 PEŁNA INSTRUKCJA DLA POCZĄTKUJĄCYCH - Proof of Meeting

## 🎯 Co to jest ta aplikacja?

Aplikacja "Proof of Meeting" pozwala:
- ✅ Weryfikować prawdziwe spotkania między użytkownikami Farcaster/BaseApp
- ✅ Budować reputację poprzez zweryfikowane spotkania
- ✅ Widzieć kto potwierdził spotkanie z daną osobą (ochrona przed scamerami)
- ✅ Mintować atestacje EAS na blockchain Base
- ✅ Przeglądać ranking użytkowników (leaderboard)

---

## 📋 CZĘŚĆ 1: Przygotowanie - Co musisz mieć

### Krok 1.1: Sprawdź czy masz Node.js

**Co to jest Node.js?**
- To program, który pozwala uruchamiać aplikacje napisane w JavaScript
- Nasza aplikacja potrzebuje Node.js do działania

**Jak sprawdzić:**

1. **Otwórz Terminal:**
   - Na Mac: Naciśnij `Cmd + Spacja` (Command + Spacja)
   - Wpisz "Terminal"
   - Naciśnij Enter
   - **LUB** przejdź do: Aplikacje → Narzędzia → Terminal

2. **W Terminalu wpisz:**
   ```
   node --version
   ```
   (Skopiuj, wklej w Terminal i naciśnij Enter)

3. **Co zobaczysz:**
   - ✅ **Jeśli zobaczysz numer** (np. `v22.0.0` lub `v20.11.0`) → Masz Node.js! Przejdź do Kroku 1.2
   - ❌ **Jeśli zobaczysz błąd** `command not found` → Musisz zainstalować Node.js

**Jak zainstalować Node.js (jeśli nie masz):**

1. Idź na stronę: **https://nodejs.org**
2. Zobaczysz dwa przyciski: "LTS" i "Current"
3. **Kliknij "LTS"** (to wersja stabilna, polecana)
4. Pobierz plik (zostanie pobrany do folderu Pobrane)
5. **Kliknij dwukrotnie** na pobrany plik (np. `node-v20.11.0.pkg`)
6. Postępuj zgodnie z instrukcjami instalatora (klikaj "Dalej", "Zainstaluj")
7. Po instalacji **zamknij Terminal i otwórz go ponownie**
8. Sprawdź ponownie: `node --version`

### Krok 1.2: Sprawdź czy masz npm

**Co to jest npm?**
- To menedżer pakietów dla Node.js
- Pozwala instalować biblioteki potrzebne do aplikacji

**W Terminalu wpisz:**
```
npm --version
```

**Jeśli zobaczysz numer wersji** (np. `10.2.3`) → ✅ Masz npm!

**Jeśli zobaczysz błąd** → npm powinien być zainstalowany razem z Node.js. Spróbuj zainstalować Node.js ponownie.

---

## 📂 CZĘŚĆ 2: Znajdź projekt

### Krok 2.1: Gdzie jest projekt?

Projekt znajduje się w folderze:
```
/Users/chrissulenta/.cursor-tutor/proof-of-meeting
```

**Jak go znaleźć - Metoda 1 (Terminal - NAJŁATWIEJSZA):**

1. Otwórz Terminal
2. Wpisz dokładnie to (skopiuj i wklej):
   ```
   cd ~/.cursor-tutor/proof-of-meeting
   ```
3. Naciśnij Enter

**Jak go znaleźć - Metoda 2 (Finder):**

1. Otwórz **Finder** (ikonka uśmiechniętej twarzy w Docku na dole ekranu)
2. Naciśnij `Cmd + Shift + H` aby przejść do folderu domowego
3. Naciśnij `Cmd + Shift + .` (kropka) aby pokazać ukryte pliki (foldery zaczynające się od kropki)
4. Znajdź folder `.cursor-tutor` i kliknij na niego
5. Znajdź folder `proof-of-meeting` i kliknij na niego

### Krok 2.2: Sprawdź czy jesteś w dobrym miejscu

**W Terminalu wpisz:**
```
pwd
```

**Powinieneś zobaczyć:**
```
/Users/chrissulenta/.cursor-tutor/proof-of-meeting
```

**Jeśli tak** → ✅ Jesteś w dobrym miejscu!

**Jeśli nie** → Wróć do Kroku 2.1 i spróbuj ponownie

---

## 📦 CZĘŚĆ 3: Instalacja zależności

### Krok 3.1: Co to są "zależności"?

Zależności to biblioteki (gotowe kawałki kodu), które aplikacja potrzebuje do działania.

### Krok 3.2: Zainstaluj zależności

**Upewnij się, że jesteś w folderze projektu:**
```
pwd
```
(Powinno pokazać: `/Users/chrissulenta/.cursor-tutor/proof-of-meeting`)

**Jeśli nie jesteś w tym folderze, wpisz:**
```
cd ~/.cursor-tutor/proof-of-meeting
```

**Teraz zainstaluj zależności:**
```
npm install
```

**Co się stanie:**
- Terminal zacznie pobierać pliki z internetu
- Zobaczysz dużo tekstu przewijającego się
- Może to zająć **2-5 minut** (zależy od szybkości internetu)
- Na końcu zobaczysz coś jak: `added 500 packages` lub `up to date`

**Jeśli zobaczysz błędy:**
- Sprawdź czy masz połączenie z internetem
- Sprawdź czy jesteś w dobrym folderze (`pwd`)
- Spróbuj ponownie: `npm install`

**Jeśli wszystko poszło dobrze** → ✅ Zależności zainstalowane!

---

## 🗄️ CZĘŚĆ 4: Konfiguracja bazy danych

### Krok 4.1: Co to jest baza danych?

Baza danych to miejsce, gdzie aplikacja przechowuje informacje:
- Profile użytkowników
- Spotkania
- Reputacje
- Atestacje

### Krok 4.2: Wybierz opcję bazy danych

**Masz dwie opcje:**

#### **OPCJA A: Darmowa baza w chmurze (SUPABASE) - POLECAM! ⭐**

**Dlaczego Supabase?**
- ✅ Darmowe (do pewnego limitu)
- ✅ Łatwe w konfiguracji
- ✅ Nie musisz instalować niczego lokalnie
- ✅ Działa od razu

**Jak to zrobić:**

1. **Idź na stronę:** https://supabase.com

2. **Kliknij "Start your project"** (lub "Sign up")

3. **Zaloguj się:**
   - Możesz użyć konta GitHub (najłatwiej)
   - Lub utwórz konto przez email

4. **Utwórz nowy projekt:**
   - Kliknij "New Project"
   - Wypełnij formularz:
     - **Name:** `proof-of-meeting` (lub dowolna nazwa)
     - **Database Password:** Wymyśl hasło (np. `mojeHaslo123!`) - **ZAPISZ TO HASŁO!**
     - **Region:** Wybierz najbliższą (np. `West US` dla USA)
   - Kliknij "Create new project"

5. **Poczekaj 2-3 minuty** aż projekt się utworzy (zobaczysz animację)

6. **Skopiuj connection string:**
   - W projekcie, kliknij **"Settings"** (ikona koła zębatego ⚙️ w lewym menu)
   - Kliknij **"Database"** w menu po lewej
   - Przewiń w dół do sekcji **"Connection string"**
   - Zobaczysz zakładki: "URI", "JDBC", "Golang", itp.
   - Kliknij zakładkę **"URI"**
   - **Skopiuj** tekst (zaczyna się od `postgresql://`)
   - Wygląda mniej więcej tak:
     ```
     postgresql://postgres.xxxxx:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
     ```

#### **OPCJA B: Lokalna baza PostgreSQL (TRUDNIEJSZE)**

Jeśli chcesz użyć lokalnej bazy:

1. **Zainstaluj PostgreSQL:**
   - Na Mac: `brew install postgresql@14`
   - Lub pobierz z: https://www.postgresql.org/download/

2. **Utwórz bazę danych:**
   ```
   createdb proof_of_meeting
   ```

3. **Connection string będzie wyglądał:**
   ```
   postgresql://username:password@localhost:5432/proof_of_meeting
   ```

### Krok 4.3: Utwórz plik .env

**Co to jest plik .env?**
- To plik, który przechowuje ustawienia aplikacji (hasła, adresy URL)
- Jest ukryty (zaczyna się od kropki)

**Jak utworzyć:**

1. **Upewnij się, że jesteś w folderze projektu:**
   ```
   cd ~/.cursor-tutor/proof-of-meeting
   ```

2. **Utwórz plik .env:**
   ```
   touch .env
   ```

3. **Otwórz plik w edytorze:**
   ```
   open -a TextEdit .env
   ```
   
   **LUB** znajdź plik `.env` w Finderze i otwórz go w edytorze tekstu

4. **Wklej do pliku .env** (zamień na swoje dane):

   **Jeśli używasz Supabase:**
   ```
   DATABASE_URL="postgresql://postgres.xxxxx:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   BASE_RPC_URL="https://mainnet.base.org"
   ```

   **Jeśli używasz lokalnej bazy:**
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/proof_of_meeting"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   BASE_RPC_URL="https://mainnet.base.org"
   ```

   **WAŻNE:**
   - Zamień `[HASŁO]` na hasło które zapisałeś z Supabase
   - Zamień `username` i `password` na swoje dane PostgreSQL (jeśli lokalna baza)
   - Nie usuwaj cudzysłowów `"`

5. **Zapisz plik:**
   - Naciśnij `Cmd + S` (lub Plik → Zapisz)
   - Zamknij edytor

---

## 🗃️ CZĘŚĆ 5: Inicjalizacja bazy danych

### Krok 5.1: Utwórz tabele w bazie danych

**Co to robi?**
- Tworzy wszystkie potrzebne tabele w bazie danych
- Przygotowuje strukturę do przechowywania danych

**W Terminalu wpisz:**
```
npx prisma db push
```

**Co się stanie:**
- Połączy się z bazą danych (używając `DATABASE_URL` z pliku `.env`)
- Utworzy wszystkie tabele
- Na końcu zobaczysz: `Your database is now in sync with your schema` ✅

**Jeśli zobaczysz błąd:**

**Błąd: "Can't reach database server"**
- Sprawdź czy `DATABASE_URL` w pliku `.env` jest poprawny
- Sprawdź czy hasło w `DATABASE_URL` jest poprawne
- Sprawdź czy baza danych w Supabase jest aktywna

**Błąd: "Invalid connection string"**
- Sprawdź czy connection string jest w cudzysłowach `"`
- Sprawdź czy nie ma błędów w kopiowaniu

**Jeśli wszystko poszło dobrze** → ✅ Baza danych gotowa!

---

## 🚀 CZĘŚĆ 6: Uruchomienie aplikacji

### Krok 6.1: Uruchom serwer deweloperski

**Upewnij się, że jesteś w folderze projektu:**
```
cd ~/.cursor-tutor/proof-of-meeting
```

**Uruchom aplikację:**
```
npm run dev
```

**Co się stanie:**
- Terminal zacznie uruchamiać serwer
- Zobaczysz tekst przewijający się
- Na końcu zobaczysz:
  ```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Ready - started server on 0.0.0.0:3000
  ```

**WAŻNE:** Nie zamykaj Terminala! Aplikacja działa dopóki Terminal jest otwarty.

### Krok 6.2: Otwórz aplikację w przeglądarce

1. **Otwórz przeglądarkę** (Chrome, Safari, Firefox)

2. **W pasku adresu wpisz:**
   ```
   http://localhost:3000
   ```

3. **Naciśnij Enter**

**Powinieneś zobaczyć:**
- Stronę główną aplikacji "Proof of Meeting"
- Niebieskie tło
- Tytuł "🤝 Proof of Meeting"
- Karty z funkcjami aplikacji

**Jeśli zobaczysz błąd:**
- Sprawdź czy Terminal jest otwarty i aplikacja działa
- Sprawdź czy wpisałeś poprawny adres: `http://localhost:3000`
- Spróbuj odświeżyć stronę (F5 lub Cmd + R)

---

## ✅ CZĘŚĆ 7: Testowanie aplikacji

### Krok 7.1: Sprawdź czy wszystko działa

1. **Strona główna:**
   - Powinieneś zobaczyć tytuł "🤝 Proof of Meeting"
   - Powinny być widoczne karty z funkcjami

2. **Leaderboard:**
   - Kliknij link "View Leaderboard" na stronie głównej
   - Powinieneś zobaczyć tabelę (może być pusta, bo nie ma jeszcze użytkowników)

3. **Meetings:**
   - Kliknij link "View Meetings" na stronie głównej
   - Powinieneś zobaczyć listę spotkań (może być pusta)

### Krok 7.2: Funkcje aplikacji

**Aplikacja ma następujące funkcje:**

1. **Profil użytkownika** (`/profile/[fid]`)
   - Pokazuje informacje o użytkowniku
   - **NOWA FUNKCJA:** Sekcja "Verified By" - lista osób które potwierdziły spotkanie
   - Pomaga weryfikować autentyczność konta i walczyć ze scamerami

2. **Leaderboard** (`/leaderboard`)
   - Ranking użytkowników według reputacji

3. **Meetings** (`/meetings`)
   - Lista wszystkich zweryfikowanych spotkań

4. **Frame (Farcaster/BaseApp)**
   - Aplikacja działa jako Frame w Farcaster i BaseApp
   - Udostępnij link `http://localhost:3000` w Farcaster/BaseApp

---

## 🆘 Rozwiązywanie problemów

### Problem: "command not found: node"
**Rozwiązanie:** Zainstaluj Node.js z https://nodejs.org (patrz Krok 1.1)

### Problem: "Cannot find module"
**Rozwiązanie:** 
1. Upewnij się, że jesteś w folderze projektu: `cd ~/.cursor-tutor/proof-of-meeting`
2. Uruchom ponownie: `npm install`

### Problem: "Error: P1001: Can't reach database server"
**Rozwiązanie:**
1. Sprawdź czy `DATABASE_URL` w pliku `.env` jest poprawny
2. Sprawdź czy hasło w `DATABASE_URL` jest poprawne
3. Sprawdź czy baza danych w Supabase jest aktywna (otwórz projekt w Supabase)

### Problem: Port 3000 jest zajęty
**Rozwiązanie:**
1. Zamknij inne aplikacje używające portu 3000
2. **LUB** uruchom na innym porcie:
   ```
   npm run dev -- -p 3001
   ```
3. Wtedy użyj: `http://localhost:3001`

### Problem: Nie widzę folderu `.cursor-tutor`
**Rozwiązanie:**
1. W Finderze naciśnij `Cmd + Shift + .` aby pokazać ukryte pliki
2. **LUB** w Terminalu: `cd ~/.cursor-tutor/proof-of-meeting`

### Problem: "Prisma Client not generated"
**Rozwiązanie:**
```
npx prisma generate
```

---

## ✅ Checklist - sprawdź czy wszystko masz:

- [ ] Node.js zainstalowany (`node --version` działa)
- [ ] npm zainstalowany (`npm --version` działa)
- [ ] Projekt `proof-of-meeting` znaleziony
- [ ] `npm install` wykonany pomyślnie
- [ ] Baza danych skonfigurowana (Supabase lub lokalna)
- [ ] Plik `.env` utworzony z `DATABASE_URL`
- [ ] `npx prisma db push` wykonany pomyślnie
- [ ] `npm run dev` uruchomiony
- [ ] Aplikacja otwarta w przeglądarce na `http://localhost:3000`

---

## 🎉 Gratulacje!

Jeśli wszystkie kroki powyżej są zaznaczone - aplikacja działa! 

**Co dalej?**
- Przetestuj aplikację w przeglądarce
- Udostępnij link w Farcaster/BaseApp aby użyć Frame
- Eksperymentuj z funkcjami aplikacji
- Sprawdź sekcję "Verified By" na profilach użytkowników - pomaga walczyć ze scamerami!

**Potrzebujesz pomocy?**
- Sprawdź logi w Terminalu (tam są komunikaty o błędach)
- Sprawdź czy wszystkie kroki zostały wykonane poprawnie
- Przeczytaj sekcję "Rozwiązywanie problemów" powyżej

---

## 📝 Ważne informacje

**Nowa funkcja - "Verified By":**
- Na każdym profilu użytkownika możesz zobaczyć listę osób, które potwierdziły spotkanie z tym użytkownikiem
- To pomaga weryfikować autentyczność konta
- Pomaga walczyć ze scamerami i fałszywymi kontami
- Pokazuje ile spotkań każda osoba potwierdziła
- Pokazuje metodę weryfikacji (QR lub NFC)

**Jak to działa:**
1. Użytkownik A spotyka się z użytkownikiem B
2. Oboje skanują swoje QR kody lub używają NFC
3. Spotkanie jest potwierdzone i zapisane w bazie
4. Na profilu użytkownika A zobaczysz użytkownika B w sekcji "Verified By"
5. Na profilu użytkownika B zobaczysz użytkownika A w sekcji "Verified By"

---

**Powodzenia! 🚀**

