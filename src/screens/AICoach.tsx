import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: number;
  estimatedTime: string;
  icon: string;
}

export default function AICoachScreen() {
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const trainingPlans: TrainingPlan[] = [
    {
      id: '1',
      name: 'Full Body Strength',
      description: 'Build muscle and increase overall strength with compound movements',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      exercises: 12,
      estimatedTime: '45 min',
      icon: '💪',
    },
    {
      id: '2',
      name: 'Cardio Blast',
      description: 'Improve cardiovascular endurance and burn calories efficiently',
      duration: '3 weeks',
      difficulty: 'Beginner',
      exercises: 8,
      estimatedTime: '30 min',
      icon: '🏃',
    },
    {
      id: '3',
      name: 'HIIT Extreme',
      description: 'High-intensity interval training for maximum calorie burn',
      duration: '6 weeks',
      difficulty: 'Advanced',
      exercises: 10,
      estimatedTime: '20 min',
      icon: '⚡',
    },
    {
      id: '4',
      name: 'Flexibility & Core',
      description: 'Improve flexibility, balance, and core stability',
      duration: '2 weeks',
      difficulty: 'Beginner',
      exercises: 6,
      estimatedTime: '25 min',
      icon: '🧘',
    },
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Increase Water Intake',
      description: 'You\'re averaging 4 glasses/day. Try to reach 8 glasses for better performance.',
      priority: 'High',
      icon: '💧',
    },
    {
      id: '2',
      title: 'Add Rest Day',
      description: 'You\'ve worked out 6 days this week. Take a rest day to recover.',
      priority: 'High',
      icon: '😴',
    },
    {
      id: '3',
      title: 'Increase Protein',
      description: 'Your protein intake is 25% below goal. Add more lean proteins to your diet.',
      priority: 'Medium',
      icon: '🍗',
    },
    {
      id: '4',
      title: 'Try New Exercises',
      description: 'You\'ve been doing the same workouts. Vary your routine for better results.',
      priority: 'Medium',
      icon: '🔄',
    },
  ];

  const aiInsights = [
    {
      id: '1',
      metric: 'Progress Score',
      value: '87%',
      trend: '↑ +12%',
      description: 'Great progress this week!',
    },
    {
      id: '2',
      metric: 'Consistency',
      value: '92%',
      trend: '↑ +5%',
      description: 'You\'re very consistent with workouts',
    },
    {
      id: '3',
      metric: 'Nutrition Score',
      value: '72%',
      trend: '↓ -3%',
      description: 'Focus on macro balance',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#22c55e';
      case 'Intermediate':
        return '#f59e0b';
      case 'Advanced':
        return '#ef4444';
      default:
        return '#0a7ea4';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'High' ? '#ef4444' : '#f59e0b';
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🤖 AI Coach</Text>
          <Text style={styles.headerSubtitle}>Personalized Training & Nutrition</Text>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.insightsScroll}
          >
            {aiInsights.map((insight) => (
              <View key={insight.id} style={styles.insightCard}>
                <Text style={styles.insightLabel}>{insight.metric}</Text>
                <Text style={styles.insightValue}>{insight.value}</Text>
                <Text style={styles.insightTrend}>{insight.trend}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* AI Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Recommendations</Text>
          {recommendations.map((rec) => (
            <View key={rec.id} style={styles.recommendationCard}>
              <View style={styles.recHeader}>
                <Text style={styles.recIcon}>{rec.icon}</Text>
                <View style={styles.recContent}>
                  <Text style={styles.recTitle}>{rec.title}</Text>
                  <Text style={styles.recDescription}>{rec.description}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(rec.priority) },
                ]}
              >
                <Text style={styles.priorityText}>{rec.priority}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Personalized Training Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Plans</Text>
          {trainingPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={styles.planCard}
              onPress={() => {
                setSelectedPlan(plan);
                setModalVisible(true);
              }}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planIcon}>{plan.icon}</Text>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                </View>
              </View>
              <View style={styles.planMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Duration</Text>
                  <Text style={styles.metaValue}>{plan.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Difficulty</Text>
                  <Text
                    style={[
                      styles.metaValue,
                      { color: getDifficultyColor(plan.difficulty) },
                    ]}
                  >
                    {plan.difficulty}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Time</Text>
                  <Text style={styles.metaValue}>{plan.estimatedTime}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Plan →</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Features</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureTitle}>Analytics</Text>
              <Text style={styles.featureDesc}>Detailed performance metrics</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureTitle}>Goal Setting</Text>
              <Text style={styles.featureDesc}>Smart goal recommendations</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🔔</Text>
              <Text style={styles.featureTitle}>Smart Alerts</Text>
              <Text style={styles.featureDesc}>Personalized notifications</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🏅</Text>
              <Text style={styles.featureTitle}>Achievements</Text>
              <Text style={styles.featureDesc}>Earn badges & rewards</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Plan Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {selectedPlan && (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalIcon}>{selectedPlan.icon}</Text>
                  <Text style={styles.modalTitle}>{selectedPlan.name}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Overview</Text>
                  <Text style={styles.modalDescription}>{selectedPlan.description}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Plan Details</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Duration:</Text>
                    <Text style={styles.detailValue}>{selectedPlan.duration}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Difficulty:</Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: getDifficultyColor(selectedPlan.difficulty) },
                      ]}
                    >
                      {selectedPlan.difficulty}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Exercises:</Text>
                    <Text style={styles.detailValue}>{selectedPlan.exercises}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Per Session:</Text>
                    <Text style={styles.detailValue}>{selectedPlan.estimatedTime}</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>What's Included</Text>
                  <Text style={styles.includeItem}>✓ Customized workout routines</Text>
                  <Text style={styles.includeItem}>✓ Progress tracking</Text>
                  <Text style={styles.includeItem}>✓ Nutrition guidance</Text>
                  <Text style={styles.includeItem}>✓ AI coaching tips</Text>
                  <Text style={styles.includeItem}>✓ Weekly adjustments</Text>
                </View>

                <TouchableOpacity style={styles.enrollButton}>
                  <Text style={styles.enrollButtonText}>Enroll in Plan</Text>
                </TouchableOpacity>
              </ScrollView>
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
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#687076',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 12,
  },
  insightsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  insightCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  insightLabel: {
    fontSize: 12,
    color: '#687076',
    fontWeight: '500',
  },
  insightValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0a7ea4',
    marginTop: 4,
  },
  insightTrend: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
    marginTop: 4,
  },
  insightDescription: {
    fontSize: 11,
    color: '#687076',
    marginTop: 4,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
  },
  recHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  recDescription: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  planHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  planIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
  },
  planDescription: {
    fontSize: 12,
    color: '#687076',
    marginTop: 4,
  },
  planMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 11,
    color: '#687076',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginTop: 2,
  },
  startButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 11,
    color: '#687076',
    marginTop: 4,
    textAlign: 'center',
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
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#687076',
  },
  modalHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#11181c',
    textAlign: 'center',
  },
  modalSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#687076',
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#687076',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  includeItem: {
    fontSize: 14,
    color: '#11181c',
    paddingVertical: 6,
  },
  enrollButton: {
    backgroundColor: '#0a7ea4',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  enrollButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
