import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { useWallet } from '../contexts/WalletContext';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

export default function WalletScreen() {
  const {
    wallet,
    transactions,
    rewards,
    createWallet,
    getTransactionHistory,
    claimReward,
    getPendingRewards,
  } = useWallet();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'send' | 'receive'>('send');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  useEffect(() => {
    if (!wallet) {
      createWallet();
    }
  }, []);

  const handleSend = async () => {
    if (!recipientAddress || !sendAmount) {
      alert('Please fill in all fields');
      return;
    }

    // TODO: Implement actual blockchain transaction
    alert('Transaction sent! (Demo mode)');
    setModalVisible(false);
    setRecipientAddress('');
    setSendAmount('');
  };

  const handleClaimReward = async (rewardId: string) => {
    try {
      await claimReward(rewardId);
      alert('Reward claimed successfully!');
    } catch (error) {
      console.error('Failed to claim reward:', error);
    }
  };

  const handleShare = async () => {
    if (!wallet) return;

    try {
      await Share.share({
        message: `My FastFitHub wallet address: ${wallet.address}`,
        title: 'Share Wallet Address',
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const pendingRewards = getPendingRewards();
  const transactionHistory = getTransactionHistory();

  const renderTransactionCard = (transaction: any) => (
    <Card key={transaction.id} style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionIcon}>
            {transaction.type === 'reward' ? '🎁' : transaction.type === 'transfer' ? '📤' : '🔄'}
          </Text>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionType}>
              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
            </Text>
            <Text style={styles.transactionDescription}>{transaction.description}</Text>
          </View>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={[styles.amount, { color: transaction.type === 'reward' ? '#22c55e' : '#ef4444' }]}>
            {transaction.type === 'reward' ? '+' : '-'}{transaction.amount}
          </Text>
          <Text style={styles.transactionStatus}>{transaction.status}</Text>
        </View>
      </View>
    </Card>
  );

  const renderRewardCard = (reward: any) => (
    <Card key={reward.id} style={styles.rewardCard}>
      <View style={styles.rewardHeader}>
        <View style={styles.rewardInfo}>
          <Text style={styles.rewardIcon}>⭐</Text>
          <View style={styles.rewardDetails}>
            <Text style={styles.rewardReason}>{reward.reason}</Text>
            <Text style={styles.rewardDate}>
              {new Date(reward.claimedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.rewardAmount}>
          <Text style={styles.rewardValue}>{reward.amount} HCH</Text>
          {!reward.claimed && (
            <TouchableOpacity
              style={styles.claimButton}
              onPress={() => handleClaimReward(reward.id)}
            >
              <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Wallet</Text>
          <Text style={styles.subtitle}>Manage your rewards</Text>
        </View>

        {wallet && (
          <>
            {/* Wallet Balance Card */}
            <View style={styles.section}>
              <Card style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <View style={styles.balanceContent}>
                  <View>
                    <Text style={styles.balanceAmount}>{wallet.balance.toFixed(2)}</Text>
                    <Text style={styles.balanceCurrency}>HCH Tokens</Text>
                  </View>
                  <View style={styles.balanceDivider} />
                  <View>
                    <Text style={styles.usdAmount}>${wallet.usdValue.toFixed(2)}</Text>
                    <Text style={styles.usdLabel}>USD Value</Text>
                  </View>
                </View>

                {/* Wallet Address */}
                <View style={styles.addressSection}>
                  <Text style={styles.addressLabel}>Wallet Address</Text>
                  <View style={styles.addressBox}>
                    <Text style={styles.address} numberOfLines={1}>
                      {wallet.address}
                    </Text>
                    <TouchableOpacity onPress={handleShare}>
                      <Text style={styles.shareIcon}>📋</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setModalType('send');
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.actionButtonIcon}>📤</Text>
                    <Text style={styles.actionButtonText}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setModalType('receive');
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.actionButtonIcon}>📥</Text>
                    <Text style={styles.actionButtonText}>Receive</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonIcon}>🔄</Text>
                    <Text style={styles.actionButtonText}>Swap</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>

            {/* Pending Rewards */}
            {pendingRewards.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pending Rewards ({pendingRewards.length})</Text>
                {pendingRewards.map((reward) => renderRewardCard(reward))}
              </View>
            )}

            {/* Transaction History */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Transaction History</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              {transactionHistory.length === 0 ? (
                <Card style={styles.emptyCard}>
                  <Text style={styles.emptyText}>No transactions yet</Text>
                </Card>
              ) : (
                transactionHistory.slice(0, 5).map((transaction) => renderTransactionCard(transaction))
              )}
            </View>

            <View style={styles.spacer} />
          </>
        )}
      </ScrollView>

      {/* Send/Receive Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'send' ? 'Send HCH' : 'Receive HCH'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {modalType === 'send' ? (
                <>
                  <Text style={styles.label}>Recipient Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0x..."
                    value={recipientAddress}
                    onChangeText={setRecipientAddress}
                  />

                  <Text style={styles.label}>Amount (HCH)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    value={sendAmount}
                    onChangeText={setSendAmount}
                    keyboardType="decimal-pad"
                  />

                  <View style={styles.feeInfo}>
                    <Text style={styles.feeLabel}>Network Fee</Text>
                    <Text style={styles.feeValue}>0.01 HCH</Text>
                  </View>

                  <View style={styles.totalInfo}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                      {(parseFloat(sendAmount) || 0) + 0.01} HCH
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.label}>Your Wallet Address</Text>
                  <View style={styles.addressDisplayBox}>
                    <Text style={styles.addressDisplay}>{wallet?.address}</Text>
                  </View>

                  <Text style={styles.label}>QR Code</Text>
                  <View style={styles.qrPlaceholder}>
                    <Text style={styles.qrText}>📱 QR Code</Text>
                  </View>

                  <TouchableOpacity style={styles.copyButton} onPress={handleShare}>
                    <Text style={styles.copyButtonText}>Copy Address</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>

            {modalType === 'send' && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSend}
              >
                <Text style={styles.submitButtonText}>Send</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
  },
  subtitle: {
    fontSize: 14,
    color: '#687076',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
  },
  viewAll: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  balanceCard: {
    padding: 20,
    backgroundColor: 'linear-gradient(135deg, #0a7ea4 0%, #0d9488 100%)',
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  balanceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  balanceCurrency: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  balanceDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  usdAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  usdLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  addressSection: {
    marginBottom: 16,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  address: {
    flex: 1,
    fontSize: 12,
    color: '#fff',
    fontFamily: 'monospace',
  },
  shareIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  transactionCard: {
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  transactionDescription: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
  transactionStatus: {
    fontSize: 10,
    color: '#687076',
    marginTop: 2,
  },
  rewardCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rewardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  rewardDetails: {
    flex: 1,
  },
  rewardReason: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  rewardDate: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  rewardAmount: {
    alignItems: 'flex-end',
  },
  rewardValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f59e0b',
  },
  claimButton: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f59e0b',
    borderRadius: 6,
  },
  claimButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#687076',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11181c',
  },
  closeButton: {
    fontSize: 24,
    color: '#687076',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 20,
    color: '#11181c',
  },
  feeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    marginBottom: 12,
  },
  feeLabel: {
    fontSize: 14,
    color: '#687076',
  },
  feeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  totalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  addressDisplayBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  addressDisplay: {
    fontSize: 12,
    color: '#11181c',
    fontFamily: 'monospace',
  },
  qrPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrText: {
    fontSize: 48,
  },
  copyButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#0a7ea4',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  spacer: {
    height: 100,
  },
});
