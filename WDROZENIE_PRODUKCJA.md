# 🚀 Wdrożenie aplikacji do produkcji - Krok po Kroku

## 📋 Co będziesz potrzebować:

1. **GitHub** - do przechowywania kodu
2. **Vercel** - do hostowania aplikacji Next.js (darmowe)
3. **Railway** - już masz bazę danych PostgreSQL ✅
4. **Konto w Farcaster/BaseApp** - do testowania Frame

---

## 📝 Krok 1: Przygotowanie kodu

### 1.1. Sprawdź czy wszystko działa lokalnie

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
npm run dev
```

**Sprawdź:**
- ✅ Aplikacja działa na `http://localhost:3000`
- ✅ Wszystkie strony się ładują
- ✅ Nie ma błędów w konsoli

**Zatrzymaj serwer:** Naciśnij `Ctrl + C` w Terminalu

---

## 📝 Krok 2: Utworzenie repozytorium GitHub

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
   - **Repository name:** `proof-of-meeting` (lub dowolna nazwa)
   - **Description:** `Proof of Meeting - Verify real-world meetings with EAS on Base`
   - **Public** (zaznacz) - żeby Vercel mógł się połączyć
   - **NIE zaznaczaj** "Add a README file"
   - **NIE zaznaczaj** "Add .gitignore"
   - **NIE zaznaczaj** "Choose a license"
   - Kliknij **"Create repository"**

3. **Skopiuj URL repozytorium:**
   - Zobaczysz stronę z instrukcjami
   - Skopiuj URL (np. `https://github.com/twoja-nazwa/proof-of-meeting.git`)

---

## 📝 Krok 3: Wgranie kodu do GitHub

### 3.1. Zainicjuj Git w projekcie

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
git init
```

### 3.2. Utwórz plik .gitignore

**W Terminalu:**
```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# Prisma
prisma/migrations/
*.db
*.db-journal
EOF
```

### 3.3. Dodaj wszystkie pliki do Git

**W Terminalu:**
```bash
git add .
```

### 3.4. Zrób pierwszy commit

**W Terminalu:**
```bash
git commit -m "Initial commit - Proof of Meeting app"
```

### 3.5. Połącz z GitHub

**W Terminalu (zamień URL na swój):**
```bash
git remote add origin https://github.com/TWOJA-NAZWA/proof-of-meeting.git
```

**Zamień `TWOJA-NAZWA` na swoją nazwę użytkownika GitHub!**

### 3.6. Wyślij kod do GitHub

**W Terminalu:**
```bash
git branch -M main
git push -u origin main
```

**Jeśli poprosi o login:**
- Wpisz swoją nazwę użytkownika GitHub
- Wpisz hasło (lub użyj Personal Access Token)

---

## 📝 Krok 4: Konfiguracja Vercel

### 4.1. Załóż konto Vercel

1. **Otwórz przeglądarkę:**
   - Idź na: https://vercel.com
   - Kliknij **"Sign Up"**
   - Wybierz **"Continue with GitHub"**
   - Zaloguj się przez GitHub

### 4.2. Utwórz nowy projekt

1. **Po zalogowaniu:**
   - Kliknij **"Add New..."** → **"Project"**

2. **Importuj repozytorium:**
   - Znajdź `proof-of-meeting` na liście
   - Kliknij **"Import"**

3. **Konfiguracja projektu:**
   - **Framework Preset:** Next.js (powinno być automatycznie)
   - **Root Directory:** `./` (zostaw domyślne)
   - **Build Command:** `npm run build` (zostaw domyślne)
   - **Output Directory:** `.next` (zostaw domyślne)
   - **Install Command:** `npm install` (zostaw domyślne)

### 4.3. Dodaj zmienne środowiskowe

**W sekcji "Environment Variables" dodaj:**

1. **DATABASE_URL:**
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway`
   - **Environment:** Production, Preview, Development (zaznacz wszystkie)

2. **NEXT_PUBLIC_BASE_URL:**
   - **Name:** `NEXT_PUBLIC_BASE_URL`
   - **Value:** `https://twoja-aplikacja.vercel.app` (zostanie wygenerowane automatycznie)
   - **Environment:** Production, Preview, Development (zaznacz wszystkie)
   - **UWAGA:** Najpierw wdróż projekt, a potem wróć i zaktualizuj ten URL!

3. **BASE_RPC_URL:**
   - **Name:** `BASE_RPC_URL`
   - **Value:** `https://mainnet.base.org`
   - **Environment:** Production, Preview, Development (zaznacz wszystkie)

4. **EAS_SCHEMA_UID:**
   - **Name:** `EAS_SCHEMA_UID`
   - **Value:** `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
   - **Environment:** Production, Preview, Development (zaznacz wszystkie)

5. **NEXT_PUBLIC_EAS_SCHEMA_UID:**
   - **Name:** `NEXT_PUBLIC_EAS_SCHEMA_UID`
   - **Value:** `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
   - **Environment:** Production, Preview, Development (zaznacz wszystkie)

### 4.4. Wdróż projekt

1. **Kliknij "Deploy"**
2. **Poczekaj** 2-3 minuty aż Vercel zbuduje aplikację
3. **Po zakończeniu:**
   - Zobaczysz link do aplikacji (np. `https://proof-of-meeting-xyz.vercel.app`)
   - **Skopiuj ten URL!**

### 4.5. Zaktualizuj NEXT_PUBLIC_BASE_URL

1. **W Vercel:**
   - Idź do **Settings** → **Environment Variables**
   - Znajdź `NEXT_PUBLIC_BASE_URL`
   - Kliknij **"Edit"**
   - Zmień wartość na URL z Vercel (np. `https://proof-of-meeting-xyz.vercel.app`)
   - Zapisz

2. **Redeploy:**
   - Idź do **Deployments**
   - Kliknij **"..."** przy ostatnim deployment
   - Wybierz **"Redeploy"**

---

## 📝 Krok 5: Aktualizacja bazy danych

### 5.1. Utwórz tabele w Railway PostgreSQL

**W Terminalu (lokalnie):**
```bash
cd ~/.cursor-tutor/proof-of-meeting
```

**Upewnij się, że .env ma connection string z Railway:**
```bash
cat .env | grep DATABASE_URL
```

**Powinieneś zobaczyć:**
```
DATABASE_URL="postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway"
```

**Jeśli nie, zaktualizuj .env:**
```bash
open -a TextEdit .env
```

**Utwórz tabele:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

---

## 📝 Krok 6: Testowanie aplikacji

### 6.1. Sprawdź czy aplikacja działa

1. **Otwórz URL z Vercel** w przeglądarce
2. **Sprawdź:**
   - ✅ Strona główna się ładuje
   - ✅ Przyciski działają
   - ✅ Możesz przejść do różnych stron

### 6.2. Testuj Frame w Farcaster/BaseApp

1. **Otwórz Farcaster** lub **BaseApp**
2. **Utwórz nowy cast/post:**
   - Wklej URL z Vercel (np. `https://proof-of-meeting-xyz.vercel.app`)
   - Opublikuj

3. **Kliknij na link** w cast/post
4. **Sprawdź czy Frame się ładuje:**
   - Powinieneś zobaczyć przyciski Frame
   - "My Profile", "Show QR/NFC", "Scan QR/NFC", etc.

---

## 📝 Krok 7: Aktualizacja kodu (opcjonalnie)

### Jeśli chcesz zaktualizować kod:

1. **Zrób zmiany lokalnie**
2. **W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
git add .
git commit -m "Opisz co zmieniłeś"
git push
```

3. **Vercel automatycznie wdroży nową wersję!** ✅

---

## ✅ Gotowe!

**Twoja aplikacja jest teraz dostępna dla wszystkich!** 🚀

**Użytkownicy mogą:**
- Otworzyć aplikację przez link
- Używać Frame w Farcaster/BaseApp
- Weryfikować spotkania przez QR/NFC
- Mintować EAS attestations
- Budować reputację

---

## 🔗 Przydatne linki:

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/twoja-nazwa/proof-of-meeting
- **Railway Dashboard:** https://railway.app/dashboard
- **BaseScan:** https://basescan.org (do sprawdzania transakcji)

---

## ⚠️ Ważne uwagi:

1. **NEXT_PUBLIC_BASE_URL** musi być ustawiony na URL z Vercel
2. **DATABASE_URL** musi być connection string z Railway
3. **EAS_SCHEMA_UID** musi być ten sam w obu zmiennych
4. **Po każdej zmianie w kodzie** - push do GitHub, Vercel wdroży automatycznie

---

**Zacznij od Kroku 1 i przejdź przez wszystkie kroki po kolei!** 🚀

