import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Circle } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../constants/theme';

interface GoalCardProps {
  type: 'monthly' | 'yearly';
  goal: string;
  progress?: number; // 0-100 for yearly, 0-30 for monthly
}

export default function GoalCard({ type, goal, progress = 0 }: GoalCardProps) {
  const isMonthly = type === 'monthly';
  const totalDays = isMonthly ? 30 : 100;
  const completedDays = Math.min(progress, totalDays);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calendar size={16} color={Colors.secondary} strokeWidth={2} />
        <Text style={styles.headerText}>
          {isMonthly ? 'MONTHLY GOAL' : 'YEARLY GOAL'}
        </Text>
      </View>
      <Text style={styles.goalText}>{goal}</Text>
      
      {isMonthly ? (
        <View style={styles.dotsContainer}>
          {[...Array(totalDays)].map((_, i) => (
            <Circle
              key={i}
              size={4}
              fill={i < completedDays ? Colors.primary : 'transparent'}
              color={i < completedDays ? Colors.primary : Colors.secondary}
              strokeWidth={1}
            />
          ))}
        </View>
      ) : (
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${(completedDays / totalDays) * 100}%` }
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  headerText: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.sans,
    color: Colors.secondary,
    letterSpacing: 0.5,
  },
  goalText: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.serifBody,
    color: Colors.foreground,
    marginBottom: Spacing.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(163, 144, 129, 0.2)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
});
