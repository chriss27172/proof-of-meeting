# 🎫 Konfiguracja EAS Mint - Instrukcja

## ✅ Co zostało zaimplementowane:

1. **Strona mintowania** - `/meeting/[id]/mint` z wallet connection
2. **Endpoint API** - `/api/meeting/[id]/mint` obsługujący mintowanie
3. **Integracja z EAS** - bezpośrednie wywołanie EAS contract z frontendu
4. **Wallet connection** - MetaMask/Coinbase Wallet support

---

## 📝 Co trzeba skonfigurować:

### Krok 1: Dodaj NEXT_PUBLIC_EAS_SCHEMA_UID do .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Dodaj linię:**
```
NEXT_PUBLIC_EAS_SCHEMA_UID="0xbf382d7f92129925727119be76957b586211e704f6689bf8c5588cd034885318"
```

**WAŻNE:** To musi być ten sam Schema UID co `EAS_SCHEMA_UID`, ale z prefiksem `NEXT_PUBLIC_` żeby było dostępne w przeglądarce!

**Zapisz:** Cmd + S

---

## 🔄 Jak to działa:

### Przepływ mintowania:

1. **Użytkownik skanuje QR/NFC**
   - System tworzy dwa wzajemne spotkania (oba `confirmed`)

2. **Użytkownik klika "Mint Attestation"**
   - Przekierowanie do `/meeting/[id]/mint`

3. **Strona mintowania:**
   - Pokazuje szczegóły spotkania
   - Prosi o połączenie wallet (MetaMask/Coinbase Wallet)
   - Przełącza na Base network

4. **Mintowanie:**
   - Frontend wywołuje EAS contract bezpośrednio
   - Użytkownik podpisuje transakcję w wallet
   - Transakcja jest wysyłana na Base network

5. **Zapisanie:**
   - Backend zapisuje attestation UID w bazie danych
   - Spotkanie jest oznaczone jako `completed`
   - Reputacja jest aktualizowana

---

## 🎯 Funkcje:

### ✅ Automatyczne mintowanie dla wzajemnych spotkań:
- Oba spotkania mogą być zmintowane osobno
- Każde spotkanie ma swój własny EAS attestation
- Reputacja jest aktualizowana dla obu użytkowników

### ✅ Wallet connection:
- MetaMask support
- Coinbase Wallet support
- Automatyczne przełączanie na Base network

### ✅ Bezpieczeństwo:
- Weryfikacja, że wallet address pasuje do uczestników spotkania
- Sprawdzanie czy spotkanie już ma attestation

---

## 🚀 Gotowe!

**Po dodaniu `NEXT_PUBLIC_EAS_SCHEMA_UID` do .env, mintowanie EAS attestations będzie działać!**

**Użytkownicy będą mogli:**
1. Skanować QR/NFC
2. Automatycznie tworzyć wzajemne spotkania
3. Mintować EAS attestations przez wallet connection
4. Widzieć swoje attestations na BaseScan

---

**Dodaj `NEXT_PUBLIC_EAS_SCHEMA_UID` do .env i przetestuj!** 🎫

