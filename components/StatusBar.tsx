import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes } from '../constants/theme';

export default function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.rightIcons}>
        {/* Signal strength */}
        <View style={styles.signalBars}>
          <View style={[styles.bar, { height: 4 }]} />
          <View style={[styles.bar, { height: 6 }]} />
          <View style={[styles.bar, { height: 8 }]} />
          <View style={[styles.bar, { height: 10 }]} />
        </View>
        {/* WiFi */}
        <View style={styles.wifi}>
          <View style={styles.wifiArc1} />
          <View style={styles.wifiArc2} />
          <View style={styles.wifiArc3} />
        </View>
        {/* Battery */}
        <View style={styles.battery}>
          <View style={styles.batteryInner} />
          <View style={styles.batteryTip} />
        </View>
        <Text style={styles.batteryText}>100%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 4,
  },
  time: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.sans,
    color: Colors.foreground,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1,
    height: 12,
  },
  bar: {
    width: 3,
    backgroundColor: Colors.foreground,
    borderRadius: 1,
  },
  wifi: {
    width: 15,
    height: 12,
    position: 'relative',
  },
  wifiArc1: {
    position: 'absolute',
    bottom: 0,
    left: 6,
    width: 3,
    height: 3,
    backgroundColor: Colors.foreground,
    borderRadius: 1.5,
  },
  wifiArc2: {
    position: 'absolute',
    bottom: 2,
    left: 3,
    width: 9,
    height: 6,
    borderWidth: 2,
    borderColor: Colors.foreground,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: 0,
  },
  wifiArc3: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    width: 15,
    height: 9,
    borderWidth: 2,
    borderColor: Colors.foreground,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomWidth: 0,
  },
  battery: {
    width: 24,
    height: 11,
    borderWidth: 1.5,
    borderColor: Colors.foreground,
    borderRadius: 3,
    padding: 1.5,
    position: 'relative',
  },
  batteryInner: {
    flex: 1,
    backgroundColor: Colors.foreground,
    borderRadius: 1,
  },
  batteryTip: {
    position: 'absolute',
    right: -3,
    top: 3,
    width: 2,
    height: 5,
    backgroundColor: Colors.foreground,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
  },
  batteryText: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.sans,
    color: Colors.foreground,
    marginLeft: 2,
  },
});
