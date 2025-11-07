import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import StatusBar from '../../components/StatusBar';
import TabBar from '../../components/TabBar';
import GoalCard from '../../components/GoalCard';
import HistoricalEntryCard from '../../components/HistoricalEntryCard';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../../constants/theme';

interface HistoricalEntry {
  year: number;
  date: string;
  content: string | null;
}

export default function HomeScreen() {
  const [todayEntry, setTodayEntry] = useState('');
  const [monthlyGoal] = useState('Meditate 10 min daily');
  const [yearlyGoal] = useState('Learn to play the guitar');
  const router = useRouter();

  const currentDate = 'Monday, Nov 26';

  // Historical entries for the past 5 years
  const historicalEntries: HistoricalEntry[] = [
    {
      year: 2024,
      date: 'Nov 26, 2024',
      content: 'Today I reflected on how much growth I\'ve experienced this year. The journey of self-improvement is never-ending, but I\'m grateful for every small step forward. Music has become such an important part of my daily routine.',
    },
    {
      year: 2023,
      date: 'Nov 26, 2023',
      content: 'Spent the afternoon walking through the park. The autumn colors reminded me to appreciate the changing seasons of life. Started thinking seriously about picking up a new skill in the new year.',
    },
    {
      year: 2022,
      date: 'Nov 26, 2022',
      content: 'A quiet day of reading and reflection. Sometimes the best days are the simple ones where you can just be present with yourself.',
    },
    {
      year: 2021,
      date: 'Nov 26, 2021',
      content: null,
    },
    {
      year: 2020,
      date: 'Nov 26, 2020',
      content: 'Grateful for the people in my life and the opportunity to grow. This year has taught me so much about resilience and adapting to change.',
    },
  ];

  const handleSave = () => {
    console.log('Saving entry:', todayEntry);
    // TODO: Implement save functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.foreground} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>The Daily Record</Text>
        <View style={styles.navSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Header */}
        <Text style={styles.dateText}>{currentDate}</Text>

        {/* Today's Entry */}
        <View style={styles.entryContainer}>
          <Text style={styles.sectionTitle}>Today</Text>
          <TextInput
            style={styles.textArea}
            placeholder="What's on your mind today?"
            placeholderTextColor={Colors.secondary}
            value={todayEntry}
            onChangeText={setTodayEntry}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Goals Section */}
        <View style={styles.goalsContainer}>
          <GoalCard type="monthly" goal={monthlyGoal} progress={15} />
          <GoalCard type="yearly" goal={yearlyGoal} progress={45} />
        </View>

        {/* Historical Entries */}
        <View style={styles.historicalSection}>
          <Text style={styles.sectionTitle}>On This Day</Text>
          {historicalEntries.map((entry) => (
            <HistoricalEntryCard
              key={entry.year}
              year={entry.year}
              date={entry.date}
              content={entry.content}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <TabBar
        activeTab="home"
        onTabPress={(tab) => {
          if (tab !== 'home') {
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
  dateText: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.sans,
    color: Colors.secondary,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.serifHeader,
    color: Colors.foreground,
    marginBottom: Spacing.md,
    marginTop: Spacing.xl,
  },
  entryContainer: {
    marginBottom: Spacing.lg,
  },
  textArea: {
    backgroundColor: Colors.inputBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    fontSize: FontSizes.base,
    fontFamily: Fonts.serifBody,
    color: Colors.foreground,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
  },
  saveButtonText: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.sansMedium,
    color: Colors.primaryForeground,
  },
  goalsContainer: {
    marginTop: Spacing.lg,
  },
  historicalSection: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
});
