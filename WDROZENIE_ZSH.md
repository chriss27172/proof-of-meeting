# 🚀 Wdrożenie aplikacji - Instrukcja dla zsh

## ✅ Terminal: zsh

**Wszystkie komendy działają identycznie w zsh!** Nie musisz nic zmieniać. ✅

---

## 📝 KROK 1: GitHub - Utworzenie repozytorium

### 1.1. Załóż konto GitHub

1. Otwórz: https://github.com
2. Kliknij "Sign up"
3. Utwórz konto

### 1.2. Utwórz repozytorium

1. Kliknij "+" → "New repository"
2. **Nazwa:** `proof-of-meeting`
3. **Public** ✅ (WAŻNE!)
4. Kliknij "Create repository"
5. **Skopiuj URL** (np. `https://github.com/twoja-nazwa/proof-of-meeting.git`)

---

## 📝 KROK 2: Wgranie kodu do GitHub

### 2.1. W Terminalu (zsh):

```zsh
cd ~/.cursor-tutor/proof-of-meeting
```

### 2.2. Zainicjuj Git:

```zsh
git init
```

### 2.3. Sprawdź .gitignore:

```zsh
ls -la .gitignore
```

**Jeśli nie istnieje:**
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

### 2.4. Dodaj pliki:

```zsh
git add .
```

### 2.5. Zrób commit:

```zsh
git commit -m "Initial commit - Proof of Meeting app"
```

### 2.6. Połącz z GitHub (ZAMIEŃ URL!):

```zsh
git remote add origin https://github.com/TWOJA-NAZWA/proof-of-meeting.git
```

**Przykład:**
```zsh
git remote add origin https://github.com/chrissulenta/proof-of-meeting.git
```

### 2.7. Wyślij kod:

```zsh
git branch -M main
git push -u origin main
```

**Jeśli poprosi o login:**
- Wpisz nazwę użytkownika GitHub
- Wpisz hasło (lub Personal Access Token)

---

## 📝 KROK 3: Vercel - Wdrożenie aplikacji

### 3.1. Załóż konto Vercel

1. Otwórz: https://vercel.com
2. Kliknij "Sign Up" → "Continue with GitHub"
3. Zaloguj się przez GitHub

### 3.2. Utwórz projekt

1. Kliknij "Add New..." → "Project"
2. Znajdź `proof-of-meeting` → Kliknij "Import"
3. **Framework:** Next.js (automatycznie) ✅
4. **Root Directory:** `./` ✅

### 3.3. Dodaj Environment Variables

**Kliknij "Add" i dodaj:**

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
- **Value:** `https://proof-of-meeting.vercel.app` (zostanie zmienione)
- **Environment:** ✅ Production ✅ Preview ✅ Development

### 3.4. Wdróż

1. Kliknij **"Deploy"**
2. Poczekaj 2-3 minuty
3. **Skopiuj URL** (np. `https://proof-of-meeting-xyz123.vercel.app`)

### 3.5. Zaktualizuj NEXT_PUBLIC_BASE_URL

1. Vercel → **Settings** → **Environment Variables**
2. Znajdź `NEXT_PUBLIC_BASE_URL` → **Edit**
3. Zmień na URL z Vercel (np. `https://proof-of-meeting-xyz123.vercel.app`)
4. **Save**

5. **Deployments** → Ostatni deployment → **"..."** → **"Redeploy"**
6. Poczekaj 1-2 minuty

---

## 📝 KROK 4: Baza danych - Utworzenie tabel

### 4.1. W Terminalu (zsh):

```zsh
cd ~/.cursor-tutor/proof-of-meeting
```

### 4.2. Sprawdź DATABASE_URL:

```zsh
cat .env | grep DATABASE_URL
```

**Powinieneś zobaczyć:**
```
DATABASE_URL="postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway"
```

### 4.3. Utwórz tabele:

```zsh
npx prisma db push
```

**Poczekaj aż zobaczysz:**
```
✔ Your database is now in sync with your Prisma schema.
```

---

## 📝 KROK 5: Testowanie

### 5.1. Sprawdź aplikację

1. Otwórz URL z Vercel w przeglądarce
2. Sprawdź czy strona się ładuje
3. Sprawdź czy przyciski działają

---

## 📝 KROK 6: Publikacja w Farcaster

### 6.1. Utwórz cast

1. Otwórz Farcaster
2. Kliknij "Compose"
3. Wpisz:
   ```
   🤝 Proof of Meeting - Verify real-world meetings with EAS on Base!
   
   [Wklej URL z Vercel]
   ```
4. Opublikuj

### 6.2. Testuj Frame

1. Kliknij na link w cast
2. Sprawdź czy Frame się ładuje
3. Kliknij przyciski Frame

---

## 📝 KROK 7: Publikacja w BaseApp

### 7.1. Utwórz post

1. Otwórz BaseApp
2. Kliknij "Create Post"
3. Wpisz:
   ```
   🤝 Proof of Meeting - Verify real-world meetings with EAS on Base!
   
   [Wklej URL z Vercel]
   ```
4. Opublikuj

### 7.2. Testuj Frame

1. Kliknij na link w poście
2. Sprawdź czy Frame się ładuje
3. Kliknij przyciski Frame

---

## ✅ Gotowe!

**Aplikacja jest dostępna dla wszystkich!** 🚀

---

## 🔄 Aktualizacja kodu

**Jeśli chcesz zaktualizować:**

```zsh
cd ~/.cursor-tutor/proof-of-meeting
git add .
git commit -m "Opisz zmiany"
git push
```

**Vercel automatycznie wdroży nową wersję!** ✅

---

## 💡 Wskazówki dla zsh

- **Autouzupełnianie:** Naciśnij Tab - zsh podpowie komendy
- **Historia:** Strzałka w górę - przeglądaj poprzednie komendy
- **Ctrl + C** - zatrzymaj działającą komendę
- **Ctrl + D** - zamknij terminal

---

**Wszystkie komendy działają identycznie w zsh!** ✅

