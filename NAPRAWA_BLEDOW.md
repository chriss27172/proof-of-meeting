# 🔧 Naprawa błędów instalacji

## Problem: Konflikt wersji React

Błąd występował, ponieważ `react-qr-reader` wymaga React 16, a aplikacja używa React 18.

## ✅ Rozwiązanie

Zastąpiłem `react-qr-reader` biblioteką `html5-qrcode`, która:
- ✅ Wspiera React 18
- ✅ Jest nowoczesna i aktywna
- ✅ Ma lepszą wydajność

## 📝 Jak zainstalować (krok po kroku)

### Krok 1: Przejdź do folderu projektu

W Terminalu wpisz:

```bash
cd ~/.cursor-tutor/proof-of-meeting
```

### Krok 2: Usuń stare pliki (jeśli istnieją)

```bash
rm -rf node_modules package-lock.json
```

### Krok 3: Zainstaluj zależności

**Opcja A (zalecana):**
```bash
npm install --legacy-peer-deps
```

**Opcja B (jeśli Opcja A nie działa):**
```bash
npm install --force
```

**Opcja C (jeśli masz problemy z uprawnieniami):**
```bash
sudo npm install --legacy-peer-deps
```

### Krok 4: Sprawdź czy instalacja się powiodła

Powinieneś zobaczyć:
```
added XXX packages
```

### Krok 5: Uruchom aplikację

```bash
npm run dev
```

---

## ✅ Co zostało zmienione

1. **package.json:**
   - ❌ Usunięto: `react-qr-reader@^2.2.1`
   - ✅ Dodano: `html5-qrcode@^2.3.8`

2. **src/app/scan/page.tsx:**
   - Zaktualizowano kod skanera QR
   - Teraz używa `html5-qrcode` zamiast `react-qr-reader`
   - Dodano pełną funkcjonalność skanowania z kamerą

---

## 🎯 Nowe funkcje skanera

- ✅ Skanowanie QR kodu przez kamerę w przeglądarce
- ✅ Automatyczne wykrywanie QR kodów
- ✅ Możliwość zatrzymania skanera
- ✅ Obsługa błędów i uprawnień kamery

---

## ❓ Jeśli nadal masz problemy

### Problem: "EPERM: operation not permitted"

**Rozwiązanie:**
```bash
sudo npm install --legacy-peer-deps
```

### Problem: "Cannot find module 'html5-qrcode'"

**Rozwiązanie:**
```bash
npm install html5-qrcode --legacy-peer-deps
```

### Problem: "Port 3000 is already in use"

**Rozwiązanie:**
```bash
npm run dev -- -p 3001
```

---

## 🎉 Po udanej instalacji

1. Uruchom aplikację: `npm run dev`
2. Otwórz w przeglądarce: `http://localhost:3000`
3. Przetestuj skaner QR: `/scan`

Wszystko powinno działać! 🚀

