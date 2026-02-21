import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { useHealth } from '../contexts/HealthContext';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

export default function NutritionScreen() {
  const {
    meals,
    addMeal,
    getTotalCalories,
    getTotalProtein,
    getTotalCarbs,
    getTotalFat,
    nutritionGoals,
  } = useHealth();

  const [modalVisible, setModalVisible] = useState(false);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

  const handleAddMeal = async () => {
    if (!mealName || !calories) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await addMeal({
        name: mealName,
        calories: parseInt(calories),
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fat: parseInt(fat) || 0,
        mealType,
        timestamp: new Date(),
        verified: false,
      });

      setModalVisible(false);
      setMealName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
    } catch (error) {
      console.error('Failed to add meal:', error);
    }
  };

  const getMealIcon = (type: string) => {
    const icons: Record<string, string> = {
      breakfast: '🥐',
      lunch: '🍽️',
      dinner: '🍲',
      snack: '🍎',
    };
    return icons[type] || '🍽️';
  };

  const totalCalories = getTotalCalories();
  const totalProtein = getTotalProtein();
  const totalCarbs = getTotalCarbs();
  const totalFat = getTotalFat();

  const caloriePercentage = Math.min((totalCalories / nutritionGoals.dailyCalories) * 100, 100);
  const proteinPercentage = Math.min((totalProtein / nutritionGoals.protein) * 100, 100);
  const carbsPercentage = Math.min((totalCarbs / nutritionGoals.carbs) * 100, 100);
  const fatPercentage = Math.min((totalFat / nutritionGoals.fat) * 100, 100);

  const renderNutrientCard = (
    label: string,
    current: number,
    goal: number,
    unit: string,
    percentage: number,
    color: string
  ) => (
    <Card style={styles.nutrientCard}>
      <View style={styles.nutrientHeader}>
        <Text style={styles.nutrientLabel}>{label}</Text>
        <View style={[styles.percentageBadge, { backgroundColor: color }]}>
          <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
        </View>
      </View>
      <View style={styles.nutrientValue}>
        <Text style={styles.currentValue}>{current}</Text>
        <Text style={styles.goalValue}>/ {goal} {unit}</Text>
      </View>
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

  const renderMealCard = (meal: any) => (
    <Card key={meal.id} style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <View style={styles.mealInfo}>
          <Text style={styles.mealIcon}>{getMealIcon(meal.mealType)}</Text>
          <View style={styles.mealDetails}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealTime}>
              {new Date(meal.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
        <Text style={styles.mealCalories}>{meal.calories} cal</Text>
      </View>
      <View style={styles.mealMacros}>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>P</Text>
          <Text style={styles.macroValue}>{meal.protein}g</Text>
        </View>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>C</Text>
          <Text style={styles.macroValue}>{meal.carbs}g</Text>
        </View>
        <View style={styles.macro}>
          <Text style={styles.macroLabel}>F</Text>
          <Text style={styles.macroValue}>{meal.fat}g</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>Track your meals</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Nutrition</Text>
          {renderNutrientCard(
            'Calories',
            totalCalories,
            nutritionGoals.dailyCalories,
            'kcal',
            caloriePercentage,
            '#0a7ea4'
          )}
          {renderNutrientCard(
            'Protein',
            totalProtein,
            nutritionGoals.protein,
            'g',
            proteinPercentage,
            '#22c55e'
          )}
          {renderNutrientCard(
            'Carbs',
            totalCarbs,
            nutritionGoals.carbs,
            'g',
            carbsPercentage,
            '#f59e0b'
          )}
          {renderNutrientCard(
            'Fat',
            totalFat,
            nutritionGoals.fat,
            'g',
            fatPercentage,
            '#ef4444'
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {meals.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No meals logged yet.</Text>
            </Card>
          ) : (
            meals.map((meal) => renderMealCard(meal))
          )}
        </View>

        <View style={styles.spacer} />
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
              <Text style={styles.modalTitle}>Log Meal</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.label}>Meal Type</Text>
              <View style={styles.mealTypeGrid}>
                {mealTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.mealTypeButton,
                      mealType === type && styles.mealTypeButtonActive,
                    ]}
                    onPress={() => setMealType(type)}
                  >
                    <Text style={styles.mealTypeIcon}>{getMealIcon(type)}</Text>
                    <Text style={styles.mealTypeLabel}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Meal Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Grilled Chicken Salad"
                value={mealName}
                onChangeText={setMealName}
              />

              <Text style={styles.label}>Calories</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Macronutrients (optional)</Text>

              <View style={styles.macroInputRow}>
                <View style={styles.macroInput}>
                  <Text style={styles.macroInputLabel}>Protein (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={protein}
                    onChangeText={setProtein}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.macroInput}>
                  <Text style={styles.macroInputLabel}>Carbs (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={carbs}
                    onChangeText={setCarbs}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.macroInput}>
                  <Text style={styles.macroInputLabel}>Fat (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={fat}
                    onChangeText={setFat}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddMeal}
            >
              <Text style={styles.submitButtonText}>Log Meal</Text>
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
  nutrientCard: {
    padding: 16,
    marginBottom: 12,
  },
  nutrientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nutrientLabel: {
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
  nutrientValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  currentValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181c',
  },
  goalValue: {
    fontSize: 12,
    color: '#687076',
    marginLeft: 4,
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
  mealCard: {
    padding: 16,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  mealTime: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  mealCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  mealMacros: {
    flexDirection: 'row',
    gap: 16,
  },
  macro: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#687076',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
    marginTop: 2,
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
  mealTypeGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  mealTypeButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  mealTypeButtonActive: {
    backgroundColor: '#e0f2fe',
    borderColor: '#0a7ea4',
  },
  mealTypeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  mealTypeLabel: {
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
  macroInputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  macroInput: {
    flex: 1,
  },
  macroInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 8,
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
