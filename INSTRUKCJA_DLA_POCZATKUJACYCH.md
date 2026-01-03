# 📖 Instrukcja krok po kroku - dla całkowicie początkujących

## Część 1: Przygotowanie - Co musisz mieć zainstalowane

### Krok 1.1: Sprawdź czy masz Node.js

1. **Otwórz Terminal:**
   - Na Mac: Naciśnij `Cmd + Spacja`, wpisz "Terminal" i naciśnij Enter
   - Lub przejdź do: Aplikacje → Narzędzia → Terminal

2. **W Terminalu wpisz:**
   ```
   node --version
   ```
   
3. **Jeśli zobaczysz numer wersji (np. v22.0.0)** - masz Node.js! ✅
   - Przejdź do Części 2

4. **Jeśli zobaczysz błąd "command not found"** - musisz zainstalować Node.js:
   - Idź na stronę: https://nodejs.org
   - Pobierz wersję "LTS" (długoterminowe wsparcie)
   - Zainstaluj pobrany plik (kliknij dwukrotnie i postępuj zgodnie z instrukcjami)
   - Po instalacji, zamknij i otwórz Terminal ponownie
   - Sprawdź ponownie: `node --version`

### Krok 1.2: Sprawdź czy masz npm

W Terminalu wpisz:
```
npm --version
```

Jeśli zobaczysz numer wersji - masz npm! ✅

---

## Część 2: Znajdź projekt i przejdź do niego

### Krok 2.1: Otwórz Finder (na Mac)

1. Kliknij ikonę Findera w Docku (na dole ekranu)
2. Naciśnij `Cmd + Shift + H` aby przejść do folderu domowego
3. Znajdź folder `.cursor-tutor` (może być ukryty - naciśnij `Cmd + Shift + .` aby pokazać ukryte pliki)
4. Wejdź do folderu `.cursor-tutor`
5. Wejdź do folderu `proof-of-meeting`

**LUB użyj Terminala:**

1. Otwórz Terminal
2. Wpisz dokładnie to (skopiuj i wklej):
   ```
   cd ~/.cursor-tutor/proof-of-meeting
   ```
3. Naciśnij Enter

### Krok 2.2: Sprawdź czy jesteś w dobrym miejscu

W Terminalu wpisz:
```
pwd
```

Powinieneś zobaczyć:
```
/Users/chrissulenta/.cursor-tutor/proof-of-meeting
```

Jeśli tak - jesteś w dobrym miejscu! ✅

---

## Część 3: Instalacja zależności

### Krok 3.1: Zainstaluj wszystkie potrzebne biblioteki

W Terminalu (upewnij się, że jesteś w folderze `proof-of-meeting`) wpisz:

```
npm install
```

**Co się stanie:**
- Terminal zacznie pobierać pliki (może to zająć 2-5 minut)
- Zobaczysz dużo tekstu przewijającego się
- Na końcu zobaczysz coś jak: "added 500 packages"

**Jeśli zobaczysz błędy:**
- Sprawdź czy masz połączenie z internetem
- Spróbuj ponownie: `npm install`

---

## Część 4: Konfiguracja bazy danych

### Krok 4.1: Wybierz opcję bazy danych

**Opcja A: Darmowa baza w chmurze (NAJŁATWIEJSZA - polecam!)**

1. Idź na stronę: https://supabase.com
2. Kliknij "Start your project" (lub "Sign up")
3. Zaloguj się przez GitHub (lub utwórz konto)
4. Kliknij "New Project"
5. Wypełnij formularz:
   - Name: `proof-of-meeting`
   - Database Password: wymyśl hasło (ZAPISZ JE!)
   - Region: wybierz najbliższą
6. Kliknij "Create new project"
7. Poczekaj 2-3 minuty aż projekt się utworzy
8. W projekcie, kliknij "Settings" (ikona koła zębatego)
9. Kliknij "Database" w menu po lewej
10. Znajdź "Connection string" i "URI"
11. Skopiuj "Connection string" (zaczyna się od `postgresql://`)

**Opcja B: Lokalna baza PostgreSQL (trudniejsze)**

1. Zainstaluj PostgreSQL:
   - Na Mac: `brew install postgresql@14`
   - Lub pobierz z: https://www.postgresql.org/download/
2. Utwórz bazę danych (wymaga znajomości PostgreSQL)

### Krok 4.2: Utwórz plik .env

1. **W Terminalu** (upewnij się, że jesteś w folderze `proof-of-meeting`):
   ```
   pwd
   ```
   Powinno pokazać: `/Users/chrissulenta/.cursor-tutor/proof-of-meeting`

2. **Utwórz plik .env:**
   - W Terminalu wpisz:
     ```
     touch .env
     ```
   - Lub otwórz Finder, przejdź do folderu `proof-of-meeting` i utwórz nowy plik tekstowy o nazwie `.env`

3. **Otwórz plik .env w edytorze:**
   - W Terminalu wpisz:
     ```
     open -a TextEdit .env
     ```
   - Lub znajdź plik `.env` w Finderze i otwórz go w edytorze tekstu

4. **Wklej do pliku .env** (zamień na swoje dane z Supabase):
   ```
   DATABASE_URL="postgresql://postgres:[HASŁO]@db.[PROJEKT-ID].supabase.co:5432/postgres"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   BASE_RPC_URL="https://mainnet.base.org"
   ```

   **Przykład jak to powinno wyglądać:**
   ```
   DATABASE_URL="postgresql://postgres:mojehaslo123@db.abcdefghijklmnop.supabase.co:5432/postgres"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   BASE_RPC_URL="https://mainnet.base.org"
   ```

5. **Zapisz plik** (Cmd + S)

---

## Część 5: Inicjalizacja bazy danych

### Krok 5.1: Utwórz tabele w bazie danych

W Terminalu (upewnij się, że jesteś w folderze `proof-of-meeting`) wpisz:

```
npx prisma db push
```

**Co się stanie:**
- Połączy się z bazą danych
- Utworzy wszystkie potrzebne tabele
- Na końcu zobaczysz: "Your database is now in sync with your schema"

**Jeśli zobaczysz błąd:**
- Sprawdź czy plik `.env` ma poprawny `DATABASE_URL`
- Sprawdź czy hasło w `DATABASE_URL` jest poprawne
- Sprawdź czy baza danych w Supabase jest aktywna

---

## Część 6: Uruchomienie aplikacji

### Krok 6.1: Uruchom serwer deweloperski

W Terminalu (upewnij się, że jesteś w folderze `proof-of-meeting`) wpisz:

```
npm run dev
```

**Co się stanie:**
- Zobaczysz tekst: "Ready - started server on 0.0.0.0:3000"
- Aplikacja będzie działać!

### Krok 6.2: Otwórz aplikację w przeglądarce

1. Otwórz przeglądarkę (Chrome, Safari, Firefox)
2. W pasku adresu wpisz:
   ```
   http://localhost:3000
   ```
3. Naciśnij Enter

**Powinieneś zobaczyć:**
- Stronę główną aplikacji "Proof of Meeting"
- Niebieskie tło z informacjami o aplikacji

---

## Część 7: Testowanie aplikacji

### Krok 7.1: Sprawdź czy wszystko działa

1. **Strona główna:**
   - Powinieneś zobaczyć tytuł "🤝 Proof of Meeting"
   - Powinny być widoczne karty z funkcjami

2. **Leaderboard:**
   - Kliknij link "View Leaderboard" na stronie głównej
   - Powinieneś zobaczyć pustą tabelę (bo nie ma jeszcze użytkowników)

3. **Frame (dla Farcaster/BaseApp):**
   - Aplikacja jest gotowa do użycia jako Frame
   - Udostępnij link `http://localhost:3000` w Farcaster lub BaseApp

---

## 🆘 Rozwiązywanie problemów

### Problem: "command not found: node"
**Rozwiązanie:** Zainstaluj Node.js z https://nodejs.org

### Problem: "Cannot find module"
**Rozwiązanie:** Uruchom ponownie `npm install`

### Problem: "Error: P1001: Can't reach database server"
**Rozwiązanie:** 
- Sprawdź czy `DATABASE_URL` w pliku `.env` jest poprawny
- Sprawdź czy baza danych w Supabase jest aktywna
- Sprawdź czy hasło w `DATABASE_URL` jest poprawne

### Problem: Port 3000 jest zajęty
**Rozwiązanie:** 
- Zamknij inne aplikacje używające portu 3000
- Lub uruchom na innym porcie: `npm run dev -- -p 3001`
- Wtedy użyj: `http://localhost:3001`

### Problem: Nie widzę folderu `.cursor-tutor`
**Rozwiązanie:**
- W Finderze naciśnij `Cmd + Shift + .` aby pokazać ukryte pliki
- Lub w Terminalu: `cd ~/.cursor-tutor/proof-of-meeting`

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

**Potrzebujesz pomocy?**
- Sprawdź logi w Terminalu (tam są komunikaty o błędach)
- Sprawdź czy wszystkie kroki zostały wykonane poprawnie

