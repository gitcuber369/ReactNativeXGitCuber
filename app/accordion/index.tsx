import { IconPlus } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AccordionCardProps {
  title: string;
  content: string;
}

const ACCORDION_DATA = [
  {
    title: "Return Policy",
    content:
      "Our return policy allows you to return products within 30 days of purchase. Items must be in original condition and packaging. To initiate a return, please contact our customer service team with your order details.",
  },
  {
    title: "Shipping Information",
    content:
      "We offer free shipping on all orders over $50. Orders are processed within 2 business days and tracking information will be provided via email.",
  },
  {
    title: "Payment Methods",
    content:
      "We accept Visa, MasterCard, American Express, and PayPal. All payments are processed securely.",
  },
  {
    title: "Warranty",
    content:
      "All products come with a 1-year warranty covering manufacturing defects. Please contact support for warranty claims.",
  },
  {
    title: "Contact Us",
    content:
      "For any questions or concerns, reach out to our customer service team at support@example.com or call 1-800-123-4567.",
  },
];

const AccordionCard = ({ title, content }: AccordionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const animatedHeight = useSharedValue(0);
  const rotation = useSharedValue(0);

  const toggleAccordion = () => {
    setIsOpen((prev) => {
      const next = !prev;
      rotation.value = withTiming(next ? 45 : 0, {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      });
      animatedHeight.value = withTiming(isOpen ? 0 : contentHeight, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
      return next;
    });
  };

  const animatedContentStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animtedContentOpacityStyle = useAnimatedStyle(() => ({
    opacity: animatedHeight.value === 0 ? 0 : 1,
    animation: animatedHeight.value === 0 ? "fadeOut 0.2s" : "fadeIn 0.2s",
  }));

  return (
    <View style={[styles.accordionContainer]}>
      <View style={styles.titleContainer}>
        <Text style={styles.accordionTitle}>{title}</Text>

        <Animated.View style={animatedIconStyle}>
          <IconPlus size={18} color={"#6B7280"} onPress={toggleAccordion} />
        </Animated.View>
      </View>

      <Animated.View style={[animatedContentStyle, styles.contentWrapper]}>
        <View
          style={{ position: "absolute", width: "100%" }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            if (height !== contentHeight) {
              setContentHeight(height);
              if (isOpen) {
                animatedHeight.value = height;
              }
            }
          }}
        >
          <View style={[animtedContentOpacityStyle, { paddingHorizontal: 8 }]}>
            <Text style={styles.accordionContent}>{content}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const Accordion = () => {
  return (
    <View style={styles.container}>
      {ACCORDION_DATA.map((item, idx) => (
        <AccordionCard
          key={item.title + idx}
          title={item.title}
          content={item.content}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
  },
  accordionContainer: {
    width: "90%",
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    overflow: "hidden", // ensures inner content respects border radius
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Inter_500Medium",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  accordionContent: {
    fontSize: 16,
    lineHeight: 20,
    padding: 16,
    textAlign: "left",
    textAlignVertical: "top",
    color: "#4B5563",
    fontFamily: "Inter_400Regular",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  accordionDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
  contentWrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
});

export default Accordion;
