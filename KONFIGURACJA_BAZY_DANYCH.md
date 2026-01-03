# 🗄️ Konfiguracja bazy danych

## ✅ Obecna konfiguracja

- **Provider:** SQLite
- **Plik:** `dev.db` (lokalny)
- **Status:** Wymaga utworzenia bazy danych

## 🔧 Krok po kroku - Konfiguracja

### Krok 1: Utwórz bazę danych i tabele

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
npx prisma db push
```

**To utworzy:**
- Plik `dev.db` (jeśli nie istnieje)
- Wszystkie tabele zgodnie ze schematem
- Indeksy i relacje

### Krok 2: Wygeneruj Prisma Client

**W Terminalu:**
```bash
npx prisma generate
```

**To wygeneruje:**
- Prisma Client z typami TypeScript
- Funkcje do pracy z bazą danych

### Krok 3: Sprawdź czy działa

**W Terminalu:**
```bash
npx prisma studio
```

**To otworzy:**
- Prisma Studio - interfejs graficzny do przeglądania bazy danych
- Dostęp na: http://localhost:5555

---

## 📋 Struktura bazy danych

### Tabele:

1. **User** - Profile użytkowników
   - FID (Farcaster ID)
   - Username, displayName, avatarUrl
   - QR Code, NFC Tag
   - Reputation metrics

2. **Meeting** - Spotkania między użytkownikami
   - Initiator i Participant
   - Status (pending, confirmed, completed)
   - Verification method (QR/NFC)
   - EAS Attestation reference

3. **Attestation** - EAS atestacje
   - UID atestacji
   - Schema, recipient, attester
   - Transaction hash

4. **Reputation** - Oceny reputacji
   - Score (1-5)
   - Notes
   - Reference do meeting

---

## 🔍 Sprawdzenie konfiguracji

### Sprawdź plik .env:
```bash
cat .env | grep DATABASE_URL
```

**Powinno być:**
```
DATABASE_URL="file:./dev.db"
```

### Sprawdź czy baza istnieje:
```bash
ls -la dev.db
```

**Jeśli plik nie istnieje:**
```bash
npx prisma db push
```

---

## ⚙️ Optymalizacja

### Dla produkcji:

1. **Wyłącz logowanie zapytań:**
   - W `src/lib/prisma.ts` zmień `log: ['query']` na `log: []`

2. **Użyj connection pooling:**
   - Dla PostgreSQL: użyj connection pooling
   - Dla SQLite: nie potrzebne (lokalny plik)

3. **Backup:**
   - Regularnie kopiuj plik `dev.db`
   - Dla produkcji: użyj automatycznych backupów

---

## ✅ Gotowe!

Po wykonaniu `npx prisma db push`, baza danych będzie gotowa do użycia!

