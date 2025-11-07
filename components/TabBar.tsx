import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Calendar, Sparkles, Search, User } from 'lucide-react-native';
import { Colors, Fonts, FontSizes, Spacing } from '../constants/theme';

interface TabBarProps {
  activeTab: 'home' | 'calendar' | 'analyzer' | 'search' | 'profile';
  onTabPress: (tab: 'home' | 'calendar' | 'analyzer' | 'search' | 'profile') => void;
}

export default function TabBar({ activeTab, onTabPress }: TabBarProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'calendar' as const, icon: Calendar, label: 'Calendar' },
    { id: 'analyzer' as const, icon: Sparkles, label: 'Analyzer' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Icon
                size={24}
                color={isActive ? Colors.primary : Colors.secondary}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? Colors.primary : Colors.secondary }
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    maxWidth: 448,
    marginHorizontal: 'auto',
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.sans,
  },
});
