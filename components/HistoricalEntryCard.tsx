import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes, Spacing, BorderRadius } from '../constants/theme';

interface HistoricalEntryCardProps {
  year: number;
  date: string;
  content: string | null;
}

export default function HistoricalEntryCard({ year, date, content }: HistoricalEntryCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.year}>{year}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      {content ? (
        <Text style={styles.content}>{content}</Text>
      ) : (
        <Text style={styles.noContent}>No entry for this day</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  year: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.sans,
    color: Colors.secondary,
  },
  date: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.sans,
    color: Colors.secondary,
  },
  content: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.serifBody,
    color: Colors.foreground,
    lineHeight: 20,
  },
  noContent: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.serifBody,
    color: Colors.secondary,
    fontStyle: 'italic',
  },
});
