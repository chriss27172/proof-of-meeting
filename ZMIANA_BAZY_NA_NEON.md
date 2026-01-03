# 🚀 Zmiana bazy danych na Neon (PostgreSQL)

## ✅ Dlaczego Neon?

- **Prostszy setup** - nie ma problemów z connection pooling
- **Darmowy** dla developmentu
- **Szybszy** - lepsza wydajność
- **Prostszy connection string** - mniej problemów

## 📝 Krok po kroku - Setup Neon

### Krok 1: Załóż konto w Neon

1. **Otwórz przeglądarkę:**
   - Idź na: https://neon.tech
   - Kliknij **"Sign Up"** (lub "Get Started")

2. **Zaloguj się:**
   - Możesz użyć GitHub, Google, lub email
   - Wybierz najwygodniejszą opcję

### Krok 2: Utwórz nowy projekt

1. **Po zalogowaniu:**
   - Kliknij **"Create a project"**
   - Wpisz nazwę projektu: `proof-of-meeting`
   - Wybierz region (najbliższy Tobie, np. "Europe (Frankfurt)")
   - Kliknij **"Create project"**

2. **Poczekaj 1-2 minuty** aż projekt się utworzy

### Krok 3: Skopiuj Connection String

1. **Po utworzeniu projektu:**
   - Zobaczysz ekran z connection stringiem
   - **Skopiuj connection string** (przycisk "Copy")
   - Wygląda mniej więcej tak:
     ```
     postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
     ```

2. **LUB jeśli nie widzisz connection stringu:**
   - W panelu Neon kliknij **"Connection Details"**
   - Skopiuj connection string

### Krok 4: Zaktualizuj plik .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na connection string z Neon:**

```
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**WAŻNE:**
- Wklej **dokładnie** connection string z Neon
- Nie zmieniaj niczego!

**Zapisz:** Cmd + S

### Krok 5: Zaktualizuj bazę danych

```bash
npx prisma db push
```

**To powinno działać!** ✅

## 🔍 Jeśli masz problemy

### Problem: "Connection string not found"

**Rozwiązanie:**
1. W Neon: Dashboard → Twój projekt
2. Kliknij **"Connection Details"**
3. Skopiuj connection string
4. Wklej do `.env`

### Problem: "SSL required"

**Rozwiązanie:**
- Connection string z Neon już zawiera `?sslmode=require`
- Upewnij się że masz pełny connection string

## ✅ Alternatywy (jeśli Neon nie działa)

### Opcja 2: Railway (PostgreSQL)

1. Idź na: https://railway.app
2. Sign up (GitHub)
3. New Project → PostgreSQL
4. Skopiuj connection string
5. Wklej do `.env`

### Opcja 3: Vercel Postgres

1. Idź na: https://vercel.com
2. Sign up
3. Storage → Create Database → Postgres
4. Skopiuj connection string
5. Wklej do `.env`

---

## 🎯 Moja rekomendacja

**Zacznij od Neon** - jest najprostszy i najszybszy w setupie!

---

**Załóż konto w Neon i skopiuj connection string!** 🚀

