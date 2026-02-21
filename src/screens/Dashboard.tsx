import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useHealth } from '../contexts/HealthContext';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { todayMetrics, updateMetrics, activities, meals } = useHealth();
  const { wallet, getTotalRewards } = useWallet();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize wallet if not exists
    if (!wallet) {
      initializeWallet();
    }
  }, []);

  const initializeWallet = async () => {
    // TODO: Initialize wallet from context
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate data refresh
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update metrics with mock data
      await updateMetrics({
        steps: Math.floor(Math.random() * 10000),
        heartRate: 60 + Math.floor(Math.random() * 40),
      });
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getStepsPercentage = () => {
    const dailyGoal = 10000;
    return Math.min((todayMetrics.steps / dailyGoal) * 100, 100);
  };

  const getCaloriesPercentage = () => {
    const dailyGoal = 2000;
    return Math.min((todayMetrics.calories / dailyGoal) * 100, 100);
  };

  const getWaterPercentage = () => {
    const dailyGoal = 2000;
    return Math.min((todayMetrics.water / dailyGoal) * 100, 100);
  };

  const renderMetricCard = (
    title: string,
    value: string | number,
    unit: string,
    percentage: number,
    color: string
  ) => (
    <Card style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricTitle}>{title}</Text>
        <View style={[styles.percentageBadge, { backgroundColor: color }]}>
          <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
        </View>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricUnit}>{unit}</Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
    </Card>
  );

  const renderRecentActivity = () => {
    const recentActivities = activities.slice(-3).reverse();
    
    if (recentActivities.length === 0) {
      return (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No activities yet. Start moving!</Text>
        </Card>
      );
    }

    return recentActivities.map((activity) => (
      <Card key={activity.id} style={styles.activityCard}>
        <View style={styles.activityContent}>
          <View>
            <Text style={styles.activityName}>
              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
            </Text>
            <Text style={styles.activityDetails}>
              {activity.duration} min • {activity.calories} cal
            </Text>
          </View>
          <View style={styles.activityBadge}>
            <Text style={styles.activityBadgeText}>
              {activity.intensity.toUpperCase()}
            </Text>
          </View>
        </View>
      </Card>
    ));
  };

  const renderRecentMeals = () => {
    const recentMeals = meals.slice(-3).reverse();
    
    if (recentMeals.length === 0) {
      return (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No meals logged yet.</Text>
        </Card>
      );
    }

    return recentMeals.map((meal) => (
      <Card key={meal.id} style={styles.mealCard}>
        <View style={styles.mealContent}>
          <View>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealDetails}>
              {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)} • {meal.calories} cal
            </Text>
          </View>
          <Text style={styles.mealCalories}>{meal.calories}</Text>
        </View>
      </Card>
    ));
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.fullName}!</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</Text>
      </View>

      {/* Key Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Metrics</Text>
        <View style={styles.metricsGrid}>
          {renderMetricCard(
            'Steps',
            todayMetrics.steps.toLocaleString(),
            'steps',
            getStepsPercentage(),
            '#0a7ea4'
          )}
          {renderMetricCard(
            'Calories',
            todayMetrics.calories,
            'kcal',
            getCaloriesPercentage(),
            '#22c55e'
          )}
          {renderMetricCard(
            'Water',
            todayMetrics.water,
            'ml',
            getWaterPercentage(),
            '#3b82f6'
          )}
          {renderMetricCard(
            'Heart Rate',
            todayMetrics.heartRate,
            'bpm',
            Math.min((todayMetrics.heartRate / 100) * 100, 100),
            '#ef4444'
          )}
        </View>
      </View>

      {/* Rewards Section */}
      {wallet && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rewards</Text>
          <Card style={styles.rewardCard}>
            <View style={styles.rewardContent}>
              <View>
                <Text style={styles.rewardLabel}>HCH Balance</Text>
                <Text style={styles.rewardValue}>{wallet.balance.toFixed(2)}</Text>
              </View>
              <View style={styles.rewardDivider} />
              <View>
                <Text style={styles.rewardLabel}>USD Value</Text>
                <Text style={styles.rewardValue}>${wallet.usdValue.toFixed(2)}</Text>
              </View>
            </View>
          </Card>
        </View>
      )}

      {/* Recent Activities */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {renderRecentActivity()}
      </View>

      {/* Recent Meals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Meals</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {renderRecentMeals()}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🏃</Text>
            <Text style={styles.actionLabel}>Log Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🍽️</Text>
            <Text style={styles.actionLabel}>Log Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💧</Text>
            <Text style={styles.actionLabel}>Log Water</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>😴</Text>
            <Text style={styles.actionLabel}>Log Sleep</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#687076',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#11181c',
  },
  viewAll: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  metricsGrid: {
    gap: 12,
  },
  metricCard: {
    padding: 16,
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#687076',
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#11181c',
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: 12,
    color: '#687076',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  rewardCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  rewardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardLabel: {
    fontSize: 12,
    color: '#687076',
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  rewardDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  activityCard: {
    padding: 12,
    marginBottom: 8,
  },
  activityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 12,
    color: '#687076',
  },
  activityBadge: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activityBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  mealCard: {
    padding: 12,
    marginBottom: 8,
  },
  mealContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 4,
  },
  mealDetails: {
    fontSize: 12,
    color: '#687076',
  },
  mealCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#687076',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: (width - 40) / 2,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#11181c',
    textAlign: 'center',
  },
  spacer: {
    height: 40,
  },
});
