'use client';

import { useState, useEffect } from 'react';
import { createWalletClient, custom, type WalletClient } from 'viem';
import { base } from 'viem/chains';

export interface FarcasterWallet {
  address: string;
  walletClient: WalletClient | null;
  isFarcasterWallet: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Hook do wykrywania i używania portfela Farcaster w miniapp
 * W miniapp kontekście portfel jest już dostępny przez SDK
 */
export function useFarcasterWallet() {
  const [wallet, setWallet] = useState<FarcasterWallet>({
    address: '',
    walletClient: null,
    isFarcasterWallet: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const detectWallet = async () => {
      try {
        // Sprawdź czy jesteśmy w Farcaster miniapp
        const { sdk } = await import('@farcaster/miniapp-sdk');
        
        console.log('Farcaster SDK loaded, checking wallet...');
        
        // W Farcaster miniapp portfel jest dostępny przez SDK
        // Sprawdź czy SDK ma dostęp do portfela
        const context = sdk.context;
        console.log('Farcaster context:', context);
        
        // Sprawdź różne możliwe ścieżki do portfela w SDK
        // Portfel może być w: context.wallet, context.user.walletAddress, lub przez sdk.actions
        let walletAddress: string | null = null;
        
        if (context?.wallet?.address) {
          walletAddress = context.wallet.address;
        } else if ((context as any)?.walletAddress) {
          walletAddress = (context as any).walletAddress;
        } else if (context?.user?.walletAddress) {
          walletAddress = context.user.walletAddress;
        } else if ((context as any)?.user?.wallet?.address) {
          walletAddress = (context as any).user.wallet.address;
        }
        
        if (walletAddress) {
          console.log('Farcaster wallet found:', walletAddress);
          
          // Utwórz wallet client używając Farcaster SDK
          // W Farcaster miniapp możemy użyć custom transport z SDK
          const walletClient = createWalletClient({
            chain: base,
            transport: custom({
              request: async ({ method, params }) => {
                // Użyj SDK do wykonywania transakcji
                if (method === 'eth_sendTransaction') {
                  // Farcaster SDK może mieć metodę do wysyłania transakcji
                  // Sprawdź czy SDK ma metodę sendTransaction
                  if ((sdk.actions as any).sendTransaction) {
                    const result = await (sdk.actions as any).sendTransaction(params[0]);
                    return result;
                  }
                  // Jeśli nie, użyj window.ethereum jeśli dostępny
                  if (typeof window !== 'undefined' && (window as any).ethereum) {
                    return (window as any).ethereum.request({ method, params });
                  }
                  throw new Error('Transaction method not available');
                }
                // Dla innych metod, użyj standardowego providera jeśli dostępny
                if (typeof window !== 'undefined' && (window as any).ethereum) {
                  return (window as any).ethereum.request({ method, params });
                }
                throw new Error(`Method ${method} not supported`);
              },
            }),
          });

          setWallet({
            address: walletAddress,
            walletClient,
            isFarcasterWallet: true,
            loading: false,
            error: null,
          });
          return;
        }

        // Jeśli nie ma portfela w SDK, sprawdź czy jest window.ethereum (fallback)
        if (typeof window !== 'undefined' && window.ethereum) {
          console.log('Using window.ethereum as fallback');
          
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts && accounts.length > 0) {
            const walletClient = createWalletClient({
              chain: base,
              transport: custom(window.ethereum),
            });

            setWallet({
              address: accounts[0],
              walletClient,
              isFarcasterWallet: false,
              loading: false,
              error: null,
            });
            return;
          }
        }

        // Brak portfela
        setWallet({
          address: '',
          walletClient: null,
          isFarcasterWallet: false,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Error detecting wallet:', err);
        
        // Fallback do window.ethereum jeśli SDK nie jest dostępne
        if (typeof window !== 'undefined' && window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            if (accounts && accounts.length > 0) {
              const walletClient = createWalletClient({
                chain: base,
                transport: custom(window.ethereum),
              });

              setWallet({
                address: accounts[0],
                walletClient,
                isFarcasterWallet: false,
                loading: false,
                error: null,
              });
              return;
            }
          } catch (fallbackErr) {
            console.error('Fallback wallet error:', fallbackErr);
          }
        }

        setWallet({
          address: '',
          walletClient: null,
          isFarcasterWallet: false,
          loading: false,
          error: 'No wallet available',
        });
      }
    };

    detectWallet();
  }, []);

  const connectWallet = async (): Promise<void> => {
    try {
      setWallet(prev => ({ ...prev, loading: true, error: null }));

      // Sprawdź czy jesteśmy w Farcaster miniapp
      try {
        const { sdk } = await import('@farcaster/miniapp-sdk');
        const context = sdk.context;
        console.log('Farcaster context in connectWallet:', context);
        
        // Sprawdź różne możliwe ścieżki do portfela
        let walletAddress: string | null = null;
        
        if (context?.wallet?.address) {
          walletAddress = context.wallet.address;
        } else if ((context as any)?.walletAddress) {
          walletAddress = (context as any).walletAddress;
        } else if (context?.user?.walletAddress) {
          walletAddress = context.user.walletAddress;
        } else if ((context as any)?.user?.wallet?.address) {
          walletAddress = (context as any).user.wallet.address;
        }
        
        if (walletAddress) {
          const walletClient = createWalletClient({
            chain: base,
            transport: custom({
              request: async ({ method, params }) => {
                if (method === 'eth_sendTransaction') {
                  if ((sdk.actions as any).sendTransaction) {
                    const result = await (sdk.actions as any).sendTransaction(params[0]);
                    return result;
                  }
                  if (typeof window !== 'undefined' && (window as any).ethereum) {
                    return (window as any).ethereum.request({ method, params });
                  }
                  throw new Error('Transaction method not available');
                }
                if (typeof window !== 'undefined' && (window as any).ethereum) {
                  return (window as any).ethereum.request({ method, params });
                }
                throw new Error(`Method ${method} not supported`);
              },
            }),
          });

          setWallet({
            address: walletAddress,
            walletClient,
            isFarcasterWallet: true,
            loading: false,
            error: null,
          });
          return;
        }
      } catch (sdkError) {
        console.log('Farcaster SDK not available, using fallback:', sdkError);
      }

      // Fallback do window.ethereum
      if (!window.ethereum) {
        throw new Error('Please install a wallet (MetaMask, Coinbase Wallet, etc.)');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Switch to Base network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${base.id.toString(16)}` }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
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
        transport: custom(window.ethereum),
      });

      setWallet({
        address: accounts[0],
        walletClient,
        isFarcasterWallet: false,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.error('Wallet connection error:', err);
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

