import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const TAB_WIDTH = 120;
const TABS = ['Home', 'Search', 'Profile'];

export default function App() {
  const offset = useSharedValue(-TAB_WIDTH);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const handlePress = (tab) => {
    const newOffset = (() => {
      switch (tab) {
        case 'Home':
          return -TAB_WIDTH;
        case 'Search':
          return 0;
        case 'Profile':
          return TAB_WIDTH;
        default:
          return -TAB_WIDTH;
      }
    })();

    offset.value = withTiming(newOffset);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedFill, animatedStyles]} />
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            style={
              i !== TABS.length - 1 ? [styles.tab, styles.divider] : styles.tab
            }
            onPress={() => handlePress(tab)}>
            <Text style={styles.tabLabel}>{tab}</Text>
          </Pressable>
        ))}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: TAB_WIDTH,
  },
  tabLabel: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  animatedFill: {
    height: 50,
    width: 120,
    backgroundColor: 'pink',
    borderRadius: 20,
    position:"absolute"
  },
});
