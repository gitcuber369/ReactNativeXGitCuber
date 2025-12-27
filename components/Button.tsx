import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

const parseColor = (hex: string) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return [r, g, b];
};

const interpolateHex = (c1: string, c2: string, factor: number) => {
  const [r1, g1, b1] = parseColor(c1);
  const [r2, g2, b2] = parseColor(c2);
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const useSmoothColor = (targetColor: string, duration = 300) => {
  const [color, setColor] = useState(targetColor);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const startColorRef = useRef(targetColor);
  const targetColorRef = useRef(targetColor);

  useEffect(() => {
    if (targetColor === targetColorRef.current) return;

    startColorRef.current = color;
    targetColorRef.current = targetColor;
    startTimeRef.current = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      const progress = Math.min(1, elapsed / duration);

      const nextColor = interpolateHex(
        startColorRef.current,
        targetColorRef.current,
        progress
      );
      setColor(nextColor);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetColor]);

  return color;
};

const adjustColor = (color: string, amount: number) => {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
};

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  Icons?: React.ReactNode;
  color?: string;
}

const Button = ({
  title,
  onPress,
  disabled,
  Icons,
  color = "#0033cc",
}: ButtonProps) => {
  const scale = useSharedValue(1);

  const primary = useSmoothColor(color);
  const secondary = useSmoothColor(adjustColor(color, 40));
  const disabledPrimary = "#a1a1aa";
  const disabledSecondary = "#d4d4d8";

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View>
      <Animated.View style={animatedContainerStyle}>
        <Pressable
          android_ripple={{ color: "#fff" }}
          onPress={onPress}
          onPressIn={() => (scale.value = withSpring(0.9))}
          onPressOut={() => (scale.value = withSpring(1))}
          disabled={disabled}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderRadius: 16,
            borderWidth: 3,
            borderStyle: "solid",
            overflow: "hidden",
            borderColor: disabled ? disabledPrimary : primary,
          }}
        >
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop
                    offset="0"
                    stopColor={disabled ? disabledPrimary : primary}
                    stopOpacity="1"
                  />
                  <Stop
                    offset="0.5"
                    stopColor={disabled ? disabledSecondary : secondary}
                    stopOpacity="1"
                  />
                  <Stop
                    offset="1"
                    stopColor={disabled ? disabledPrimary : primary}
                    stopOpacity="1"
                  />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
            </Svg>
          </View>
          {Icons && <View style={{ marginRight: 8 }}>{Icons}</View>}
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Button;
