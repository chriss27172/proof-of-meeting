# 📋 Instrukcja: Dodanie Neynar Score - Krok po Kroku (zsh)

## 🎯 Cel
Dodanie Neynar Score do systemu reputacji, aby użytkownicy z wyższym Neynar Score byli lepiej punktowani w leaderboard.

## 💻 Wymagania
- Terminal zsh (domyślny w macOS)
- Node.js zainstalowany
- Dostęp do projektu proof-of-meeting

**Sprawdź swoją powłokę:**
```zsh
echo $SHELL
echo $ZSH_VERSION
```

Powinieneś zobaczyć `/bin/zsh` i numer wersji zsh.

---

## ✅ KROK 1: Zainstaluj nowe zależności

Otwórz terminal (zsh) w folderze projektu i wykonaj:

```zsh
cd ~/Documents/GitHub/proof-of-meeting
npm install
```

**Uwaga:** Jeśli nie jesteś w folderze projektu, użyj `cd` aby przejść do właściwego katalogu.

To zainstaluje pakiet `@neynar/nodejs-sdk`, który został dodany do `package.json`.

**Sprawdź czy się udało:**
- Powinno zakończyć się bez błędów
- Jeśli widzisz błędy, spróbuj: `npm install --force`
- Możesz sprawdzić czy pakiet został zainstalowany: `npm list @neynar/nodejs-sdk`

---

## 🔑 KROK 2: Uzyskaj klucz API Neynar

1. **Przejdź na stronę Neynar:**
   - Otwórz: https://neynar.com
   - Zarejestruj się lub zaloguj

2. **Utwórz nowy projekt/klucz API:**
   - Przejdź do sekcji API Keys lub Dashboard
   - Kliknij "Create API Key" lub "New Key"
   - Skopiuj wygenerowany klucz API

3. **Zapisz klucz w bezpiecznym miejscu** (będziesz go potrzebować w następnym kroku)

---

## 🔐 KROK 3: Dodaj klucz API do zmiennych środowiskowych

### Opcja A: Jeśli używasz pliku `.env.local` (lokalnie)

1. **Przejdź do folderu projektu w terminalu zsh:**
   ```zsh
   cd ~/Documents/GitHub/proof-of-meeting
   ```

2. **Sprawdź czy masz plik `.env.local`:**
   ```zsh
   ls -la | grep .env
   ```
   
   Jeśli widzisz `.env.local` - plik istnieje. Jeśli nie widzisz nic, utwórz go w następnym kroku.

3. **Jeśli NIE masz pliku `.env.local`, utwórz go:**
   ```zsh
   touch .env.local
   ```

4. **Otwórz plik `.env.local` w edytorze:**
   
   **Opcja 1: Użyj nano (prostsze):**
   ```zsh
   nano .env.local
   ```
   
   **Opcja 2: Użyj vim:**
   ```zsh
   vim .env.local
   ```
   
   **Opcja 3: Otwórz w edytorze (macOS):**
   ```zsh
   open -a TextEdit .env.local
   ```
   
   Lub w VS Code:
   ```zsh
   code .env.local
   ```

5. **Dodaj linię z kluczem API:**
   ```
   NEYNAR_API_KEY=twój_klucz_api_tutaj
   ```
   
   **Przykład:**
   ```
   NEYNAR_API_KEY=NEYNAR_API_KEY_v2_abc123xyz456
   ```

6. **Zapisz plik:**
   - W nano: `Ctrl+O` (zapisz), `Enter` (potwierdź), `Ctrl+X` (wyjście)
   - W vim: `Esc`, potem `:wq` i `Enter`
   - W edytorze: normalnie `Cmd+S`

7. **Sprawdź czy klucz został zapisany:**
   ```zsh
   cat .env.local | grep NEYNAR_API_KEY
   ```
   
   Powinieneś zobaczyć swoją linię z kluczem API.

### Opcja B: Jeśli używasz Vercel/Railway (produkcja)

1. **Vercel:**
   - Przejdź do projektu na https://vercel.com
   - Settings → Environment Variables
   - Dodaj nową zmienną:
     - **Name:** `NEYNAR_API_KEY`
     - **Value:** twój klucz API
   - Kliknij "Save"

2. **Railway:**
   - Przejdź do projektu na https://railway.app
   - Variables → New Variable
   - **Key:** `NEYNAR_API_KEY`
   - **Value:** twój klucz API
   - Kliknij "Add"

---

## 🗄️ KROK 4: Zaktualizuj bazę danych

Musisz dodać nowe pole `neynarScore` do tabeli `User` w bazie danych.

### Opcja A: Migracja Prisma (zalecane dla produkcji)

Upewnij się, że jesteś w folderze projektu:
```zsh
cd ~/Documents/GitHub/proof-of-meeting
```

Następnie wykonaj migrację:
```zsh
npx prisma migrate dev --name add_neynar_score
```

**Co się stanie:**
- Prisma utworzy plik migracji
- Zaktualizuje schemat bazy danych
- Wygeneruje nowy Prisma Client

**Jeśli widzisz błąd o braku połączenia z bazą:**
- Sprawdź czy `DATABASE_URL` jest ustawione w `.env.local`:
  ```zsh
  cat .env.local | grep DATABASE_URL
  ```
- Sprawdź czy baza danych działa

### Opcja B: Prisma DB Push (szybsze, dla developmentu)

```zsh
npx prisma db push
```

**Co się stanie:**
- Prisma zaktualizuje schemat bezpośrednio w bazie
- Nie utworzy pliku migracji (tylko dla developmentu)

### Opcja C: Jeśli używasz SQLite (lokalnie)

```zsh
npx prisma db push
```

---

## ✅ KROK 5: Wygeneruj Prisma Client

Po aktualizacji bazy danych, wygeneruj nowy Prisma Client:

```zsh
npx prisma generate
```

**To jest ważne!** Bez tego kod nie będzie wiedział o nowym polu `neynarScore`.

**Sprawdź czy się udało:**
```zsh
ls -la node_modules/.prisma/client | head -5
```

Powinieneś zobaczyć pliki Prisma Client.

---

## 🧪 KROK 6: Sprawdź czy wszystko działa

### 6.1. Uruchom serwer deweloperski:

Upewnij się, że jesteś w folderze projektu:
```zsh
cd ~/Documents/GitHub/proof-of-meeting
```

Uruchom serwer:
```zsh
npm run dev
```

**Powinieneś zobaczyć:**
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
```

### 6.2. Sprawdź czy nie ma błędów kompilacji:

- Sprawdź terminal zsh - nie powinno być czerwonych błędów
- Jeśli widzisz błędy, sprawdź:
  - Czy wykonałeś `npm install`
  - Czy wykonałeś `npx prisma generate`
  - Czy `NEYNAR_API_KEY` jest ustawione (sprawdź: `cat .env.local | grep NEYNAR`)

### 6.3. Przetestuj w przeglądarce:

1. **Otwórz leaderboard:**
   - W przeglądarce: http://localhost:3000/leaderboard
   - Lub w terminalu zsh: `open http://localhost:3000/leaderboard`
   - Sprawdź czy widzisz kolumnę "Neynar Score"

2. **Otwórz profil użytkownika:**
   - Zamień `[fid]` na prawdziwy FID użytkownika
   - Przykład: http://localhost:3000/profile/123
   - Sprawdź czy widzisz kartę z Neynar Score

3. **Sprawdź zmienne środowiskowe (w nowym oknie terminala zsh):**
   ```zsh
   cd ~/Documents/GitHub/proof-of-meeting
   source .env.local 2>/dev/null || true
   echo $NEYNAR_API_KEY
   ```
   
   Jeśli widzisz swój klucz - wszystko jest OK. Jeśli nie, sprawdź plik `.env.local`.

---

## 🔍 KROK 7: Sprawdź logi (opcjonalne)

Jeśli Neynar Score nie pojawia się:

1. **Sprawdź konsolę serwera** (terminal zsh gdzie działa `npm run dev`)
   - Szukaj komunikatów w terminalu
   - Naciśnij `Cmd+F` w terminalu aby wyszukać

2. **Szukaj komunikatów:**
   - `NEYNAR_API_KEY not set` - oznacza że klucz nie jest ustawiony
   - `Error fetching Neynar Score` - oznacza problem z API

3. **Sprawdź czy klucz API jest poprawny w zsh:**
   ```zsh
   cd ~/Documents/GitHub/proof-of-meeting
   cat .env.local | grep NEYNAR_API_KEY
   ```
   
   Sprawdź:
   - Czy klucz jest w jednej linii (bez przerw)
   - Czy nie ma dodatkowych spacji przed lub po znaku `=`
   - Czy klucz zaczyna się od `NEYNAR_API_KEY_`

4. **Sprawdź czy zmienna jest dostępna dla Node.js:**
   ```zsh
   cd ~/Documents/GitHub/proof-of-meeting
   node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.NEYNAR_API_KEY ? 'OK' : 'BRAK')"
   ```
   
   Jeśli widzisz "BRAK", sprawdź plik `.env.local` ponownie.

---

## 📊 KROK 8: Jak działa Neynar Score

### Automatyczne pobieranie:
- Przy pierwszym obliczeniu reputacji użytkownika, system automatycznie pobierze Neynar Score
- Score jest cachowany w bazie danych (nie pobiera za każdym razem)
- Jeśli użytkownik nie ma Neynar Score, zobaczy "N/A"

### Wpływ na reputację:
- **35%** - Spotkania
- **25%** - Atestacje
- **25%** - Oceny
- **15%** - Neynar Score (z bonusem dla wyższych wyników)

**Przykład:**
- Użytkownik z Neynar Score 0.9 otrzyma więcej punktów niż użytkownik z 0.5
- Użytkownicy z wyższym Neynar Score będą wyżej w leaderboard

---

## 🚨 Rozwiązywanie problemów

### Problem: "NEYNAR_API_KEY not set"
**Rozwiązanie w zsh:**
```zsh
cd ~/Documents/GitHub/proof-of-meeting
# Sprawdź czy plik istnieje
ls -la .env.local

# Sprawdź zawartość
cat .env.local | grep NEYNAR

# Jeśli nie ma, dodaj:
echo "NEYNAR_API_KEY=twój_klucz" >> .env.local
```

Zrestartuj serwer w terminalu zsh:
- Naciśnij `Ctrl+C` aby zatrzymać serwer
- Uruchom ponownie: `npm run dev`

### Problem: "Error fetching Neynar Score"
**Rozwiązanie:**
- Sprawdź czy klucz API jest poprawny:
  ```zsh
  cat .env.local | grep NEYNAR_API_KEY
  ```
- Sprawdź połączenie z internetem:
  ```zsh
  ping -c 3 api.neynar.com
  ```
- Sprawdź czy klucz API nie wygasł (zaloguj się na neynar.com)

### Problem: "Cannot find module '@neynar/nodejs-sdk'"
**Rozwiązanie w zsh:**
```zsh
cd ~/Documents/GitHub/proof-of-meeting
npm install
npx prisma generate
```

Sprawdź czy pakiet został zainstalowany:
```zsh
npm list @neynar/nodejs-sdk
```

### Problem: Baza danych nie aktualizuje się
**Rozwiązanie w zsh:**
```zsh
cd ~/Documents/GitHub/proof-of-meeting
npx prisma db push
npx prisma generate
```

Sprawdź status bazy:
```zsh
npx prisma studio
```

### Problem: Neynar Score pokazuje "N/A" dla wszystkich
**Rozwiązanie:**
- To normalne dla nowych użytkowników
- Score będzie pobierany automatycznie przy następnym obliczeniu reputacji
- Możesz ręcznie wywołać `calculateReputationScore` dla użytkownika

---

## ✅ Checklist - Sprawdź czy wszystko zrobione:

- [ ] Zainstalowano `npm install` w terminalu zsh
- [ ] Utworzono konto na Neynar i uzyskano klucz API
- [ ] Dodano `NEYNAR_API_KEY` do `.env.local` (sprawdź: `cat .env.local | grep NEYNAR`)
- [ ] Zaktualizowano bazę danych (`npx prisma migrate dev` lub `npx prisma db push`)
- [ ] Wygenerowano Prisma Client (`npx prisma generate`)
- [ ] Uruchomiono serwer (`npm run dev`) w terminalu zsh
- [ ] Sprawdzono leaderboard - widzę kolumnę "Neynar Score"
- [ ] Sprawdzono profil użytkownika - widzę kartę z Neynar Score

**Szybkie sprawdzenie w zsh:**
```zsh
cd ~/Documents/GitHub/proof-of-meeting
echo "✅ Sprawdzam instalację..."
npm list @neynar/nodejs-sdk > /dev/null 2>&1 && echo "✅ Pakiet zainstalowany" || echo "❌ Pakiet NIE zainstalowany"
cat .env.local | grep -q NEYNAR_API_KEY && echo "✅ Klucz API ustawiony" || echo "❌ Klucz API NIE ustawiony"
ls prisma/migrations/*add_neynar_score* > /dev/null 2>&1 && echo "✅ Migracja wykonana" || echo "⚠️  Migracja może nie być wykonana (OK jeśli użyłeś db push)"
```

---

## 🎉 Gotowe!

Jeśli wszystkie kroki zostały wykonane poprawnie, Neynar Score powinien działać!

**Co dalej:**
- Neynar Score będzie automatycznie pobierany dla nowych użytkowników
- Użytkownicy z wyższym Neynar Score będą wyżej w leaderboard
- Możesz sprawdzić leaderboard i zobaczyć jak Neynar Score wpływa na ranking

---

## 📝 Uwagi dodatkowe

1. **Neynar Score jest opcjonalny:**
   - Jeśli nie ustawisz `NEYNAR_API_KEY`, system będzie działał normalnie
   - Użytkownicy bez Neynar Score zobaczą "N/A"
   - Reputacja będzie liczona bez Neynar Score (35% spotkania, 30% atestacje, 35% oceny)

2. **Caching:**
   - Neynar Score jest cachowany w bazie danych
   - Nie jest pobierany za każdym razem (oszczędność API calls)
   - Możesz zaktualizować cache ręcznie, usuwając wartość `neynarScore` w bazie

3. **Rate Limiting:**
   - Neynar API ma limity zapytań
   - System pobiera score tylko raz dla każdego użytkownika
   - Jeśli masz dużo użytkowników, rozważ batch update

---

**Masz pytania? Sprawdź logi w konsoli lub dokumentację Neynar: https://docs.neynar.com**

