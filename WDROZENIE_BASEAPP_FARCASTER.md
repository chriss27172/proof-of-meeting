# 🚀 Wdrożenie na BaseApp i Farcaster - Krok po Kroku

## 📋 Co będziesz potrzebować:

1. ✅ **GitHub** - repozytorium z kodem
2. ✅ **Vercel** - hosting aplikacji (darmowe)
3. ✅ **Railway** - baza danych PostgreSQL (już masz!)
4. ✅ **Konto Farcaster** - do testowania Frame
5. ✅ **Konto BaseApp** - do testowania Frame

## 💻 Terminal (zsh)

**Używasz zsh** - wszystkie komendy działają identycznie! ✅

---

## 📝 KROK 1: Przygotowanie kodu do wdrożenia

### 1.1. Sprawdź czy wszystko działa lokalnie

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
npm run dev
```

**W Terminalu:**


**Sprawdź:**
- ✅ Aplikacja działa na `http://localhost:3000`
- ✅ Wszystkie strony się ładują
- ✅ Nie ma błędów w konsoli

**Zatrzymaj serwer:** Naciśnij `Ctrl + C`

---

## 📝 KROK 2: Utworzenie repozytorium GitHub

### 2.1. Załóż konto GitHub (jeśli nie masz)

1. **Otwórz przeglądarkę:**
   - Idź na: https://github.com
   - Kliknij **"Sign up"**
   - Wypełnij formularz i utwórz konto

### 2.2. Utwórz nowe repozytorium

1. **Po zalogowaniu:**
   - Kliknij ikonę **"+"** w prawym górnym rogu
   - Wybierz **"New repository"**

2. **Wypełnij formularz:**
   - **Repository name:** `proof-of-meeting`
   - **Description:** `Proof of Meeting - Verify real-world meetings with EAS on Base`
   - **Public** ✅ (WAŻNE: musi być Public!)
   - **NIE zaznaczaj** "Add a README file"
   - **NIE zaznaczaj** "Add .gitignore"
   - Kliknij **"Create repository"**

3. **Skopiuj URL repozytorium:**
   - Zobaczysz stronę z instrukcjami
   - Skopiuj URL (np. `https://github.com/twoja-nazwa/proof-of-meeting.git`)

---

## 📝 KROK 3: Wgranie kodu do GitHub

### 3.1. Zainicjuj Git w projekcie

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
git init
```

### 3.2. Sprawdź czy .gitignore istnieje

**W Terminalu (zsh):**
```zsh
ls -la .gitignore
```

**Jeśli nie istnieje, utwórz go:**
```zsh
cat > .gitignore << 'EOF'
node_modules/
.next/
.env
.env*.local
.vercel
*.db
*.db-journal
.DS_Store
EOF
```

### 3.3. Dodaj wszystkie pliki do Git

**W Terminalu (zsh):**
```zsh
git add .
```

### 3.4. Zrób pierwszy commit

**W Terminalu (zsh):**
```zsh
git commit -m "Initial commit - Proof of Meeting app"
```

### 3.5. Połącz z GitHub

**W Terminalu (zsh) - ZAMIEŃ URL na swój!:**
```zsh
git remote add origin https://github.com/TWOJA-NAZWA/proof-of-meeting.git
```

**Zamień `TWOJA-NAZWA` na swoją nazwę użytkownika GitHub!**

**Przykład:**
```zsh
git remote add origin https://github.com/chrissulenta/proof-of-meeting.git
```

### 3.6. Wyślij kod do GitHub

**W Terminalu (zsh):**
```zsh
git branch -M main
git push -u origin main
```

**Jeśli poprosi o login:**
- Wpisz swoją nazwę użytkownika GitHub
- Wpisz hasło (lub użyj Personal Access Token)

**Jeśli nie masz Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Zaznacz `repo` (pełny dostęp)
4. Skopiuj token i użyj go jako hasła

---

## 📝 KROK 4: Konfiguracja Vercel

### 4.1. Załóż konto Vercel

1. **Otwórz przeglądarkę:**
   - Idź na: https://vercel.com
   - Kliknij **"Sign Up"**
   - Wybierz **"Continue with GitHub"**
   - Zaloguj się przez GitHub
   - Zaznacz **"Authorize Vercel"**

### 4.2. Utwórz nowy projekt

1. **Po zalogowaniu:**
   - Kliknij **"Add New..."** → **"Project"**

2. **Importuj repozytorium:**
   - Znajdź `proof-of-meeting` na liście
   - Kliknij **"Import"**

3. **Konfiguracja projektu:**
   - **Framework Preset:** Next.js (powinno być automatycznie) ✅
   - **Root Directory:** `./` (zostaw domyślne) ✅
   - **Build Command:** `npm run build` (zostaw domyślne) ✅
   - **Output Directory:** `.next` (zostaw domyślne) ✅
   - **Install Command:** `npm install` (zostaw domyślne) ✅

### 4.3. Dodaj zmienne środowiskowe

**WAŻNE:** Dodaj wszystkie zmienne przed wdrożeniem!

**W sekcji "Environment Variables" kliknij "Add" i dodaj:**

#### 1. DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** `postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 2. BASE_RPC_URL
- **Name:** `BASE_RPC_URL`
- **Value:** `https://mainnet.base.org`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 3. EAS_SCHEMA_UID
- **Name:** `EAS_SCHEMA_UID`
- **Value:** `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 4. NEXT_PUBLIC_EAS_SCHEMA_UID
- **Name:** `NEXT_PUBLIC_EAS_SCHEMA_UID`
- **Value:** `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### 5. NEXT_PUBLIC_BASE_URL (Tymczasowo)
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://proof-of-meeting.vercel.app` (zostanie zmienione po wdrożeniu)
- **Environment:** ✅ Production ✅ Preview ✅ Development

### 4.4. Wdróż projekt

1. **Kliknij "Deploy"** (na dole strony)
2. **Poczekaj** 2-3 minuty aż Vercel zbuduje aplikację
3. **Po zakończeniu:**
   - Zobaczysz link do aplikacji (np. `https://proof-of-meeting-xyz123.vercel.app`)
   - **SKOPIUJ TEN URL!** 📋

### 4.5. Zaktualizuj NEXT_PUBLIC_BASE_URL

1. **W Vercel:**
   - Idź do **Settings** → **Environment Variables**
   - Znajdź `NEXT_PUBLIC_BASE_URL`
   - Kliknij **"Edit"** (ikona ołówka)
   - **Zamień** wartość na URL z Vercel (np. `https://proof-of-meeting-xyz123.vercel.app`)
   - Kliknij **"Save"**

2. **Redeploy:**
   - Idź do **Deployments** (w menu po lewej)
   - Znajdź ostatni deployment
   - Kliknij **"..."** (trzy kropki)
   - Wybierz **"Redeploy"**
   - Kliknij **"Redeploy"** w popup

3. **Poczekaj** 1-2 minuty aż się wdroży ponownie

---

## 📝 KROK 5: Utworzenie tabel w bazie danych

### 5.1. Sprawdź connection string

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
cat .env | grep DATABASE_URL
```

**Powinieneś zobaczyć:**
```
DATABASE_URL="postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway"
```

**Jeśli nie, zaktualizuj .env:**
```zsh
open -a TextEdit .env
```

### 5.2. Utwórz tabele w Railway PostgreSQL

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

---

## 📝 KROK 6: Testowanie aplikacji

### 6.1. Sprawdź czy aplikacja działa

1. **Otwórz URL z Vercel** w przeglądarce
   - Przykład: `https://proof-of-meeting-xyz123.vercel.app`

2. **Sprawdź:**
   - ✅ Strona główna się ładuje
   - ✅ Przyciski działają
   - ✅ Możesz przejść do różnych stron
   - ✅ Nie ma błędów w konsoli (F12)

---

## 📝 KROK 7: Publikacja w Farcaster

### 7.1. Utwórz cast w Farcaster

1. **Otwórz Farcaster** (aplikacja lub strona)
2. **Kliknij "Compose"** (ikonka +)
3. **Wpisz tekst:**
   ```
   🤝 Proof of Meeting - Verify real-world meetings with EAS on Base!
   
   Scan QR codes or NFC tags to verify meetings and build your reputation.
   
   [Wklej URL z Vercel]
   ```

4. **Wklej URL z Vercel:**
   - Przykład: `https://proof-of-meeting-xyz123.vercel.app`

5. **Opublikuj cast**

### 7.2. Testuj Frame w Farcaster

1. **Kliknij na link** w swoim cast
2. **Sprawdź czy Frame się ładuje:**
   - Powinieneś zobaczyć obrazek Frame
   - Powinieneś zobaczyć przyciski:
     - "My Profile"
     - "Browse Profiles"
     - "Show QR/NFC"
     - "Scan QR/NFC"
     - "Leaderboard"

3. **Kliknij przyciski:**
   - "My Profile" - powinno pokazać Twój profil
   - "Show QR/NFC" - powinno pokazać Twój QR code
   - "Scan QR/NFC" - powinno otworzyć skaner

---

## 📝 KROK 8: Publikacja w BaseApp

### 8.1. Utwórz post w BaseApp

1. **Otwórz BaseApp** (aplikacja lub strona)
2. **Kliknij "Create Post"**
3. **Wpisz tekst:**
   ```
   🤝 Proof of Meeting - Verify real-world meetings with EAS on Base!
   
   Scan QR codes or NFC tags to verify meetings and build your reputation.
   
   [Wklej URL z Vercel]
   ```

4. **Wklej URL z Vercel:**
   - Przykład: `https://proof-of-meeting-xyz123.vercel.app`

5. **Opublikuj post**

### 8.2. Testuj Frame w BaseApp

1. **Kliknij na link** w swoim poście
2. **Sprawdź czy Frame się ładuje:**
   - Powinieneś zobaczyć obrazek Frame
   - Powinieneś zobaczyć przyciski Frame

3. **Kliknij przyciski:**
   - Wszystkie przyciski powinny działać
   - Frame powinien być w pełni funkcjonalny

---

## 📝 KROK 9: Udostępnianie aplikacji

### 9.1. Udostępnij link

**Twój link do udostępnienia:**
```
https://proof-of-meeting-xyz123.vercel.app
```

**Gdzie możesz udostępnić:**
- ✅ Farcaster casts
- ✅ BaseApp posts
- ✅ Twitter/X
- ✅ Discord
- ✅ Telegram
- ✅ Wszędzie gdzie możesz wkleić link!

### 9.2. Instrukcje dla użytkowników

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
- ✅ Używać Frame w Farcaster/BaseApp
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
- **GitHub Repo:** https://github.com/twoja-nazwa/proof-of-meeting
- **Railway Dashboard:** https://railway.app/dashboard
- **BaseScan:** https://basescan.org (do sprawdzania transakcji EAS)
- **EAS Explorer Base:** https://base.easscan.org

---

## ⚠️ Ważne uwagi:

1. **NEXT_PUBLIC_BASE_URL** musi być ustawiony na URL z Vercel
2. **DATABASE_URL** musi być connection string z Railway
3. **EAS_SCHEMA_UID** musi być ten sam w obu zmiennych
4. **Po każdej zmianie w kodzie** - push do GitHub, Vercel wdroży automatycznie
5. **Frame działa tylko w Farcaster/BaseApp** - nie działa w zwykłej przeglądarce

---

## 🐛 Rozwiązywanie problemów:

### Problem: Frame się nie ładuje w Farcaster/BaseApp
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

**Zacznij od Kroku 1 i przejdź przez wszystkie kroki po kolei!** 🚀

**Powodzenia z wdrożeniem!** 🎉

