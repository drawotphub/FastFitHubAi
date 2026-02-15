import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Workout {
  id: string;
  name: string;
  duration: number;
  calories: number;
  intensity: 'Low' | 'Medium' | 'High';
  date: string;
}

export default function DashboardScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Morning Run',
      duration: 30,
      calories: 350,
      intensity: 'High',
      date: 'Today',
    },
    {
      id: '2',
      name: 'Gym Session',
      duration: 45,
      calories: 420,
      intensity: 'High',
      date: 'Yesterday',
    },
    {
      id: '3',
      name: 'Yoga',
      duration: 20,
      calories: 120,
      intensity: 'Low',
      date: '2 days ago',
    },
  ]);

  const [stats] = useState({
    totalCalories: 890,
    totalWorkouts: 3,
    totalDuration: 95,
    weeklyGoal: 2000,
  });

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'High':
        return '#FF6B6B';
      case 'Medium':
        return '#FFA500';
      case 'Low':
        return '#4CAF50';
      default:
        return '#0a7ea4';
    }
  };

  const renderWorkoutCard = ({ item }: { item: Workout }) => (
    <View style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <View>
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutDate}>{item.date}</Text>
        </View>
        <View
          style={[
            styles.intensityBadge,
            { backgroundColor: getIntensityColor(item.intensity) },
          ]}
        >
          <Text style={styles.intensityText}>{item.intensity}</Text>
        </View>
      </View>
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>{item.duration}m</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Calories</Text>
          <Text style={styles.statValue}>{item.calories}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome Back! 👋</Text>
        <Text style={styles.date}>Today's Progress</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#1A1A1A' }]}>
          <Text style={styles.statCardLabel}>Calories Burned</Text>
          <Text style={styles.statCardValue}>{stats.totalCalories}</Text>
          <Text style={styles.statCardUnit}>kcal</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#1A1A1A' }]}>
          <Text style={styles.statCardLabel}>Workouts</Text>
          <Text style={styles.statCardValue}>{stats.totalWorkouts}</Text>
          <Text style={styles.statCardUnit}>sessions</Text>
        </View>
      </View>

      {/* Weekly Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Goal</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(stats.totalCalories / stats.weeklyGoal) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {stats.totalCalories} / {stats.weeklyGoal} kcal
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🏃</Text>
            <Text style={styles.actionLabel}>Start Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🍎</Text>
            <Text style={styles.actionLabel}>Log Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionLabel}>View Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Workouts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          scrollEnabled={false}
          data={workouts}
          renderItem={renderWorkoutCard}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {/* AI Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Recommendations</Text>
        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationTitle}>💡 Personalized Workout Plan</Text>
          <Text style={styles.recommendationText}>
            Based on your activity, we recommend a 45-minute strength training session today.
          </Text>
          <TouchableOpacity style={styles.recommendationButton}>
            <Text style={styles.recommendationButtonText}>View Plan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Spacing */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#999999',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  statCardValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0a7ea4',
    marginBottom: 4,
  },
  statCardUnit: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  viewAll: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '600',
  },
  progressContainer: {
    gap: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0a7ea4',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#999999',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: (width - 52) / 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    fontSize: 32,
  },
  actionLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  workoutCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 12,
    color: '#999999',
  },
  intensityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  intensityText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  separator: {
    height: 12,
  },
  recommendationCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  recommendationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
