import Button from "@/components/Button";
import { IconChevronRightPipe } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const COLORS = [
  // Primary palette
  "#0033cc", // Blue
  "#cc0000", // Red
  "#00cc33", // Green
  "#9933cc", // Purple
  "#000000", // Black
  // Extended palette
  "#ff6600", // Orange
  "#ffcc00", // Yellow
  "#00cccc", // Cyan
  "#ff3399", // Pink
  "#666666", // Gray
  "#006633", // Dark Green
  "#990033", // Burgundy
  "#663399", // Rebecca Purple
  "#3366ff", // Light Blue

  // Additional dark colours
  "#1a1a1a", // Charcoal
  "#2d2d2d", // Dark Gray
  "#1a0033", // Midnight Blue
  "#330011", // Dark Burgundy
  "#001a00", // Forest Black
];
const Index = () => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  return (
    <View style={styles.container}>
      <View style={{ height: 60 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorContainer}
        >
          {COLORS.map((color) => (
            <Pressable
              key={color}
              onPress={() => setSelectedColor(color)}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor,
              ]}
            />
          ))}
        </ScrollView>
      </View>

      <Button
        title="Button Component"
        color={selectedColor}
        onPress={() => {
          router.navigate("/animated-feb");
        }}
        Icons={<IconChevronRightPipe color="#fff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    gap: 30,
  },
  colorContainer: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: "#fff",
    borderWidth: 1,
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Index;
