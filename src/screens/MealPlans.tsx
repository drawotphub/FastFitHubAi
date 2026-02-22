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

interface MealPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  meals: number;
  calories: number;
  icon: string;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function MealPlansScreen() {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const mealPlans: MealPlan[] = [
    {
      id: '1',
      name: 'Muscle Building',
      description: 'High protein diet for muscle growth and strength',
      duration: '12 weeks',
      difficulty: 'Moderate',
      meals: 5,
      calories: 2800,
      icon: '💪',
      macros: { protein: 200, carbs: 280, fat: 93 },
    },
    {
      id: '2',
      name: 'Weight Loss',
      description: 'Calorie deficit diet for sustainable weight loss',
      duration: '8 weeks',
      difficulty: 'Easy',
      meals: 4,
      calories: 1800,
      icon: '⚖️',
      macros: { protein: 140, carbs: 180, fat: 60 },
    },
    {
      id: '3',
      name: 'Athletic Performance',
      description: 'Balanced nutrition for peak athletic performance',
      duration: '10 weeks',
      difficulty: 'Moderate',
      meals: 5,
      calories: 2500,
      icon: '🏅',
      macros: { protein: 175, carbs: 300, fat: 83 },
    },
    {
      id: '4',
      name: 'Keto Diet',
      description: 'Low carb, high fat ketogenic diet',
      duration: '6 weeks',
      difficulty: 'Advanced',
      meals: 4,
      calories: 2000,
      icon: '🥑',
      macros: { protein: 150, carbs: 50, fat: 150 },
    },
  ];

  const customMealPlans = [
    {
      id: '1',
      name: 'My Custom Plan',
      meals: 5,
      calories: 2200,
      progress: 45,
      daysLeft: 35,
      icon: '📋',
    },
  ];

  const sampleMeals = [
    {
      id: '1',
      name: 'Grilled Chicken Breast',
      calories: 350,
      protein: 45,
      carbs: 0,
      fat: 18,
      icon: '🍗',
    },
    {
      id: '2',
      name: 'Brown Rice',
      calories: 215,
      protein: 5,
      carbs: 45,
      fat: 2,
      icon: '🍚',
    },
    {
      id: '3',
      name: 'Broccoli',
      calories: 55,
      protein: 4,
      carbs: 11,
      fat: 1,
      icon: '🥦',
    },
    {
      id: '4',
      name: 'Salmon',
      calories: 280,
      protein: 35,
      carbs: 0,
      fat: 14,
      icon: '🐟',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#22c55e';
      case 'Moderate':
        return '#f59e0b';
      case 'Advanced':
        return '#ef4444';
      default:
        return '#0a7ea4';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍽️ Meal Plans</Text>
          <Text style={styles.headerSubtitle}>Customized nutrition plans</Text>
        </View>

        {/* My Plans */}
        {customMealPlans.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Active Plans</Text>
            {customMealPlans.map((plan) => (
              <View key={plan.id} style={styles.activePlanCard}>
                <View style={styles.planHeader}>
                  <Text style={styles.planIcon}>{plan.icon}</Text>
                  <View style={styles.planInfo}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planStats}>
                      {plan.meals} meals • {plan.calories} cal/day
                    </Text>
                  </View>
                </View>

                <View style={styles.progressSection}>
                  <View style={styles.progressBar}>
                    <View
                      style={[styles.progressFill, { width: `${plan.progress}%` }]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {plan.progress}% complete • {plan.daysLeft} days left
                  </Text>
                </View>

                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Plan →</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Preset Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preset Plans</Text>
          {mealPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={styles.planCard}
              onPress={() => {
                setSelectedPlan(plan);
                setModalVisible(true);
              }}
            >
              <View style={styles.planCardHeader}>
                <Text style={styles.planCardIcon}>{plan.icon}</Text>
                <View style={styles.planCardInfo}>
                  <Text style={styles.planCardName}>{plan.name}</Text>
                  <Text style={styles.planCardDescription}>{plan.description}</Text>
                </View>
              </View>

              <View style={styles.planCardMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Duration</Text>
                  <Text style={styles.metaValue}>{plan.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Meals/Day</Text>
                  <Text style={styles.metaValue}>{plan.meals}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Calories</Text>
                  <Text style={styles.metaValue}>{plan.calories}</Text>
                </View>
              </View>

              <View style={styles.macrosPreview}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Protein</Text>
                  <Text style={styles.macroValue}>{plan.macros.protein}g</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Carbs</Text>
                  <Text style={styles.macroValue}>{plan.macros.carbs}g</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Fat</Text>
                  <Text style={styles.macroValue}>{plan.macros.fat}g</Text>
                </View>
              </View>

              <View style={styles.difficultyBadge}>
                <Text
                  style={[
                    styles.difficultyText,
                    { color: getDifficultyColor(plan.difficulty) },
                  ]}
                >
                  {plan.difficulty}
                </Text>
              </View>

              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select Plan</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Food Database */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Foods</Text>
          <View style={styles.foodGrid}>
            {sampleMeals.map((meal) => (
              <TouchableOpacity key={meal.id} style={styles.foodCard}>
                <Text style={styles.foodIcon}>{meal.icon}</Text>
                <Text style={styles.foodName}>{meal.name}</Text>
                <Text style={styles.foodCalories}>{meal.calories} cal</Text>
                <View style={styles.foodMacros}>
                  <Text style={styles.foodMacroItem}>P:{meal.protein}g</Text>
                  <Text style={styles.foodMacroItem}>C:{meal.carbs}g</Text>
                  <Text style={styles.foodMacroItem}>F:{meal.fat}g</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Add</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan Features</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureTitle}>Personalized</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureTitle}>Tracking</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔄</Text>
              <Text style={styles.featureTitle}>Adjustable</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureTitle}>Mobile</Text>
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
                    <Text style={styles.detailLabel}>Meals per Day:</Text>
                    <Text style={styles.detailValue}>{selectedPlan.meals}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Daily Calories:</Text>
                    <Text style={styles.detailValue}>{selectedPlan.calories}</Text>
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
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Macronutrients</Text>
                  <View style={styles.macroBreakdown}>
                    <View style={styles.macroBreakdownItem}>
                      <Text style={styles.macroBreakdownLabel}>Protein</Text>
                      <Text style={styles.macroBreakdownValue}>
                        {selectedPlan.macros.protein}g
                      </Text>
                      <Text style={styles.macroBreakdownPercent}>
                        {Math.round(
                          (selectedPlan.macros.protein * 4) / selectedPlan.calories * 100
                        )}
                        %
                      </Text>
                    </View>
                    <View style={styles.macroBreakdownItem}>
                      <Text style={styles.macroBreakdownLabel}>Carbs</Text>
                      <Text style={styles.macroBreakdownValue}>
                        {selectedPlan.macros.carbs}g
                      </Text>
                      <Text style={styles.macroBreakdownPercent}>
                        {Math.round(
                          (selectedPlan.macros.carbs * 4) / selectedPlan.calories * 100
                        )}
                        %
                      </Text>
                    </View>
                    <View style={styles.macroBreakdownItem}>
                      <Text style={styles.macroBreakdownLabel}>Fat</Text>
                      <Text style={styles.macroBreakdownValue}>
                        {selectedPlan.macros.fat}g
                      </Text>
                      <Text style={styles.macroBreakdownPercent}>
                        {Math.round(
                          (selectedPlan.macros.fat * 9) / selectedPlan.calories * 100
                        )}
                        %
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.enrollButton}>
                  <Text style={styles.enrollButtonText}>Start This Plan</Text>
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
  activePlanCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#0a7ea4',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  planStats: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0a7ea4',
  },
  progressText: {
    fontSize: 12,
    color: '#687076',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
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
  planCardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  planCardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  planCardInfo: {
    flex: 1,
  },
  planCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181c',
  },
  planCardDescription: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  planCardMeta: {
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
  macrosPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 11,
    color: '#687076',
    fontWeight: '500',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginTop: 2,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    marginBottom: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  foodCard: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  foodIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#11181c',
    textAlign: 'center',
  },
  foodCalories: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a7ea4',
    marginTop: 4,
  },
  foodMacros: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  foodMacroItem: {
    fontSize: 10,
    color: '#687076',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  macroBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  macroBreakdownItem: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  macroBreakdownLabel: {
    fontSize: 12,
    color: '#687076',
    fontWeight: '500',
  },
  macroBreakdownValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#11181c',
    marginTop: 4,
  },
  macroBreakdownPercent: {
    fontSize: 12,
    color: '#0a7ea4',
    fontWeight: '600',
    marginTop: 2,
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
