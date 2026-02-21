import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wallet, Transaction, Reward } from '../types';

interface WalletContextType {
  wallet: Wallet | null;
  transactions: Transaction[];
  rewards: Reward[];
  
  // Wallet operations
  createWallet: () => Promise<void>;
  getWalletBalance: () => number;
  
  // Transaction operations
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  getTransactionHistory: () => Transaction[];
  
  // Reward operations
  addReward: (reward: Omit<Reward, 'id'>) => Promise<void>;
  claimReward: (rewardId: string) => Promise<void>;
  getPendingRewards: () => Reward[];
  getTotalRewards: () => number;
  
  // Conversion
  convertToUSD: (amount: number, rate: number) => number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock exchange rate (in production, fetch from API)
const MOCK_HCH_TO_USD = 0.50;

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);

  // Load wallet data on mount
  React.useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      const [walletData, transactionsData, rewardsData] = await Promise.all([
        AsyncStorage.getItem('wallet'),
        AsyncStorage.getItem('transactions'),
        AsyncStorage.getItem('rewards'),
      ]);

      if (walletData) setWallet(JSON.parse(walletData));
      if (transactionsData) setTransactions(JSON.parse(transactionsData));
      if (rewardsData) setRewards(JSON.parse(rewardsData));
    } catch (error) {
      console.error('Failed to load wallet data:', error);
    }
  };

  const createWallet = async () => {
    try {
      // Generate mock wallet address
      const mockAddress = `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
      
      const newWallet: Wallet = {
        id: `wallet_${Date.now()}`,
        userId: 'current_user', // TODO: Get from auth context
        address: mockAddress,
        balance: 0,
        usdValue: 0,
        createdAt: new Date(),
        lastUpdated: new Date(),
      };

      setWallet(newWallet);
      await AsyncStorage.setItem('wallet', JSON.stringify(newWallet));
    } catch (error) {
      console.error('Failed to create wallet:', error);
    }
  };

  const getWalletBalance = () => {
    return wallet?.balance || 0;
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction: Transaction = {
        ...transaction,
        id: `tx_${Date.now()}`,
      };

      const updated = [...transactions, newTransaction];
      setTransactions(updated);
      await AsyncStorage.setItem('transactions', JSON.stringify(updated));

      // Update wallet balance if it's a reward
      if (transaction.type === 'reward' && wallet) {
        const newBalance = wallet.balance + transaction.amount;
        const updatedWallet = {
          ...wallet,
          balance: newBalance,
          usdValue: newBalance * MOCK_HCH_TO_USD,
          lastUpdated: new Date(),
        };
        setWallet(updatedWallet);
        await AsyncStorage.setItem('wallet', JSON.stringify(updatedWallet));
      }
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const getTransactionHistory = () => {
    return transactions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const addReward = async (reward: Omit<Reward, 'id'>) => {
    try {
      const newReward: Reward = {
        ...reward,
        id: `reward_${Date.now()}`,
      };

      const updated = [...rewards, newReward];
      setRewards(updated);
      await AsyncStorage.setItem('rewards', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to add reward:', error);
    }
  };

  const claimReward = async (rewardId: string) => {
    try {
      const reward = rewards.find((r) => r.id === rewardId);
      if (!reward) return;

      // Mark reward as claimed
      const updated = rewards.map((r) =>
        r.id === rewardId ? { ...r, claimed: true, claimedAt: new Date() } : r
      );
      setRewards(updated);
      await AsyncStorage.setItem('rewards', JSON.stringify(updated));

      // Add transaction for the reward
      await addTransaction({
        walletId: wallet?.id || '',
        type: 'reward',
        amount: reward.amount,
        fromAddress: 'system',
        toAddress: wallet?.address || '',
        status: 'completed',
        timestamp: new Date(),
        description: `Claimed reward: ${reward.reason}`,
      });
    } catch (error) {
      console.error('Failed to claim reward:', error);
    }
  };

  const getPendingRewards = () => {
    return rewards.filter((r) => !r.claimed);
  };

  const getTotalRewards = () => {
    return rewards.reduce((sum, reward) => sum + reward.amount, 0);
  };

  const convertToUSD = (amount: number, rate: number = MOCK_HCH_TO_USD) => {
    return amount * rate;
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        transactions,
        rewards,
        createWallet,
        getWalletBalance,
        addTransaction,
        getTransactionHistory,
        addReward,
        claimReward,
        getPendingRewards,
        getTotalRewards,
        convertToUSD,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
