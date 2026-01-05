# 📝 Instrukcja Integracji Sign In with Farcaster (AuthKit)

## 🎯 Cel

Dodanie opcji logowania przez **Sign In with Farcaster** (AuthKit) dla użytkowników, którzy nie są w Farcaster Mini App. W Mini App użytkownik jest automatycznie rozpoznawany przez `sdk.context.user`.

## 📋 Wymagania

- Node.js 24.x
- npm lub yarn
- Konto Farcaster
- Optimism RPC URL (AuthKit wymaga Optimism, nie Base)

## 🔧 Instalacja

### 1. Zainstaluj zależności

```zsh
cd /Users/chrissulenta/Documents/GitHub/proof-of-meeting
npm install @farcaster/auth-kit viem
```

**Uwaga:** `viem` jest już zainstalowany, ale `@farcaster/auth-kit` wymaga go jako peer dependency.

### 2. Skonfiguruj zmienne środowiskowe

Dodaj do `.env.local`:

```zsh
# Optimism RPC URL (wymagane dla AuthKit)
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io

# Base URL aplikacji (już powinien być ustawiony)
NEXT_PUBLIC_BASE_URL=https://proof-of-meeting.vercel.app
```

### 3. Uruchom migrację bazy danych (jeśli potrzebne)

```zsh
npm run postinstall
```

## 🏗️ Architektura

### Komponenty

1. **`AuthKitProvider`** (`src/components/AuthKitProvider.tsx`)
   - Provider dla AuthKit
   - Konfiguruje domain, siweUri, rpcUrl, relay

2. **`FarcasterSignIn`** (`src/components/FarcasterSignIn.tsx`)
   - Komponent z przyciskiem "Sign In with Farcaster"
   - Wyświetla się tylko poza Mini App
   - Ukrywa się gdy użytkownik jest zalogowany

3. **`useFarcasterUser`** (zaktualizowany)
   - Najpierw próbuje pobrać użytkownika z Mini App SDK (`sdk.context.user`)
   - Jeśli nie jesteśmy w Mini App, używa AuthKit (`useProfile`)

### Endpointy API

1. **`/api/auth/signin`** (`src/app/api/auth/signin/route.ts`)
   - Weryfikuje Sign In message
   - Tworzy/aktualizuje użytkownika w bazie danych
   - Zwraca dane użytkownika

## 🔄 Przepływ Logowania

### W Mini App (Farcaster/BaseApp)
1. Użytkownik otwiera aplikację w Mini App
2. `sdk.context.user` automatycznie zawiera dane użytkownika
3. `useFarcasterUser` pobiera użytkownika z context
4. **Nie pokazuje się przycisk logowania**

### Poza Mini App (zwykła przeglądarka)
1. Użytkownik otwiera aplikację w przeglądarce
2. `sdk.isInMiniApp()` zwraca `false`
3. `useFarcasterUser` nie znajduje użytkownika w context
4. **Pokazuje się przycisk "Sign In with Farcaster"**
5. Użytkownik klika przycisk → skanuje QR kod → zatwierdza w Farcaster
6. AuthKit wysyła Sign In message do `/api/auth/signin`
7. Backend weryfikuje message i tworzy/aktualizuje użytkownika
8. `useProfile` hook automatycznie aktualizuje stan użytkownika

## 📚 Dokumentacja

- **Sign In with Farcaster:** https://docs.farcaster.xyz/developers/siwf/
- **AuthKit:** https://docs.farcaster.xyz/auth-kit/
- **AuthKit Installation:** https://docs.farcaster.xyz/auth-kit/installation
- **SignInButton:** https://docs.farcaster.xyz/auth-kit/sign-in-button
- **AuthKitProvider:** https://docs.farcaster.xyz/auth-kit/auth-kit-provider

## ✅ Testowanie

### 1. W Mini App
- Otwórz aplikację w Farcaster/BaseApp Mini App
- Użytkownik powinien być automatycznie rozpoznany
- **Nie powinien pokazywać się przycisk logowania**

### 2. Poza Mini App
- Otwórz aplikację w zwykłej przeglądarce
- Powinien pokazać się przycisk "Sign In with Farcaster"
- Kliknij przycisk → skanuj QR kod → zatwierdź w Farcaster
- Użytkownik powinien być zalogowany

## 🐛 Rozwiązywanie Problemów

### Problem: "Cannot find module '@farcaster/auth-kit'"
**Rozwiązanie:**
```zsh
npm install @farcaster/auth-kit viem
```

### Problem: "Invalid signature or message"
**Rozwiązanie:**
- Sprawdź czy `NEXT_PUBLIC_BASE_URL` jest poprawnie ustawiony
- Sprawdź czy domain w `AuthKitProvider` odpowiada rzeczywistemu domainowi

### Problem: Przycisk logowania nie pokazuje się
**Rozwiązanie:**
- Sprawdź czy jesteś poza Mini App (`sdk.isInMiniApp()` powinno zwracać `false`)
- Sprawdź czy użytkownik nie jest już zalogowany
- Sprawdź konsolę przeglądarki dla błędów

### Problem: Użytkownik nie jest rozpoznawany po zalogowaniu
**Rozwiązanie:**
- Sprawdź czy `/api/auth/signin` zwraca sukces
- Sprawdź czy `useProfile` hook jest poprawnie zintegrowany
- Sprawdź logi w konsoli przeglądarki

## 📝 Notatki

- AuthKit wymaga **Optimism RPC**, nie Base
- Sign In message jest weryfikowany na backendzie przez `verifySignInMessage`
- Użytkownik jest automatycznie tworzony/aktualizowany w bazie danych po zalogowaniu
- QR kod jest automatycznie generowany dla nowych użytkowników

## 🎉 Gotowe!

Po wykonaniu tych kroków, aplikacja będzie obsługiwać logowanie przez:
1. **Mini App SDK** (automatyczne w Mini App)
2. **AuthKit** (Sign In with Farcaster w przeglądarce)

---

**Data utworzenia:** 2025-01-XX
**Wersja:** 1.0.0

