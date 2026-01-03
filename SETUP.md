# 🚀 Instrukcja konfiguracji Proof of Meeting

## Krok 1: Przejdź do katalogu projektu

```bash
cd proof-of-meeting
```

## Krok 2: Zainstaluj zależności

```bash
npm install
```

## Krok 3: Skonfiguruj bazę danych

### Opcja A: Lokalna baza PostgreSQL

1. Zainstaluj PostgreSQL (jeśli nie masz):
   - macOS: `brew install postgresql@14`
   - Linux: `sudo apt-get install postgresql`
   - Windows: Pobierz z [postgresql.org](https://www.postgresql.org/download/)

2. Utwórz bazę danych:
   ```bash
   createdb proof_of_meeting
   ```

3. Ustaw zmienną środowiskową w pliku `.env`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/proof_of_meeting"
   ```

### Opcja B: Baza w chmurze (np. Supabase, Neon, Railway)

1. Utwórz konto na jednej z platform:
   - [Supabase](https://supabase.com) - darmowy tier dostępny
   - [Neon](https://neon.tech) - darmowy tier dostępny
   - [Railway](https://railway.app) - darmowy tier dostępny

2. Skopiuj connection string i ustaw w `.env`:
   ```
   DATABASE_URL="postgresql://user:pass@host:5432/dbname"
   ```

## Krok 4: Utwórz plik .env

Utwórz plik `.env` w katalogu `proof-of-meeting`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/proof_of_meeting"

# Application URL (dla developmentu użyj localhost)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Base Network RPC (opcjonalne, domyślnie używa mainnet)
BASE_RPC_URL="https://mainnet.base.org"
```

## Krok 5: Zainicjalizuj bazę danych

```bash
npx prisma db push
```

To utworzy wszystkie tabele w bazie danych zgodnie ze schematem Prisma.

## Krok 6: Uruchom aplikację w trybie deweloperskim

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: **http://localhost:3000**

## Krok 7: Przetestuj aplikację

1. Otwórz przeglądarkę i przejdź do `http://localhost:3000`
2. Zobaczysz stronę główną z informacjami o aplikacji
3. Aby użyć Frame w Farcaster/BaseApp, udostępnij link do Frame:
   ```
   http://localhost:3000
   ```

## 🔧 Rozwiązywanie problemów

### Problem: Błąd połączenia z bazą danych

**Rozwiązanie:**
- Sprawdź czy PostgreSQL jest uruchomiony: `pg_isready`
- Sprawdź czy connection string w `.env` jest poprawny
- Upewnij się, że baza danych istnieje

### Problem: Błąd "Prisma Client not generated"

**Rozwiązanie:**
```bash
npx prisma generate
```

### Problem: Port 3000 jest zajęty

**Rozwiązanie:**
Uruchom na innym porcie:
```bash
npm run dev -- -p 3001
```

## 📝 Następne kroki po uruchomieniu

1. **Przetestuj Frame w Farcaster/BaseApp:**
   - Udostępnij link do aplikacji w cast/post
   - Kliknij w Frame i przetestuj funkcjonalności

2. **Skonfiguruj produkcję:**
   - Zmień `NEXT_PUBLIC_BASE_URL` na URL produkcji
   - Skonfiguruj bazę danych produkcyjną
   - Wdróż na Vercel/inną platformę

3. **Skonfiguruj EAS (opcjonalne):**
   - Zarejestruj schemat w EAS Schema Registry
   - Zaktualizuj `EAS_CONTRACT_ADDRESS` w `src/lib/eas.ts`
   - Zaimplementuj pełną integrację z EAS SDK

## 🎉 Gotowe!

Aplikacja powinna teraz działać. Jeśli masz problemy, sprawdź logi w konsoli lub otwórz issue.

