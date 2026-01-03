# 📝 Instrukcja konfiguracji EAS na Base

## ✅ Status funkcji

1. **QR Code** - ✅ Działa poprawnie
2. **NFC** - ⚠️ Działa tylko na Chrome Android (wymaga HTTPS)
3. **EAS Attestation** - 🔄 Wymaga rejestracji schematu

## 🔧 Konfiguracja EAS

### Krok 1: Zarejestruj schemat EAS

Przed użyciem EAS, musisz zarejestrować schemat. Możesz to zrobić:

**Opcja A: Przez EAS Explorer**
1. Idź na: https://base.easscan.org
2. Kliknij "Register Schema"
3. Wklej schemat:
   ```
   string meetingId,string initiatorFid,string participantFid,string initiatorUsername,string participantUsername,string location,uint256 timestamp,string verificationMethod
   ```
4. Skopiuj Schema UID

**Opcja B: Przez kod (wymaga wallet)**
1. Użyj funkcji `getOrRegisterSchema()` w kodzie
2. Po rejestracji, skopiuj Schema UID

### Krok 2: Dodaj Schema UID do .env

```bash
EAS_SCHEMA_UID="0x..." # Schema UID z rejestracji
```

### Krok 3: Przetestuj

Po dodaniu Schema UID, EAS attestation będzie działać z prawdziwymi kontraktami.

---

## 📋 Adresy kontraktów

- **EAS Contract:** `0x4200000000000000000000000000000000000021`
- **Schema Registry:** `0x4200000000000000000000000000000000000020`
- **Base Network:** Chain ID 8453

---

## ⚠️ Uwagi

- **QR Code** działa od razu - nie wymaga konfiguracji
- **NFC** działa tylko na Chrome Android z HTTPS
- **EAS** wymaga rejestracji schematu przed użyciem

---

**Zarejestruj schemat EAS i dodaj Schema UID do .env!** 🚀

