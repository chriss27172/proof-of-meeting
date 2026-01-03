# 🔧 Naprawa błędu next.config.ts

## Problem

Next.js 14 nie wspiera plików konfiguracyjnych w TypeScript (`.ts`). Wymaga `.js` lub `.mjs`.

## ✅ Rozwiązanie

Zmieniono `next.config.ts` na `next.config.js`.

## 📝 Co zostało zrobione

1. ✅ Utworzono `next.config.js` (zawiera tę samą konfigurację)
2. ✅ Usunięto `next.config.ts`

## 🚀 Teraz możesz uruchomić

```bash
npm run dev
```

Aplikacja powinna teraz działać bez błędów!

