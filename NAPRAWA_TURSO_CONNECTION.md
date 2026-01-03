# 🔧 Naprawa: Turso connection string validation

## ❌ Problem

Prisma schema validation wymaga `file:` dla SQLite, ale Turso używa `libsql://`.

## ✅ Rozwiązanie

Musimy użyć `driverAdapters` preview feature w schema.prisma (mimo że jest deprecated, jest potrzebne dla Turso).

---

## 📝 Krok po kroku

### Krok 1: Zaktualizuj schema.prisma

**Otwórz plik:**
```bash
open -a TextEdit prisma/schema.prisma
```

**Upewnij się że generator ma `previewFeatures`:**
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
}
```

**Zapisz:** Cmd + S

### Krok 2: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

**Poczekaj** aż zobaczysz: `✔ Generated Prisma Client` ✅

### Krok 3: Utwórz tabele w Turso

**W Terminalu:**
```bash
npx prisma db push
```

**Poczekaj** aż zobaczysz: `Your database is now in sync` ✅

---

## ✅ Status

- ✅ `schema.prisma` - ma `previewFeatures = ["driverAdapters"]`
- ✅ `prisma.ts` - ma adapter dla Turso
- ✅ `.env` - ma connection string z Turso

---

**Uruchom `npx prisma generate` i `npx prisma db push`!** 🚀

