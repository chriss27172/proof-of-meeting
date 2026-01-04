'use client';

import { useState, useEffect } from 'react';
import { parseEther } from 'viem';
import { base } from 'viem/chains';
import { useFarcasterWallet } from '@/hooks/useFarcasterWallet';

const CREATOR_WALLET = '0xC7C23F3f7DA06d0950538B7591e40A41d98841ed' as `0x${string}`;
const CREATOR_NAME = 'music-guy.eth';

interface BuyMeCoffeeProps {
  className?: string;
}

export default function BuyMeCoffee({ className = '' }: BuyMeCoffeeProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<'0.001' | '0.01' | '0.1' | 'custom'>('0.001');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { address, walletClient, isFarcasterWallet, loading: walletLoading, connectWallet } = useFarcasterWallet();

  useEffect(() => {
    // Automatycznie połącz portfel jeśli jest dostępny w Farcaster miniapp
    if (isFarcasterWallet && !address && !walletLoading) {
      connectWallet();
    }
  }, [isFarcasterWallet, address, walletLoading, connectWallet]);

  const handleDonate = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Get amount
      let amount: bigint;
      if (selectedAmount === 'custom') {
        const customValue = parseFloat(customAmount);
        if (isNaN(customValue) || customValue <= 0) {
          setError('Please enter a valid amount');
          setIsProcessing(false);
          return;
        }
        amount = parseEther(customAmount);
      } else {
        amount = parseEther(selectedAmount);
      }

      // Użyj portfela Farcaster jeśli dostępny, w przeciwnym razie użyj window.ethereum
      if (walletClient && address) {
        // Użyj wallet client z Farcaster
        const hash = await walletClient.sendTransaction({
          to: CREATOR_WALLET,
          value: amount,
        });

        // Success!
        setShowModal(false);
        alert(`Thank you! Transaction sent: ${hash}\n\nView on BaseScan: https://basescan.org/tx/${hash}`);
        
        // Reset form
        setSelectedAmount('0.001');
        setCustomAmount('');
        setIsProcessing(false);
        return;
      }

      // Fallback do window.ethereum
      if (!window.ethereum) {
        setError('Please connect your wallet first');
        setIsProcessing(false);
        return;
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get provider
      const provider = (window as any).ethereum;
      
      // Switch to Base network if needed
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${base.id.toString(16)}` }],
        });
      } catch (switchError: any) {
        // If network doesn't exist, add it
        if (switchError.code === 4902) {
          await provider.request({
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

      // Send transaction
      const accounts = await provider.request({ method: 'eth_accounts' });
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: CREATOR_WALLET,
            value: `0x${amount.toString(16)}`,
            chainId: `0x${base.id.toString(16)}`,
          },
        ],
      });

      // Success!
      setShowModal(false);
      alert(`Thank you! Transaction sent: ${txHash}\n\nView on BaseScan: https://basescan.org/tx/${txHash}`);
      
      // Reset form
      setSelectedAmount('0.001');
      setCustomAmount('');
    } catch (err: any) {
      console.error('Donation error:', err);
      setError(err.message || 'Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getAmount = (): string => {
    if (selectedAmount === 'custom') {
      return customAmount || '0';
    }
    return selectedAmount;
  };

  const getAmountDisplay = (): string => {
    const amount = getAmount();
    return amount === '0' ? '0.001' : amount;
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl ${className}`}
      >
        <span>☕</span>
        <span>Buy me a coffee</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                ☕ Buy me a coffee
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setError(null);
                  setCustomAmount('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Support <span className="font-semibold">{CREATOR_NAME}</span> by sending ETH on Base network
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {(['0.001', '0.01', '0.1'] as const).map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-3 px-4 rounded-lg font-semibold transition ${
                      selectedAmount === amount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {amount} ETH
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom amount (ETH)
                </label>
                <input
                  type="number"
                  min="0.001"
                  step="0.001"
                  placeholder="Enter amount in ETH"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount('custom');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Amount:</strong> {getAmountDisplay()} ETH
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Creator: <span className="font-semibold">{CREATOR_NAME}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Wallet: {CREATOR_WALLET.slice(0, 6)}...{CREATOR_WALLET.slice(-4)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Network: Base
                </p>
              </div>

              {!address && (
                <button
                  onClick={connectWallet}
                  disabled={walletLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition mb-4"
                >
                  {walletLoading ? 'Connecting...' : isFarcasterWallet ? 'Use Farcaster Wallet' : 'Connect Wallet'}
                </button>
              )}

              {address && (
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Wallet:</strong> {address.slice(0, 6)}...{address.slice(-4)}
                    {isFarcasterWallet && <span className="ml-2 text-xs">(Farcaster)</span>}
                  </p>
                </div>
              )}

              <button
                onClick={handleDonate}
                disabled={isProcessing || !address || (selectedAmount === 'custom' && !customAmount)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {isProcessing ? 'Processing...' : `Send ${getAmountDisplay()} ETH`}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                {address ? 'You\'ll be asked to confirm the transaction' : 'Please connect your wallet first'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

