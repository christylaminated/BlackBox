import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import StatusBar from '../../components/StatusBar';
import TabBar from '../../components/TabBar';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../../constants/theme';

export default function SearchScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.foreground} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Search</Text>
        <View style={styles.navSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderTitle}>Search Entries</Text>
          <Text style={styles.placeholderText}>
            Find specific entries, memories, or thoughts from your journal. Search by keywords, dates, or topics.
          </Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Coming Soon</Text>
            <Text style={styles.featureText}>
              • Full-text search{'\n'}
              • Filter by date range{'\n'}
              • Tag-based search{'\n'}
              • Search history{'\n'}
              • Advanced filters
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <TabBar
        activeTab="search"
        onTabPress={(tab) => {
          if (tab === 'home') {
            router.push('/(tabs)/');
          } else if (tab !== 'search') {
            router.push(`/(tabs)/${tab}`);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
  },
  backButton: {
    padding: Spacing.sm,
  },
  navTitle: {
    fontSize: FontSizes.lg,
    fontFamily: Fonts.serifHeader,
    color: Colors.foreground,
  },
  navSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  placeholderContainer: {
    flex: 1,
    paddingTop: Spacing.xxl,
  },
  placeholderTitle: {
    fontSize: FontSizes.xxl,
    fontFamily: Fonts.serifHeader,
    color: Colors.foreground,
    marginBottom: Spacing.lg,
  },
  placeholderText: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.serifBody,
    color: Colors.secondary,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  featureCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
  },
  featureTitle: {
    fontSize: FontSizes.lg,
    fontFamily: Fonts.serifHeader,
    color: Colors.foreground,
    marginBottom: Spacing.md,
  },
  featureText: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.serifBody,
    color: Colors.foreground,
    lineHeight: 24,
  },
});
