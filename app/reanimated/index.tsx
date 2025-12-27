import Button from "@/components/Button";
import React from "react";
import { View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Reanimated = () => {
  const width = useSharedValue(100);
  const handlePress = () => {
    width.value = withTiming(Math.random() * 400 + 50);
  };

  return (
    <SafeAreaView
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <Animated.View
        style={{
          width: width,
          height: 100,
          backgroundColor: "olive",
          borderRadius: 10,
          margin: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        }}
      />
      <View style={{ margin: 20 }}>
        <Button title="Press me" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

export default Reanimated;
