# 🧪 Testowanie aplikacji lokalnie

## ✅ Serwer uruchomiony!

Aplikacja powinna działać na: **http://localhost:3000**

---

## 📋 Co przetestować:

### 1. Strona główna
- **URL:** http://localhost:3000
- **Sprawdź:**
  - ✅ Strona się ładuje
  - ✅ Widzisz sekcję "Quick Actions"
  - ✅ Przyciski są widoczne:
    - Scan QR/NFC (zielony)
    - Generate QR Code (pomarańczowy)
    - Leaderboard (niebieski)
    - Browse Profiles (fioletowy)
    - My Meetings (indygo)

### 2. Generate QR Code
- **URL:** http://localhost:3000/generate-qr
- **Sprawdź:**
  - ✅ Formularz się ładuje
  - ✅ Możesz wpisać FID
  - ✅ Po kliknięciu "Generate QR Code" widzisz QR code

### 3. Scan QR/NFC
- **URL:** http://localhost:3000/scan
- **Sprawdź:**
  - ✅ Strona skanera się ładuje
  - ✅ Możesz wybrać QR lub NFC
  - ✅ Przycisk "Start Scanner" działa

### 4. Leaderboard
- **URL:** http://localhost:3000/leaderboard
- **Sprawdź:**
  - ✅ Strona się ładuje (może być pusta jeśli nie ma użytkowników)

### 5. Browse Profiles
- **URL:** http://localhost:3000/profiles
- **Sprawdź:**
  - ✅ Strona się ładuje (może być pusta jeśli nie ma użytkowników)

### 6. My Meetings
- **URL:** http://localhost:3000/meetings
- **Sprawdź:**
  - ✅ Strona się ładuje (może być pusta jeśli nie ma spotkań)

---

## 🔍 Testowanie funkcjonalności:

### Test 1: Generowanie QR Code
1. Otwórz: http://localhost:3000/generate-qr
2. Wpisz dowolny FID (np. `123`)
3. Kliknij "Generate QR Code"
4. **Oczekiwany wynik:** Widzisz QR code dla FID 123

### Test 2: Skanowanie QR Code
1. Otwórz: http://localhost:3000/scan
2. Kliknij "Start Scanner"
3. **Oczekiwany wynik:** Kamera się uruchamia (lub prosi o pozwolenie)

### Test 3: Frame (wymaga Farcaster/BaseApp)
1. Otwórz aplikację w Farcaster lub BaseApp
2. Sprawdź czy Frame się ładuje
3. Kliknij przyciski:
   - "My Profile"
   - "Show QR/NFC"
   - "Scan QR/NFC"
   - "Leaderboard"

---

## ⚠️ Sprawdzanie błędów:

### W Terminalu:
- Sprawdź czy nie ma błędów kompilacji
- Sprawdź czy nie ma błędów połączenia z bazą danych

### W przeglądarce:
- Otwórz **Developer Tools** (F12)
- Sprawdź zakładkę **Console** - czy nie ma błędów JavaScript
- Sprawdź zakładkę **Network** - czy wszystkie requesty się ładują

---

## 🐛 Częste problemy:

### Problem: "Cannot connect to database"
**Rozwiązanie:** Sprawdź czy `.env` ma poprawny `DATABASE_URL` z Railway

### Problem: "EAS_SCHEMA_UID not found"
**Rozwiązanie:** Sprawdź czy `.env` ma `EAS_SCHEMA_UID` i `NEXT_PUBLIC_EAS_SCHEMA_UID`

### Problem: Strona się nie ładuje
**Rozwiązanie:** 
- Sprawdź czy serwer działa: `npm run dev`
- Sprawdź czy port 3000 jest wolny
- Sprawdź logi w Terminalu

---

## ✅ Checklist testowania:

- [ ] Strona główna się ładuje
- [ ] Przyciski "Quick Actions" działają
- [ ] Generate QR Code działa
- [ ] Scan QR/NFC działa
- [ ] Leaderboard się ładuje
- [ ] Browse Profiles się ładuje
- [ ] My Meetings się ładuje
- [ ] Nie ma błędów w konsoli przeglądarki
- [ ] Nie ma błędów w Terminalu

---

**Otwórz http://localhost:3000 w przeglądarce i przetestuj wszystkie funkcje!** 🚀

