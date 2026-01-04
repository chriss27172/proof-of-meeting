# 🔧 Naprawa błędu kompilacji Next.js

## ❌ Problem:

```
Module parse failed: Unexpected token (1:4)
You may need an appropriate loader to handle this file type
./node_modules/@libsql/hrana-client/node_modules/node-fetch/LICENSE.md
```

**Przyczyna:** Next.js próbuje przetworzyć plik `.md` (LICENSE.md) z biblioteki `@libsql/hrana-client` jako moduł JavaScript.

## ✅ Rozwiązanie:

Zaktualizowano `next.config.js` aby ignorować pliki `.md` z `node_modules`.

### Zmiany w `next.config.js`:

```javascript
webpack: (config, { isServer }) => {
  // Ignore .md files from node_modules
  config.module.rules.push({
    test: /\.md$/,
    include: /node_modules/,
    type: 'asset/source',
  });

  // Ignore LICENSE files
  config.module.rules.push({
    test: /LICENSE$/,
    type: 'asset/source',
  });

  return config;
},
```

## 🔄 Co zrobić:

1. **Usuń cache Next.js:**
   ```zsh
   cd ~/.cursor-tutor/proof-of-meeting
   rm -rf .next
   ```

2. **Uruchom ponownie aplikację:**
   ```zsh
   npm run dev
   ```

3. **Jeśli nadal nie działa, zreinstaluj zależności:**
   ```zsh
   rm -rf node_modules package-lock.json
   npm install
   ```

## ✅ Po naprawie:

Aplikacja powinna się kompilować bez błędów!

---

**Błąd został naprawiony w `next.config.js`!** ✅

