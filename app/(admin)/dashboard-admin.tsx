/**
 * Dashboard principal - Pantalla después del login exitoso
 * Estilo moderno con estadísticas, gráficos y navegación
 */

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { StatCard } from '@/components/ui';

export default function Dashboard() {
  const router = useRouter();

  // Datos ficticios para el gráfico de revenue
  const chartData = {
    labels: ['10AM', '11AM', '12PM', '01PM', '02PM', '03PM', '04PM'],
    datasets: [
      {
        data: [400, 450, 380, 500, 420, 480, 520],
        color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 107, 53, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    propsForDots: {
      r: '0',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#f1f5f9',
      strokeWidth: 1,
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>👋 Hola, Admin</Text>
            <Text style={styles.subtitle}>Bienvenido de vuelta</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Tarjetas de estadísticas */}
        <View style={styles.statsContainer}>
          <StatCard value="20" label="Running Orders" color="#FF6B35" style={styles.statCard} />
          <StatCard value="05" label="Order Request" color="#9CA3AF" style={styles.statCard} />
        </View>

        {/* Sección de Revenue */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Total Revenue</Text>
            <View style={styles.revenueInfo}>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>Daily</Text>
                <Ionicons name="chevron-down" size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.detailsLink}>See Details</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.revenueAmount}>$2,241</Text>
          
          {/* Gráfico */}
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 48}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLabels={true}
              withHorizontalLabels={false}
              withDots={false}
              withShadow={false}
            />
            {/* Tooltip simulado */}
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>$500</Text>
            </View>
          </View>
        </View>

        {/* Sección de Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.detailsLink}>See All Reviews</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewBox}>
            <View style={styles.reviewRating}>
              <Ionicons name="star" size={24} color="#FF6B35" />
              <Text style={styles.ratingValue}>4.9</Text>
            </View>
            <Text style={styles.reviewCount}>Total 20 Reviews</Text>
          </View>
        </View>

        {/* Sección de Items Populares */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items This Weeks</Text>
            <TouchableOpacity>
              <Text style={styles.detailsLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemsScroll}>
            <View style={styles.itemCard}>
              <View style={styles.itemImage}>
                <Text style={styles.itemEmoji}>🍗</Text>
              </View>
              <Text style={styles.itemName}>Chicken Wings</Text>
            </View>
            <View style={styles.itemCard}>
              <View style={styles.itemImage}>
                <Text style={styles.itemEmoji}>🍕</Text>
              </View>
              <Text style={styles.itemName}>Pizza Special</Text>
            </View>
            <View style={styles.itemCard}>
              <View style={styles.itemImage}>
                <Text style={styles.itemEmoji}>🍔</Text>
              </View>
              <Text style={styles.itemName}>Burger Deluxe</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={24} color="#FF6B35" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="list-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/login')}
        >
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  revenueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailsLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  chartContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  chart: {
    marginLeft: -16,
    borderRadius: 16,
  },
  tooltip: {
    position: 'absolute',
    top: 40,
    left: '35%',
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemsScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  itemCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: 140,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  itemEmoji: {
    fontSize: 48,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  bottomSpacer: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  navItem: {
    padding: 8,
  },
  navButton: {
    backgroundColor: '#FF6B35',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginTop: -28,
  },
});
