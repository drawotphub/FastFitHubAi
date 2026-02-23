import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { glassTheme } from '../theme/glassTheme';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

export const GlassDashboard: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: glassTheme.colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingHorizontal: parseInt(glassTheme.spacing.lg),
      paddingVertical: parseInt(glassTheme.spacing.xl),
      borderBottomWidth: 1,
      borderBottomColor: glassTheme.glass.light.border,
    },
    headerTitle: {
      fontSize: parseInt(glassTheme.typography.sizes['3xl']),
      fontWeight: '700',
      color: glassTheme.colors.text,
      marginBottom: parseInt(glassTheme.spacing.sm),
    },
    headerSubtitle: {
      fontSize: parseInt(glassTheme.typography.sizes.base),
      color: glassTheme.colors.textSecondary,
    },
    scrollContent: {
      paddingHorizontal: parseInt(glassTheme.spacing.lg),
      paddingVertical: parseInt(glassTheme.spacing.xl),
    },
    section: {
      marginBottom: parseInt(glassTheme.spacing['3xl']),
    },
    sectionTitle: {
      fontSize: parseInt(glassTheme.typography.sizes.xl),
      fontWeight: '600',
      color: glassTheme.colors.text,
      marginBottom: parseInt(glassTheme.spacing.lg),
    },
    metricsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: parseInt(glassTheme.spacing.lg),
    },
    metricCard: {
      flex: 1,
      marginHorizontal: parseInt(glassTheme.spacing.sm),
    },
    metricValue: {
      fontSize: parseInt(glassTheme.typography.sizes['2xl']),
      fontWeight: '700',
      color: glassTheme.colors.primary,
      marginBottom: parseInt(glassTheme.spacing.sm),
    },
    metricLabel: {
      fontSize: parseInt(glassTheme.typography.sizes.sm),
      color: glassTheme.colors.textSecondary,
    },
    progressRing: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 8,
      borderColor: glassTheme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: parseInt(glassTheme.spacing.lg),
    },
    progressText: {
      fontSize: parseInt(glassTheme.typography.sizes['2xl']),
      fontWeight: '700',
      color: glassTheme.colors.text,
    },
    progressLabel: {
      fontSize: parseInt(glassTheme.typography.sizes.sm),
      color: glassTheme.colors.textSecondary,
      marginTop: parseInt(glassTheme.spacing.sm),
      textAlign: 'center',
    },
    buttonGroup: {
      flexDirection: 'row',
      gap: parseInt(glassTheme.spacing.md),
      marginTop: parseInt(glassTheme.spacing.lg),
    },
    button: {
      flex: 1,
    },
    rewardBadge: {
      backgroundColor: glassTheme.glass.gold.backgroundColor,
      borderWidth: 1,
      borderColor: glassTheme.colors.primary,
      borderRadius: parseInt(glassTheme.radius.full),
      paddingVertical: parseInt(glassTheme.spacing.md),
      paddingHorizontal: parseInt(glassTheme.spacing.lg),
      alignItems: 'center',
      marginBottom: parseInt(glassTheme.spacing.lg),
    },
    rewardText: {
      fontSize: parseInt(glassTheme.typography.sizes.lg),
      fontWeight: '700',
      color: glassTheme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back, Champion</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Reward */}
        <View style={styles.section}>
          <GlassCard variant="gold" padding={16}>
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>🏆 +50 HCH Earned Today</Text>
            </View>
          </GlassCard>
        </View>

        {/* Main Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Activity</Text>

          {/* Steps Progress Ring */}
          <GlassCard variant="medium" padding={20}>
            <View style={styles.progressRing}>
              <Text style={styles.progressText}>6,234</Text>
            </View>
            <Text style={styles.progressLabel}>Steps / 10,000 Goal</Text>
          </GlassCard>
        </View>

        {/* Quick Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>

          <View style={styles.metricsGrid}>
            <GlassCard variant="light" padding={12} style={styles.metricCard}>
              <Text style={styles.metricLabel}>Calories</Text>
              <Text style={styles.metricValue}>728</Text>
              <Text style={styles.metricLabel}>/ 2000 kcal</Text>
            </GlassCard>

            <GlassCard variant="light" padding={12} style={styles.metricCard}>
              <Text style={styles.metricLabel}>Water</Text>
              <Text style={styles.metricValue}>3.0L</Text>
              <Text style={styles.metricLabel}>/ 3.0L</Text>
            </GlassCard>
          </View>

          <View style={styles.metricsGrid}>
            <GlassCard variant="light" padding={12} style={styles.metricCard}>
              <Text style={styles.metricLabel}>Sleep</Text>
              <Text style={styles.metricValue}>7h 15m</Text>
              <Text style={styles.metricLabel}>Good</Text>
            </GlassCard>

            <GlassCard variant="light" padding={12} style={styles.metricCard}>
              <Text style={styles.metricLabel}>Heart Rate</Text>
              <Text style={styles.metricValue}>72</Text>
              <Text style={styles.metricLabel}>BPM</Text>
            </GlassCard>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.buttonGroup}>
            <GlassButton
              title="Log Activity"
              variant="primary"
              size="md"
              style={styles.button}
            />
            <GlassButton
              title="Log Meal"
              variant="secondary"
              size="md"
              style={styles.button}
            />
          </View>

          <View style={styles.buttonGroup}>
            <GlassButton
              title="View Wallet"
              variant="outline"
              size="md"
              style={styles.button}
            />
            <GlassButton
              title="Check Goals"
              variant="ghost"
              size="md"
              style={styles.button}
            />
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GlassDashboard;
