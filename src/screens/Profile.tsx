import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useHealth } from '../contexts/HealthContext';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { nutritionGoals, updateNutritionGoals } = useHealth();

  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [goalsModalVisible, setGoalsModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [dailyCalories, setDailyCalories] = useState(nutritionGoals.dailyCalories.toString());
  const [dailySteps, setDailySteps] = useState('10000');
  const [dailyWater, setDailyWater] = useState('2000');
  const [dailySleep, setDailySleep] = useState('8');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleUpdateGoals = async () => {
    try {
      await updateNutritionGoals({
        dailyCalories: parseInt(dailyCalories),
      });
      setGoalsModalVisible(false);
      alert('Goals updated successfully!');
    } catch (error) {
      console.error('Failed to update goals:', error);
    }
  };

  const achievements = [
    { id: '1', title: 'First Step', description: 'Log your first activity', icon: '🚶', unlocked: true },
    { id: '2', title: 'Week Warrior', description: 'Complete 7 activities in a week', icon: '⚔️', unlocked: true },
    { id: '3', title: 'Calorie Counter', description: 'Log 100 meals', icon: '🍽️', unlocked: false },
    { id: '4', title: 'Hydration Hero', description: 'Log water intake for 30 days', icon: '💧', unlocked: false },
    { id: '5', title: 'Sleep Master', description: 'Log 8+ hours of sleep for 7 days', icon: '😴', unlocked: false },
    { id: '6', title: 'Crypto Champion', description: 'Earn 1000 HCH tokens', icon: '🪙', unlocked: false },
  ];

  const renderAchievementCard = (achievement: any) => (
    <View
      key={achievement.id}
      style={[
        styles.achievementCard,
        !achievement.unlocked && styles.achievementCardLocked,
      ]}
    >
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <Text style={styles.achievementTitle}>{achievement.title}</Text>
      <Text style={styles.achievementDescription}>{achievement.description}</Text>
      {!achievement.unlocked && (
        <View style={styles.lockedBadge}>
          <Text style={styles.lockedText}>🔒</Text>
        </View>
      )}
    </View>
  );

  const renderSettingRow = (
    label: string,
    value: boolean,
    onToggle: (value: boolean) => void
  ) => (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#e5e7eb', true: '#0a7ea4' }}
        thumbColor={value ? '#fff' : '#f0f0f0'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.fullName}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Activities</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statIcon}>🪙</Text>
              <Text style={styles.statValue}>250</Text>
              <Text style={styles.statLabel}>HCH Earned</Text>
            </Card>
          </View>
        </View>

        {/* Health Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Goals</Text>
            <TouchableOpacity onPress={() => setGoalsModalVisible(true)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.goalCard}>
            <View style={styles.goalRow}>
              <View style={styles.goalContent}>
                <Text style={styles.goalIcon}>🏃</Text>
                <View>
                  <Text style={styles.goalLabel}>Daily Steps</Text>
                  <Text style={styles.goalValue}>10,000 steps</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.goalCard}>
            <View style={styles.goalRow}>
              <View style={styles.goalContent}>
                <Text style={styles.goalIcon}>🍽️</Text>
                <View>
                  <Text style={styles.goalLabel}>Daily Calories</Text>
                  <Text style={styles.goalValue}>{nutritionGoals.dailyCalories} kcal</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.goalCard}>
            <View style={styles.goalRow}>
              <View style={styles.goalContent}>
                <Text style={styles.goalIcon}>💧</Text>
                <View>
                  <Text style={styles.goalLabel}>Daily Water</Text>
                  <Text style={styles.goalValue}>2,000 ml</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.goalCard}>
            <View style={styles.goalRow}>
              <View style={styles.goalContent}>
                <Text style={styles.goalIcon}>😴</Text>
                <View>
                  <Text style={styles.goalLabel}>Daily Sleep</Text>
                  <Text style={styles.goalValue}>8 hours</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => renderAchievementCard(achievement))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity onPress={() => setSettingsModalVisible(true)}>
              <Text style={styles.editButton}>More</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.settingCard}>
            {renderSettingRow('Notifications', notifications, setNotifications)}
            <View style={styles.divider} />
            {renderSettingRow('Dark Mode', darkMode, setDarkMode)}
          </Card>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Card style={styles.aboutCard}>
            <View style={styles.aboutRow}>
              <Text style={styles.aboutLabel}>App Version</Text>
              <Text style={styles.aboutValue}>1.0.0</Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.aboutRow}>
              <Text style={styles.aboutLabel}>Privacy Policy</Text>
              <Text style={styles.aboutArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.aboutRow}>
              <Text style={styles.aboutLabel}>Terms of Service</Text>
              <Text style={styles.aboutArrow}>›</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setSettingsModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalSectionTitle}>Preferences</Text>
              {renderSettingRow('Push Notifications', notifications, setNotifications)}
              {renderSettingRow('Email Notifications', true, () => {})}
              {renderSettingRow('Dark Mode', darkMode, setDarkMode)}

              <Text style={[styles.modalSectionTitle, { marginTop: 20 }]}>Privacy</Text>
              {renderSettingRow('Public Profile', false, () => {})}
              {renderSettingRow('Share Activity', true, () => {})}

              <Text style={[styles.modalSectionTitle, { marginTop: 20 }]}>Data</Text>
              <TouchableOpacity style={styles.dataButton}>
                <Text style={styles.dataButtonText}>📥 Export Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.dataButton, styles.dangerButton]}>
                <Text style={styles.dangerButtonText}>🗑️ Delete Account</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Goals Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={goalsModalVisible}
        onRequestClose={() => setGoalsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Health Goals</Text>
              <TouchableOpacity onPress={() => setGoalsModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.label}>Daily Calories (kcal)</Text>
              <TextInput
                style={styles.input}
                placeholder="2000"
                value={dailyCalories}
                onChangeText={setDailyCalories}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Daily Steps</Text>
              <TextInput
                style={styles.input}
                placeholder="10000"
                value={dailySteps}
                onChangeText={setDailySteps}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Daily Water (ml)</Text>
              <TextInput
                style={styles.input}
                placeholder="2000"
                value={dailyWater}
                onChangeText={setDailyWater}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Daily Sleep (hours)</Text>
              <TextInput
                style={styles.input}
                placeholder="8"
                value={dailySleep}
                onChangeText={setDailySleep}
                keyboardType="numeric"
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdateGoals}
            >
              <Text style={styles.submitButtonText}>Save Goals</Text>
            </TouchableOpacity>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#11181c',
  },
  profileEmail: {
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
  editButton: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  statLabel: {
    fontSize: 12,
    color: '#687076',
    marginTop: 4,
  },
  goalCard: {
    padding: 16,
    marginBottom: 12,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  goalLabel: {
    fontSize: 12,
    color: '#687076',
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
    marginTop: 4,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: (width - 40) / 2,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#11181c',
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 10,
    color: '#687076',
    marginTop: 4,
    textAlign: 'center',
  },
  lockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    fontSize: 12,
  },
  settingCard: {
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#11181c',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  aboutCard: {
    padding: 0,
    overflow: 'hidden',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#11181c',
  },
  aboutValue: {
    fontSize: 14,
    color: '#687076',
  },
  aboutArrow: {
    fontSize: 18,
    color: '#687076',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  spacer: {
    height: 40,
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
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 12,
  },
  dataButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  dataButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  dangerButton: {
    backgroundColor: '#fee2e2',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
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
});
