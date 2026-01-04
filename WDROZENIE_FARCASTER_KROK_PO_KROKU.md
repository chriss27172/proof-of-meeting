# 🚀 Wdrożenie na Farcaster - Instrukcja Krok po Kroku

## ✅ Co już masz:
- ✅ Kod na GitHub (https://github.com/chriss27172/proof-of-meeting)
- ✅ Baza danych Railway PostgreSQL
- ✅ EAS Schema UID

## 📋 Co będziesz potrzebować:
1. **Konto Vercel** (darmowe) - hosting aplikacji
2. **Konto Farcaster** - do testowania Frame

---

## 📝 KROK 1: Przygotowanie - Sprawdź lokalnie

### 1.1. Sprawdź czy aplikacja działa lokalnie

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
npm run dev
```

**Sprawdź:**
- ✅ Aplikacja działa na `http://localhost:3000`
- ✅ Wszystkie strony się ładują
- ✅ Nie ma błędów w konsoli

**Zatrzymaj serwer:** Naciśnij `Ctrl + C`

---

## 📝 KROK 2: Utworzenie konta Vercel

### 2.1. Załóż konto Vercel

1. **Otwórz przeglądarkę:**
   - Idź na: https://vercel.com
   - Kliknij **"Sign Up"** (w prawym górnym rogu)

2. **Zaloguj się przez GitHub:**
   - Kliknij **"Continue with GitHub"**
   - Zaloguj się swoim kontem GitHub
   - Kliknij **"Authorize Vercel"** (autoryzuj Vercel)

3. **Poczekaj** aż zostaniesz przekierowany do dashboardu Vercel

---

## 📝 KROK 3: Import projektu z GitHub do Vercel

### 3.1. Dodaj nowy projekt

1. **W Vercel Dashboard:**
   - Kliknij **"Add New..."** (w prawym górnym rogu)
   - Wybierz **"Project"**

2. **Importuj repozytorium:**
   - Zobaczysz listę repozytoriów z GitHub
   - Znajdź **`proof-of-meeting`**
   - Kliknij **"Import"** przy repozytorium

3. **Konfiguracja projektu:**
   - **Framework Preset:** Next.js (powinno być automatycznie) ✅
   - **Root Directory:** `./` (zostaw domyślne) ✅
   - **Build Command:** `npm run build` (zostaw domyślne) ✅
   - **Output Directory:** `.next` (zostaw domyślne) ✅
   - **Install Command:** `npm install` (zostaw domyślne) ✅

**NIE KLIKAJ JESZCZE "Deploy"!** Najpierw musimy dodać zmienne środowiskowe!

---

## 📝 KROK 4: Dodanie zmiennych środowiskowych w Vercel

### 4.1. Znajdź sekcję "Environment Variables"

**W Vercel (na stronie konfiguracji projektu):**
- Przewiń w dół do sekcji **"Environment Variables"**
- Kliknij **"Add"** lub **"Add Another"**

### 4.2. Dodaj zmienne środowiskowe (jedna po drugiej)

**Dodaj każdą zmienną osobno:**

#### Zmienna 1: DATABASE_URL

1. **Kliknij "Add"** w sekcji Environment Variables
2. **Wypełnij:**
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway`
   - **Environment:** Zaznacz wszystkie ✅
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Kliknij "Save"**

#### Zmienna 2: BASE_RPC_URL

1. **Kliknij "Add"** ponownie
2. **Wypełnij:**
   - **Name:** `BASE_RPC_URL`
   - **Value:** `https://mainnet.base.org`
   - **Environment:** Zaznacz wszystkie ✅
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Kliknij "Save"**

#### Zmienna 3: EAS_SCHEMA_UID

1. **Kliknij "Add"** ponownie
2. **Wypełnij:**
   - **Name:** `EAS_SCHEMA_UID`
   - **Value:** `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
   - **Environment:** Zaznacz wszystkie ✅
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Kliknij "Save"**

#### Zmienna 4: NEXT_PUBLIC_EAS_SCHEMA_UID

1. **Kliknij "Add"** ponownie
2. **Wypełnij:**
   - **Name:** `NEXT_PUBLIC_EAS_SCHEMA_UID`
   - **Value:** `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
   - **Environment:** Zaznacz wszystkie ✅
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Kliknij "Save"**

#### Zmienna 5: NEXT_PUBLIC_BASE_URL (Tymczasowo)

1. **Kliknij "Add"** ponownie
2. **Wypełnij:**
   - **Name:** `NEXT_PUBLIC_BASE_URL`
   - **Value:** `https://proof-of-meeting.vercel.app` (tymczasowo - zmienimy później)
   - **Environment:** Zaznacz wszystkie ✅
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Kliknij "Save"**

### 4.3. Sprawdź czy wszystkie zmienne są dodane

**Powinieneś zobaczyć 5 zmiennych:**
- ✅ `DATABASE_URL`
- ✅ `BASE_RPC_URL`
- ✅ `EAS_SCHEMA_UID`
- ✅ `NEXT_PUBLIC_EAS_SCHEMA_UID`
- ✅ `NEXT_PUBLIC_BASE_URL`

---

## 📝 KROK 5: Wdrożenie projektu na Vercel

### 5.1. Wdróż projekt

1. **W Vercel (na stronie konfiguracji projektu):**
   - Przewiń na dół strony
   - Kliknij **"Deploy"** (duży niebieski przycisk)

2. **Poczekaj 2-3 minuty:**
   - Vercel buduje aplikację
   - Zobaczysz postęp w czasie rzeczywistym
   - Nie zamykaj strony!

3. **Po zakończeniu:**
   - Zobaczysz komunikat **"Congratulations!"**
   - Zobaczysz link do aplikacji (np. `https://proof-of-meeting-xyz123.vercel.app`)
   - **SKOPIUJ TEN URL!** 📋

### 5.2. Sprawdź czy aplikacja działa

1. **Otwórz URL z Vercel** w nowej karcie przeglądarki
2. **Sprawdź:**
   - ✅ Strona główna się ładuje
   - ✅ Nie ma błędów (sprawdź konsolę F12)
   - ✅ Wszystkie elementy są widoczne

---

## 📝 KROK 6: Aktualizacja NEXT_PUBLIC_BASE_URL

### 6.1. Zaktualizuj URL w zmiennych środowiskowych

**WAŻNE:** Musisz użyć rzeczywistego URL z Vercel!

1. **W Vercel Dashboard:**
   - Idź do **"Settings"** (w menu po lewej)
   - Kliknij **"Environment Variables"**

2. **Znajdź `NEXT_PUBLIC_BASE_URL`:**
   - Kliknij ikonę **"Edit"** (ołówek) przy tej zmiennej
   - **Zamień** wartość na URL z Vercel (np. `https://proof-of-meeting-xyz123.vercel.app`)
   - **WAŻNE:** Użyj dokładnie tego URL który dostałeś z Vercel!
   - Kliknij **"Save"**

### 6.2. Redeploy aplikacji

1. **W Vercel Dashboard:**
   - Idź do **"Deployments"** (w menu po lewej)
   - Znajdź ostatni deployment (najnowszy)
   - Kliknij **"..."** (trzy kropki) przy deployment
   - Wybierz **"Redeploy"**
   - Kliknij **"Redeploy"** w popup

2. **Poczekaj 1-2 minuty** aż się wdroży ponownie

---

## 📝 KROK 7: Utworzenie tabel w bazie danych

### 7.1. Sprawdź connection string

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
cat .env | grep DATABASE_URL
```

**Powinieneś zobaczyć:**
```
DATABASE_URL="postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway"
```

**Jeśli nie widzisz tego, zaktualizuj .env:**
```zsh
open -a TextEdit .env
```

**Dodaj lub zaktualizuj:**
```
DATABASE_URL="postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway"
```

### 7.2. Utwórz tabele w Railway PostgreSQL

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
npx prisma db push
```

**Poczekaj** aż zobaczysz:
```
✔ Your database is now in sync with your Prisma schema.
```

**Jeśli widzisz błędy:**
- Sprawdź czy `DATABASE_URL` jest poprawny
- Sprawdź czy Railway PostgreSQL jest aktywny
- Sprawdź czy connection string jest poprawny

---

## 📝 KROK 8: Testowanie aplikacji w przeglądarce

### 8.1. Sprawdź czy aplikacja działa

1. **Otwórz URL z Vercel** w przeglądarce
   - Przykład: `https://proof-of-meeting-xyz123.vercel.app`

2. **Sprawdź:**
   - ✅ Strona główna się ładuje
   - ✅ Przyciski działają
   - ✅ Możesz przejść do różnych stron
   - ✅ Nie ma błędów w konsoli (F12 → Console)

---

## 📝 KROK 9: Publikacja Frame w Farcaster

### 9.1. Utwórz cast w Farcaster

1. **Otwórz Farcaster:**
   - Aplikacja mobilna lub strona: https://warpcast.com
   - Zaloguj się swoim kontem

2. **Utwórz nowy cast:**
   - Kliknij ikonę **"+"** lub **"Compose"**
   - Wpisz tekst:

```
🤝 Proof of Meeting - Verify real-world meetings with EAS on Base!

Scan QR codes or NFC tags to verify meetings and build your reputation.

[Wklej URL z Vercel tutaj]
```

3. **Wklej URL z Vercel:**
   - Przykład: `https://proof-of-meeting-xyz123.vercel.app`
   - **WAŻNE:** Użyj dokładnie tego URL który dostałeś z Vercel!

4. **Opublikuj cast:**
   - Kliknij **"Cast"** lub **"Publish"**

### 9.2. Testuj Frame w Farcaster

1. **Kliknij na link** w swoim cast
   - Frame powinien się załadować automatycznie

2. **Sprawdź czy Frame działa:**
   - ✅ Powinieneś zobaczyć obrazek Frame
   - ✅ Powinieneś zobaczyć przyciski:
     - "My Profile"
     - "Browse Profiles"
     - "Show QR/NFC"
     - "Scan QR/NFC"
     - "Leaderboard"

3. **Kliknij przyciski:**
   - **"My Profile"** - powinno pokazać Twój profil
   - **"Show QR/NFC"** - powinno pokazać Twój QR code
   - **"Scan QR/NFC"** - powinno otworzyć skaner
   - **"Leaderboard"** - powinno pokazać ranking

### 9.3. Jeśli Frame nie działa

**Sprawdź:**
- ✅ Czy `NEXT_PUBLIC_BASE_URL` jest ustawiony na URL z Vercel
- ✅ Czy aplikacja działa w przeglądarce
- ✅ Czy są błędy w logach Vercel (Dashboard → Deployments → View Function Logs)

---

## 📝 KROK 10: Udostępnianie aplikacji

### 10.1. Udostępnij link

**Twój link do udostępnienia:**
```
https://proof-of-meeting-xyz123.vercel.app
```
(Zamień na swój rzeczywisty URL z Vercel!)

**Gdzie możesz udostępnić:**
- ✅ Farcaster casts
- ✅ BaseApp posts
- ✅ Twitter/X
- ✅ Discord
- ✅ Telegram
- ✅ Wszędzie gdzie możesz wkleić link!

### 10.2. Instrukcje dla użytkowników

**Możesz dodać do opisu:**
```
🤝 Proof of Meeting

Verify real-world meetings and build reputation using EAS on Base!

How to use:
1. Open this link in Farcaster or BaseApp
2. Click "Show QR/NFC" to generate your QR code
3. When meeting someone, scan their QR code
4. Both of you will be automatically verified!
5. Mint EAS attestations to build your reputation

Features:
✅ QR Code & NFC verification
✅ EAS attestations on Base
✅ Reputation system
✅ Leaderboard
✅ Anti-scam protection
```

---

## ✅ Gotowe!

**Twoja aplikacja jest teraz dostępna dla wszystkich!** 🚀

**Użytkownicy mogą:**
- ✅ Otworzyć aplikację przez link
- ✅ Używać Frame w Farcaster
- ✅ Weryfikować spotkania przez QR/NFC
- ✅ Mintować EAS attestations
- ✅ Budować reputację

---

## 🔄 Aktualizacja aplikacji

**Jeśli chcesz zaktualizować kod:**

1. **Zrób zmiany lokalnie**
2. **W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
git add .
git commit -m "Opisz co zmieniłeś"
git push
```

3. **Vercel automatycznie wdroży nową wersję!** ✅
   - Zajmie to 2-3 minuty
   - Sprawdź w Vercel Dashboard → Deployments

---

## 🔗 Przydatne linki:

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/chriss27172/proof-of-meeting
- **Railway Dashboard:** https://railway.app/dashboard
- **BaseScan:** https://basescan.org (do sprawdzania transakcji EAS)
- **EAS Explorer Base:** https://base.easscan.org
- **Farcaster:** https://warpcast.com

---

## ⚠️ Ważne uwagi:

1. **NEXT_PUBLIC_BASE_URL** musi być ustawiony na URL z Vercel
2. **DATABASE_URL** musi być connection string z Railway
3. **EAS_SCHEMA_UID** musi być ten sam w obu zmiennych
4. **Po każdej zmianie w kodzie** - push do GitHub, Vercel wdroży automatycznie
5. **Frame działa tylko w Farcaster/BaseApp** - nie działa w zwykłej przeglądarce

---

## 🐛 Rozwiązywanie problemów:

### Problem: Frame się nie ładuje w Farcaster
**Rozwiązanie:**
- Sprawdź czy `NEXT_PUBLIC_BASE_URL` jest ustawiony na URL z Vercel
- Sprawdź czy aplikacja działa w przeglądarce
- Sprawdź logi w Vercel Dashboard → Deployments → View Function Logs

### Problem: Błąd połączenia z bazą danych
**Rozwiązanie:**
- Sprawdź czy `DATABASE_URL` jest poprawny w Vercel
- Sprawdź czy Railway PostgreSQL jest aktywny
- Sprawdź czy tabele zostały utworzone (`npx prisma db push`)

### Problem: EAS attestations nie działają
**Rozwiązanie:**
- Sprawdź czy `EAS_SCHEMA_UID` i `NEXT_PUBLIC_EAS_SCHEMA_UID` są ustawione
- Sprawdź czy Schema UID jest poprawny
- Sprawdź czy wallet jest połączony z Base network

---

## 📝 Podsumowanie kroków:

1. ✅ Załóż konto Vercel
2. ✅ Importuj projekt z GitHub
3. ✅ Dodaj zmienne środowiskowe
4. ✅ Wdróż projekt
5. ✅ Zaktualizuj NEXT_PUBLIC_BASE_URL
6. ✅ Utwórz tabele w bazie danych
7. ✅ Przetestuj aplikację
8. ✅ Opublikuj Frame w Farcaster
9. ✅ Udostępnij aplikację

---

**Zacznij od Kroku 1 i przejdź przez wszystkie kroki po kolei!** 🚀

**Powodzenia z wdrożeniem!** 🎉

