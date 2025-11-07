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

export default function AnalyzerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.foreground} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Analyzer</Text>
        <View style={styles.navSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderTitle}>Journal Analyzer</Text>
          <Text style={styles.placeholderText}>
            Gain insights from your journal entries. Discover patterns in your thoughts, emotions, and experiences over time.
          </Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Coming Soon</Text>
            <Text style={styles.featureText}>
              • Mood tracking and trends{'\n'}
              • Word cloud visualization{'\n'}
              • Writing frequency analysis{'\n'}
              • Topic detection{'\n'}
              • Personal growth insights
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <TabBar
        activeTab="analyzer"
        onTabPress={(tab) => {
          if (tab === 'home') {
            router.push('/(tabs)/');
          } else if (tab !== 'analyzer') {
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
