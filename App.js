import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const TABS = ["Home","Search"];
const TAB_WIDTH = 384 / TABS.length;

export default function App() {
  const offset = useSharedValue(-TAB_WIDTH);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  const handlePress = (tab) => {
    const newOffset = (() => {
      switch (tab) {
        case "Home":
          return -TAB_WIDTH;
        case "Search":
          return 0;
        case "Profile":
          return TAB_WIDTH;
        default:
        return -0.5*TAB_WIDTH;
      }
    })();
    offset.value = withTiming(newOffset);
  };

  const handlePress2 = (tab) => {
    const newOffset = (() => {
      switch (tab) {
        case "Home":
          return -0.5 * TAB_WIDTH;
        case "Search":
          return 0.5 * TAB_WIDTH;
         default:
          return -0.5*TAB_WIDTH
      }
    })();

    offset.value = withTiming(newOffset);
  };
  const handlePress3 = (tab) => {
    const newOffset = (() => {
      switch (tab) {
        case "Home":
          return -1.5 * TAB_WIDTH;
        case "Search":
          return -0.5 * TAB_WIDTH;
        case "Profile":
          return 0.5 * TAB_WIDTH;
        case "Setting":
          return 1.5 * TAB_WIDTH;
        default:
        return -1.5 * TAB_WIDTH;
      }
    })();
    offset.value = withTiming(newOffset);
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedBorder, animatedStyles]} />
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            style={
              i !== TABS.length - 1 ? [styles.tab, styles.divider] : styles.tab
            }
            onPress={() => {
              if (TABS.length == 2) {
                handlePress2(tab);
              } else if (TABS.length == 3) {
                handlePress(tab);
              } else if (TABS.length == 4) {
                handlePress3(tab);
              }
            }}
          >
            <Text style={styles.tabLabel}>{tab}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: TAB_WIDTH,
  },
  tabLabel: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  animatedBorder: {
    height: 50,
    width: TAB_WIDTH,
    backgroundColor: "pink",
    borderRadius: 20,
    position: "absolute",
  },
});
