'use client';

import { useState, useEffect } from 'react';
import { createWalletClient, custom, type WalletClient } from 'viem';
import { base } from 'viem/chains';

export interface FarcasterWallet {
  address: string;
  walletClient: WalletClient | null;
  isFarcasterWallet: boolean;
  isInMiniApp: boolean;
  hasEthereumWallet: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Hook do wykrywania i używania portfela Farcaster w miniapp
 * Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/guides/wallets
 * Portfel implementuje EIP-1193: https://eips.ethereum.org/EIPS/eip-1193
 */
export function useFarcasterWallet() {
  const [wallet, setWallet] = useState<FarcasterWallet>({
    address: '',
    walletClient: null,
    isFarcasterWallet: false,
    isInMiniApp: false,
    hasEthereumWallet: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const detectWallet = async () => {
      try {
        // Import SDK
        const { sdk } = await import('@farcaster/miniapp-sdk');
        
        console.log('🔍 Checking Farcaster Mini App capabilities...');
        
        // Sprawdź czy jesteśmy w Mini App
        // https://miniapps.farcaster.xyz/docs/sdk/is-in-mini-app
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('📍 Is in Mini App:', isInMiniApp);
        
        if (!isInMiniApp) {
          // Nie jesteśmy w Mini App, użyj fallback do window.ethereum
          console.log('⚠️ Not in Mini App, using window.ethereum fallback');
          await detectExternalWallet();
          return;
        }

        // Sprawdź capabilities - czy portfel Ethereum jest dostępny
        // https://miniapps.farcaster.xyz/docs/sdk/detecting-capabilities
        const capabilities = await sdk.getCapabilities();
        console.log('🔧 Capabilities:', capabilities);
        
        // Sprawdź czy portfel Ethereum jest dostępny
        // Capabilities może mieć różną strukturę, sprawdzamy różne możliwości
        const hasEthereumWallet = 
          (capabilities as any)?.ethereum?.available || 
          (capabilities as any)?.wallet?.ethereum ||
          capabilities?.includes?.('wallet.getEthereumProvider') ||
          false;
        console.log('💼 Has Ethereum wallet:', hasEthereumWallet);
        
        if (!hasEthereumWallet) {
          setWallet({
            address: '',
            walletClient: null,
            isFarcasterWallet: false,
            isInMiniApp: true,
            hasEthereumWallet: false,
            loading: false,
            error: 'Ethereum wallet not available in this Mini App',
          });
          return;
        }

        // Portfel Ethereum jest dostępny przez sdk.wallet.getEthereumProvider()
        // Zgodnie z dokumentacją: https://miniapps.farcaster.xyz/docs/guides/wallets
        // Portfel implementuje EIP-1193, więc możemy użyć go jako standardowego providera
        const ethereumProvider = await sdk.wallet.getEthereumProvider();
        
        if (!ethereumProvider) {
          throw new Error('Ethereum provider not available');
        }

        // Pobierz adres portfela
        const accounts = await ethereumProvider.request({ method: 'eth_accounts' });
        
        if (!accounts || accounts.length === 0) {
          // Portfel nie jest połączony, ale jest dostępny
          setWallet({
            address: '',
            walletClient: null,
            isFarcasterWallet: true,
            isInMiniApp: true,
            hasEthereumWallet: true,
            loading: false,
            error: null,
          });
          return;
        }

        const walletAddress = accounts[0] as string;
        console.log('✅ Farcaster wallet address:', walletAddress);

        // Utwórz wallet client używając EIP-1193 providera z Farcaster SDK
        // ethereumProvider implementuje EIP-1193, więc możemy użyć go bezpośrednio
        const walletClient = createWalletClient({
          chain: base,
          transport: custom(ethereumProvider),
        });

        setWallet({
          address: walletAddress,
          walletClient,
          isFarcasterWallet: true,
          isInMiniApp: true,
          hasEthereumWallet: true,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('❌ Error detecting Farcaster wallet:', err);
        
        // Fallback do window.ethereum
        await detectExternalWallet();
      }
    };

    const detectExternalWallet = async () => {
      // Fallback do window.ethereum (MetaMask, Coinbase Wallet, etc.)
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          console.log('🔄 Using window.ethereum as fallback');
          
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          
          if (accounts && accounts.length > 0) {
            const walletClient = createWalletClient({
              chain: base,
              transport: custom((window as any).ethereum),
            });

            setWallet({
              address: accounts[0],
              walletClient,
              isFarcasterWallet: false,
              isInMiniApp: false,
              hasEthereumWallet: true,
              loading: false,
              error: null,
            });
            return;
          }
        } catch (fallbackErr) {
          console.error('❌ Fallback wallet error:', fallbackErr);
        }
      }

      // Brak portfela
      setWallet({
        address: '',
        walletClient: null,
        isFarcasterWallet: false,
        isInMiniApp: false,
        hasEthereumWallet: false,
        loading: false,
        error: null,
      });
    };

    detectWallet();
  }, []);

  const connectWallet = async (): Promise<void> => {
    try {
      setWallet(prev => ({ ...prev, loading: true, error: null }));

      // Sprawdź czy jesteśmy w Mini App
      const { sdk } = await import('@farcaster/miniapp-sdk');
      const isInMiniApp = await sdk.isInMiniApp();
      
      if (isInMiniApp) {
        // W Mini App, użyj Farcaster wallet
        const capabilities = await sdk.getCapabilities();
        const hasEthereumWallet = 
          (capabilities as any)?.ethereum?.available || 
          (capabilities as any)?.wallet?.ethereum ||
          capabilities?.includes?.('wallet.getEthereumProvider') ||
          false;
        
        if (!hasEthereumWallet) {
          throw new Error('Ethereum wallet not available in this Mini App');
        }

        const ethereumProvider = await sdk.wallet.getEthereumProvider();
        
        if (!ethereumProvider) {
          throw new Error('Ethereum provider not available');
        }

        // Request account access (EIP-1193)
        const accounts = await ethereumProvider.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found');
        }

        const walletAddress = accounts[0] as string;

        // Utwórz wallet client
        const walletClient = createWalletClient({
          chain: base,
          transport: custom(ethereumProvider),
        });

        setWallet({
          address: walletAddress,
          walletClient,
          isFarcasterWallet: true,
          isInMiniApp: true,
          hasEthereumWallet: true,
          loading: false,
          error: null,
        });
        return;
      }

      // Fallback do window.ethereum
      if (!(window as any).ethereum) {
        throw new Error('Please install a wallet (MetaMask, Coinbase Wallet, etc.)');
      }

      // Request account access
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Switch to Base network
      try {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${base.id.toString(16)}` }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${base.id.toString(16)}`,
                chainName: 'Base',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.base.org'],
                blockExplorerUrls: ['https://basescan.org'],
              },
            ],
          });
        }
      }

      const walletClient = createWalletClient({
        chain: base,
        transport: custom((window as any).ethereum),
      });

      setWallet({
        address: accounts[0],
        walletClient,
        isFarcasterWallet: false,
        isInMiniApp: false,
        hasEthereumWallet: true,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.error('❌ Wallet connection error:', err);
      setWallet(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to connect wallet',
      }));
    }
  };

  return {
    ...wallet,
    connectWallet,
  };
}
