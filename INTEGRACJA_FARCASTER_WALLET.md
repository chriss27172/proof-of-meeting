# 🔐 Integracja Portfela Farcaster - Dokumentacja

## ✅ Co zostało zaimplementowane

Zaktualizowano integrację z portfelem Farcaster zgodnie z oficjalną dokumentacją:
- [Farcaster Mini Apps SDK - Wallets](https://miniapps.farcaster.xyz/docs/guides/wallets)
- [EIP-1193: Ethereum Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193)
- [Quick Auth](https://miniapps.farcaster.xyz/docs/sdk/quick-auth)
- [Detecting Capabilities](https://miniapps.farcaster.xyz/docs/sdk/detecting-capabilities)
- [Is in Mini App](https://miniapps.farcaster.xyz/docs/sdk/is-in-mini-app)

---

## 🔧 Zmiany w kodzie

### 1. **Hook `useFarcasterWallet`** (`src/hooks/useFarcasterWallet.ts`)

**Nowe funkcje:**
- ✅ Wykrywanie czy jesteśmy w Mini App (`sdk.isInMiniApp()`)
- ✅ Sprawdzanie capabilities portfela (`sdk.getCapabilities()`)
- ✅ Używanie portfela Ethereum przez `sdk.wallet.getEthereumProvider()`
- ✅ Portfel implementuje EIP-1193, więc działa jako standardowy provider
- ✅ Automatyczny fallback do `window.ethereum` jeśli nie jesteśmy w Mini App

**Nowe właściwości w interfejsie:**
```typescript
interface FarcasterWallet {
  address: string;
  walletClient: WalletClient | null;
  isFarcasterWallet: boolean;
  isInMiniApp: boolean;        // NOWE: czy jesteśmy w Mini App
  hasEthereumWallet: boolean;  // NOWE: czy portfel Ethereum jest dostępny
  loading: boolean;
  error: string | null;
}
```

### 2. **Hook `useQuickAuth`** (`src/hooks/useQuickAuth.ts`) - NOWY

Hook do autentykacji użytkownika przez Quick Auth:
- ✅ Pobiera token Quick Auth (`sdk.quickAuth.getToken()`)
- ✅ Wykonuje autentykowane requesty (`sdk.quickAuth.fetch()`)
- ✅ Automatycznie dodaje token do `Authorization` header

**Użycie:**
```typescript
const { token, authenticatedFetch } = useQuickAuth();

// Wykonaj autentykowany request
const response = await authenticatedFetch('/api/user/me');
```

---

## 📋 Jak to działa

### Wykrywanie portfela

1. **Sprawdzenie czy jesteśmy w Mini App:**
   ```typescript
   const isInMiniApp = await sdk.isInMiniApp();
   ```

2. **Sprawdzenie capabilities:**
   ```typescript
   const capabilities = await sdk.getCapabilities();
   const hasEthereumWallet = capabilities?.includes('wallet.getEthereumProvider');
   ```

3. **Pobranie providera Ethereum:**
   ```typescript
   const ethereumProvider = await sdk.wallet.getEthereumProvider();
   ```

4. **Utworzenie wallet client:**
   ```typescript
   const walletClient = createWalletClient({
     chain: base,
     transport: custom(ethereumProvider), // EIP-1193 provider
   });
   ```

### Wykonywanie transakcji

Portfel Farcaster implementuje EIP-1193, więc działa jak standardowy provider:

```typescript
// Pobierz adres
const accounts = await ethereumProvider.request({ 
  method: 'eth_accounts' 
});

// Wyślij transakcję
const hash = await walletClient.sendTransaction({
  to: '0x...',
  value: parseEther('0.001'),
});
```

---

## 🎯 Korzyści

### ✅ Zgodność z dokumentacją
- Używamy oficjalnego API zgodnie z dokumentacją Farcaster
- Portfel implementuje standard EIP-1193
- Wszystkie funkcje są zgodne z best practices

### ✅ Lepsze UX
- Automatyczne wykrywanie portfela w Mini App
- Nie trzeba ręcznie łączyć portfela - jest już dostępny
- Płynne przejście między Mini App a przeglądarką

### ✅ Bezpieczeństwo
- Quick Auth zapewnia bezpieczną autentykację
- Token jest automatycznie dodawany do requestów
- Weryfikacja tokena na backendzie (wymaga `@farcaster/quick-auth`)

---

## 🔄 Komponenty używające portfela

Wszystkie komponenty już używają hooka `useFarcasterWallet`, więc automatycznie korzystają z nowej implementacji:

- ✅ `src/app/meeting/[id]/mint/page.tsx` - Mintowanie EAS attestations
- ✅ `src/components/BuyMeCoffee.tsx` - Wysyłanie darowizn

**Nie wymagają żadnych zmian!** Hook automatycznie wykrywa portfel Farcaster i używa go jeśli jest dostępny.

---

## 🚀 Quick Auth na backendzie (opcjonalne)

Jeśli chcesz używać Quick Auth do autentykacji na backendzie:

1. **Zainstaluj bibliotekę:**
   ```bash
   npm install @farcaster/quick-auth
   ```

2. **Zweryfikuj token:**
   ```typescript
   import { createClient } from '@farcaster/quick-auth';

   const client = createClient();

   // W middleware lub route handler
   const authorization = req.headers.get('Authorization');
   if (!authorization?.startsWith('Bearer ')) {
     return new Response('Unauthorized', { status: 401 });
   }

   const payload = await client.verifyJwt({
     token: authorization.split(' ')[1],
     domain: process.env.NEXT_PUBLIC_BASE_URL,
   });

   // payload.sub zawiera FID użytkownika
   const fid = payload.sub;
   ```

Więcej informacji: https://miniapps.farcaster.xyz/docs/sdk/quick-auth

---

## 📝 Przykłady użycia

### Podstawowe użycie portfela

```typescript
import { useFarcasterWallet } from '@/hooks/useFarcasterWallet';

function MyComponent() {
  const { 
    address, 
    walletClient, 
    isFarcasterWallet, 
    isInMiniApp,
    hasEthereumWallet,
    connectWallet 
  } = useFarcasterWallet();

  if (!isInMiniApp) {
    return <div>Otwórz w Farcaster Mini App</div>;
  }

  if (!hasEthereumWallet) {
    return <div>Portfel Ethereum nie jest dostępny</div>;
  }

  if (!address) {
    return <button onClick={connectWallet}>Połącz portfel</button>;
  }

  return <div>Portfel: {address}</div>;
}
```

### Wykonywanie transakcji

```typescript
const handleSendTransaction = async () => {
  if (!walletClient) return;

  const hash = await walletClient.sendTransaction({
    to: '0x...',
    value: parseEther('0.001'),
  });

  console.log('Transaction hash:', hash);
};
```

### Używanie Quick Auth

```typescript
import { useQuickAuth } from '@/hooks/useQuickAuth';

function MyComponent() {
  const { token, authenticatedFetch, loading } = useQuickAuth();

  const fetchUserData = async () => {
    const response = await authenticatedFetch('/api/user/me');
    const data = await response.json();
    console.log('User data:', data);
  };

  return <button onClick={fetchUserData}>Pobierz dane</button>;
}
```

---

## ✅ Checklist

- [x] Zaktualizowano `useFarcasterWallet` zgodnie z dokumentacją
- [x] Dodano wykrywanie czy jesteśmy w Mini App
- [x] Dodano sprawdzanie capabilities portfela
- [x] Używamy `sdk.wallet.getEthereumProvider()` zamiast nieistniejących metod
- [x] Portfel implementuje EIP-1193
- [x] Dodano hook `useQuickAuth` dla autentykacji
- [x] Komponenty automatycznie korzystają z nowej implementacji
- [ ] (Opcjonalne) Dodano weryfikację Quick Auth na backendzie

---

## 🎉 Gotowe!

Portfel Farcaster jest teraz w pełni zintegrowany zgodnie z oficjalną dokumentacją. Użytkownicy mogą:
- ✅ Automatycznie używać portfela w Mini App
- ✅ Wykonywać transakcje bezpośrednio z aplikacji
- ✅ Autentykować się przez Quick Auth
- ✅ Korzystać z fallback do `window.ethereum` w przeglądarce

---

**Dokumentacja:**
- [Farcaster Mini Apps - Wallets](https://miniapps.farcaster.xyz/docs/guides/wallets)
- [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)
- [Quick Auth](https://miniapps.farcaster.xyz/docs/sdk/quick-auth)
- [Detecting Capabilities](https://miniapps.farcaster.xyz/docs/sdk/detecting-capabilities)
- [Is in Mini App](https://miniapps.farcaster.xyz/docs/sdk/is-in-mini-app)

