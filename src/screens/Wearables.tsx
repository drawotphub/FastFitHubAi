import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface WearableDevice {
  id: string;
  name: string;
  type: string;
  icon: string;
  connected: boolean;
  lastSync: string;
  metrics: string[];
  battery?: string;
}

export default function WearablesScreen() {
  const [devices, setDevices] = useState<WearableDevice[]>([
    {
      id: '1',
      name: 'Apple Watch Series 8',
      type: 'Apple Watch',
      icon: '⌚',
      connected: true,
      lastSync: '2 minutes ago',
      metrics: ['Heart Rate', 'Steps', 'Calories', 'Workout', 'Sleep'],
      battery: '85%',
    },
    {
      id: '2',
      name: 'Fitbit Charge 6',
      type: 'Fitbit',
      icon: '📱',
      connected: true,
      lastSync: '5 minutes ago',
      metrics: ['Steps', 'Heart Rate', 'Sleep', 'Calories', 'SpO2'],
      battery: '92%',
    },
    {
      id: '3',
      name: 'Google Fit',
      type: 'Google Fit',
      icon: '🔴',
      connected: false,
      lastSync: 'Not connected',
      metrics: ['Steps', 'Distance', 'Calories', 'Heart Points'],
    },
  ]);

  const [autoSync, setAutoSync] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState('Real-time');

  const toggleDevice = (id: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, connected: !device.connected } : device
      )
    );
  };

  const syncedMetrics = [
    {
      id: '1',
      name: 'Steps',
      value: '8,234',
      goal: '10,000',
      percentage: 82,
      icon: '👟',
      devices: ['Apple Watch', 'Fitbit'],
    },
    {
      id: '2',
      name: 'Heart Rate',
      value: '72 bpm',
      goal: '60-100 bpm',
      percentage: 100,
      icon: '❤️',
      devices: ['Apple Watch', 'Fitbit'],
    },
    {
      id: '3',
      name: 'Calories',
      value: '520 kcal',
      goal: '2,000 kcal',
      percentage: 26,
      icon: '🔥',
      devices: ['Apple Watch', 'Fitbit'],
    },
    {
      id: '4',
      name: 'Sleep',
      value: '7.5 hrs',
      goal: '8 hrs',
      percentage: 94,
      icon: '😴',
      devices: ['Apple Watch', 'Fitbit'],
    },
  ];

  const availableWearables = [
    {
      id: '1',
      name: 'Apple Health',
      description: 'Sync with Apple Health app',
      icon: '🍎',
      metrics: 18,
    },
    {
      id: '2',
      name: 'Fitbit',
      description: 'Connect your Fitbit device',
      icon: '📱',
      metrics: 12,
    },
    {
      id: '3',
      name: 'Google Fit',
      description: 'Sync with Google Fit',
      icon: '🔴',
      metrics: 10,
    },
    {
      id: '4',
      name: 'Garmin',
      description: 'Connect Garmin devices',
      icon: '⌚',
      metrics: 15,
    },
    {
      id: '5',
      name: 'Oura Ring',
      description: 'Sync Oura Ring data',
      icon: '💍',
      metrics: 8,
    },
    {
      id: '6',
      name: 'Whoop Band',
      description: 'Connect WHOOP band',
      icon: '🎯',
      metrics: 6,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⌚ Wearables</Text>
          <Text style={styles.headerSubtitle}>Connect your fitness devices</Text>
        </View>

        {/* Connected Devices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={styles.deviceHeader}>
                <View style={styles.deviceInfo}>
                  <Text style={styles.deviceIcon}>{device.icon}</Text>
                  <View style={styles.deviceDetails}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceType}>{device.type}</Text>
                  </View>
                </View>
                <View style={styles.deviceStatus}>
                  {device.connected && (
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>✓ Connected</Text>
                    </View>
                  )}
                  {!device.connected && (
                    <View style={[styles.statusBadge, styles.disconnected]}>
                      <Text style={styles.statusTextDisconnected}>✕ Disconnected</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.deviceMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Last Sync</Text>
                  <Text style={styles.metaValue}>{device.lastSync}</Text>
                </View>
                {device.battery && (
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Battery</Text>
                    <Text style={styles.metaValue}>{device.battery}</Text>
                  </View>
                )}
              </View>

              <View style={styles.metricsContainer}>
                <Text style={styles.metricsLabel}>Syncing:</Text>
                <View style={styles.metricsList}>
                  {device.metrics.map((metric, index) => (
                    <View key={index} style={styles.metricTag}>
                      <Text style={styles.metricTagText}>{metric}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.deviceActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>🔄 Sync Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.disconnectButton]}
                  onPress={() => toggleDevice(device.id)}
                >
                  <Text style={styles.disconnectButtonText}>Disconnect</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Sync Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sync Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Auto Sync</Text>
                <Text style={styles.settingDescription}>Automatically sync data</Text>
              </View>
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: '#e5e7eb', true: '#0a7ea4' }}
                thumbColor={autoSync ? '#fff' : '#f0f0f0'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Sync Frequency</Text>
              <Text style={styles.syncFrequency}>{syncFrequency}</Text>
            </View>
          </View>
        </View>

        {/* Synced Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synced Metrics</Text>
          {syncedMetrics.map((metric) => (
            <View key={metric.id} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricIcon}>{metric.icon}</Text>
                <View style={styles.metricContent}>
                  <Text style={styles.metricName}>{metric.name}</Text>
                  <Text style={styles.metricDevices}>
                    From: {metric.devices.join(', ')}
                  </Text>
                </View>
              </View>

              <View style={styles.metricValue}>
                <Text style={styles.metricValueText}>{metric.value}</Text>
                <Text style={styles.metricGoal}>{metric.goal}</Text>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min(metric.percentage, 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressPercent}>{metric.percentage}%</Text>
            </View>
          ))}
        </View>

        {/* Available Wearables */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Wearables</Text>
          <View style={styles.wearablesGrid}>
            {availableWearables.map((wearable) => (
              <TouchableOpacity key={wearable.id} style={styles.wearableCard}>
                <Text style={styles.wearableIcon}>{wearable.icon}</Text>
                <Text style={styles.wearableName}>{wearable.name}</Text>
                <Text style={styles.wearableDesc}>{wearable.description}</Text>
                <Text style={styles.wearableMetrics}>{wearable.metrics} metrics</Text>
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
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
  deviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  deviceType: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  deviceStatus: {
    marginLeft: 12,
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22c55e',
  },
  disconnected: {
    backgroundColor: '#fee2e2',
  },
  statusTextDisconnected: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ef4444',
  },
  deviceMeta: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: '#687076',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#11181c',
    marginTop: 2,
  },
  metricsContainer: {
    marginBottom: 12,
  },
  metricsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#11181c',
    marginBottom: 8,
  },
  metricsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  metricTag: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  metricTagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#0a7ea4',
  },
  deviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  disconnectButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  disconnectButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#687076',
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  settingDescription: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  syncFrequency: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  metricContent: {
    flex: 1,
  },
  metricName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181c',
  },
  metricDevices: {
    fontSize: 11,
    color: '#687076',
    marginTop: 2,
  },
  metricValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricValueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  metricGoal: {
    fontSize: 12,
    color: '#687076',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0a7ea4',
  },
  progressPercent: {
    fontSize: 11,
    color: '#687076',
    fontWeight: '500',
  },
  wearablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  wearableCard: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  wearableIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  wearableName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#11181c',
    textAlign: 'center',
  },
  wearableDesc: {
    fontSize: 10,
    color: '#687076',
    marginTop: 2,
    textAlign: 'center',
  },
  wearableMetrics: {
    fontSize: 11,
    color: '#0a7ea4',
    fontWeight: '600',
    marginTop: 4,
  },
  connectButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  connectButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  spacer: {
    height: 40,
  },
});
