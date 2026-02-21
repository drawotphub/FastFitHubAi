import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { useHealth } from '../contexts/HealthContext';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

export default function ActivitiesScreen() {
  const { activities, addActivity } = useHealth();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<'running' | 'cycling' | 'gym' | 'walking' | 'swimming' | 'yoga'>('running');
  const [duration, setDuration] = useState('30');
  const [calories, setCalories] = useState('300');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');

  const activityTypes: Array<'running' | 'cycling' | 'gym' | 'walking' | 'swimming' | 'yoga'> = [
    'running',
    'cycling',
    'gym',
    'walking',
    'swimming',
    'yoga',
  ];

  const handleAddActivity = async () => {
    try {
      await addActivity({
        type: selectedType,
        duration: parseInt(duration),
        calories: parseInt(calories),
        distance: Math.random() * 10,
        intensity,
        startTime: new Date(),
        endTime: new Date(Date.now() + parseInt(duration) * 60000),
        verified: false,
      });
      setModalVisible(false);
      setDuration('30');
      setCalories('300');
    } catch (error) {
      console.error('Failed to add activity:', error);
    }
  };

  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      running: '🏃',
      cycling: '🚴',
      gym: '🏋️',
      walking: '🚶',
      swimming: '🏊',
      yoga: '🧘',
    };
    return icons[type] || '🏃';
  };

  const renderActivityCard = (activity: any) => (
    <Card key={activity.id} style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={styles.activityIconContainer}>
          <Text style={styles.activityIcon}>{getActivityIcon(activity.type)}</Text>
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityType}>
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </Text>
          <Text style={styles.activityTime}>
            {new Date(activity.startTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        <View style={styles.activityStats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{activity.duration}</Text>
            <Text style={styles.statLabel}>min</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{activity.calories}</Text>
            <Text style={styles.statLabel}>cal</Text>
          </View>
        </View>
      </View>
      <View style={styles.intensityBar}>
        <View
          style={[
            styles.intensityFill,
            {
              width: activity.intensity === 'low' ? '33%' : activity.intensity === 'medium' ? '66%' : '100%',
              backgroundColor: activity.intensity === 'low' ? '#22c55e' : activity.intensity === 'medium' ? '#f59e0b' : '#ef4444',
            },
          ]}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Activities</Text>
          <Text style={styles.subtitle}>Track your workouts</Text>
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{activities.length}</Text>
            <Text style={styles.statName}>Activities</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>
              {activities.reduce((sum, a) => sum + a.duration, 0)}
            </Text>
            <Text style={styles.statName}>Minutes</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>
              {activities.reduce((sum, a) => sum + a.calories, 0)}
            </Text>
            <Text style={styles.statName}>Calories</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {activities.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No activities yet. Start moving!</Text>
            </Card>
          ) : (
            activities.map((activity) => renderActivityCard(activity))
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Activity</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.label}>Activity Type</Text>
              <View style={styles.typeGrid}>
                {activityTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      selectedType === type && styles.typeButtonActive,
                    ]}
                    onPress={() => setSelectedType(type)}
                  >
                    <Text style={styles.typeIcon}>{getActivityIcon(type)}</Text>
                    <Text style={styles.typeLabel}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                placeholder="30"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Calories Burned</Text>
              <TextInput
                style={styles.input}
                placeholder="300"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Intensity</Text>
              <View style={styles.intensityContainer}>
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.intensityButton,
                      intensity === level && styles.intensityButtonActive,
                    ]}
                    onPress={() => setIntensity(level)}
                  >
                    <Text style={styles.intensityButtonText}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddActivity}
            >
              <Text style={styles.submitButtonText}>Log Activity</Text>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  statName: {
    fontSize: 12,
    color: '#687076',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 12,
  },
  activityCard: {
    padding: 16,
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  activityTime: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  activityStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  statLabel: {
    fontSize: 10,
    color: '#687076',
    marginTop: 2,
  },
  intensityBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  intensityFill: {
    height: '100%',
    borderRadius: 2,
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#687076',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
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
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  typeButton: {
    width: (width - 40) / 3,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  typeButtonActive: {
    backgroundColor: '#e0f2fe',
    borderColor: '#0a7ea4',
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#11181c',
    textAlign: 'center',
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
  intensityContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  intensityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  intensityButtonActive: {
    backgroundColor: '#e0f2fe',
    borderColor: '#0a7ea4',
  },
  intensityButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
