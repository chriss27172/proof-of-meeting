# 🚂 Konfiguracja Railway PostgreSQL - TERAZ

## ✅ Connection String zapisany!

**Connection String:**
```
postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway
```

**Password:**
```
AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF
```

---

## 📝 Krok po kroku

### Krok 1: Zaktualizuj .env

**Otwórz plik .env:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
open -a TextEdit .env
```

**Wklej:**
```
DATABASE_URL="postgresql://postgres:AQHGIyxOllIvfVDGgoVnWgHbTpOSUjpF@shortline.proxy.rlwy.net:47508/railway"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**Zapisz:** Cmd + S

### Krok 2: Wygeneruj Prisma Client

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
npx prisma generate
```

**Poczekaj** aż zobaczysz: `✔ Generated Prisma Client` ✅

### Krok 3: Utwórz tabele w Railway

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

**To utworzy wszystkie tabele w Railway PostgreSQL!**

### Krok 4: Przetestuj

**W Terminalu:**
```bash
npm run dev
```

**Jeśli wszystko działa, zobaczysz:**
```
Ready - started server on 0.0.0.0:3000
```

---

## ✅ Gotowe!

Aplikacja powinna teraz działać z Railway PostgreSQL dla wszystkich użytkowników! 🚀

---

**Zaktualizuj .env i uruchom `npx prisma generate` oraz `npx prisma db push`!** 🚂

