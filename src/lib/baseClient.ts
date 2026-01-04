import { createPublicClient, http, parseEther, type WalletClient } from 'viem';
import { base } from 'viem/chains';

// Base RPC endpoint
const baseRpcUrl = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

export const baseClient = createPublicClient({
  chain: base,
  transport: http(baseRpcUrl),
});

// Payment wallet address
export const PAYMENT_WALLET = '0xf56e55e35d2cca5a34f5ba568454974424aea0f4' as `0x${string}`;

// Fee amount in ETH
export const MEETING_FEE = parseEther('0.0001');

// Send payment fee to payment wallet
export async function sendPaymentFee(
  walletClient: WalletClient
): Promise<string> {
  try {
    if (!walletClient.account) {
      throw new Error('Wallet client must have an account');
    }

    const hash = await walletClient.sendTransaction({
      account: walletClient.account,
      chain: walletClient.chain || base,
      to: PAYMENT_WALLET,
      value: MEETING_FEE,
    });

    return hash;
  } catch (error) {
    console.error('Error sending payment:', error);
    throw error;
  }
}

