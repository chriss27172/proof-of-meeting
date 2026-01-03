# ⚡ Szybka Instrukcja Wdrożenia - TL;DR

## 🎯 Najważniejsze kroki:

### 1. GitHub
- Załóż konto: https://github.com
- Utwórz repozytorium: "New repository" → nazwa: `proof-of-meeting` → Public
- W Terminalu:
```bash
cd ~/.cursor-tutor/proof-of-meeting
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TWOJA-NAZWA/proof-of-meeting.git
git push -u origin main
```

### 2. Vercel
- Załóż konto: https://vercel.com → "Continue with GitHub"
- "Add New Project" → Import `proof-of-meeting`
- Dodaj Environment Variables:
  - `DATABASE_URL` = connection string z Railway
  - `NEXT_PUBLIC_BASE_URL` = URL z Vercel (po wdrożeniu)
  - `BASE_RPC_URL` = `https://mainnet.base.org`
  - `EAS_SCHEMA_UID` = `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
  - `NEXT_PUBLIC_EAS_SCHEMA_UID` = `0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318`
- Kliknij "Deploy"
- Skopiuj URL (np. `https://proof-of-meeting-xyz.vercel.app`)
- Wróć do Environment Variables → zaktualizuj `NEXT_PUBLIC_BASE_URL` na URL z Vercel
- Redeploy

### 3. Railway (już masz!)
- Baza danych już działa ✅
- Utwórz tabele:
```bash
npx prisma db push
```

### 4. Testuj!
- Otwórz URL z Vercel
- Sprawdź czy działa
- Opublikuj link w Farcaster/BaseApp
- Testuj Frame!

---

**Szczegółowa instrukcja:** `WDROZENIE_PRODUKCJA.md`

