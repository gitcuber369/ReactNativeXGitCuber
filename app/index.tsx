import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);


const pathData = "M92.6349 80.412L89.453 89.5886M61.953 168.901C58.9284 172.323 64.3743 194.703 42.1802 221.339C19.9861 247.974 -0.136616 226.631 9.45283 211.506C19.0423 196.382 16.8737 199.624 23.0892 193.153C35.3645 180.373 44.8133 174.476 61.953 168.901ZM61.953 168.901C68.6984 149.446 79.2257 119.085 79.2257 119.085M61.953 168.901C97.5919 148.313 114.544 131.637 143.771 82.3784C125.09 135.473 113.694 168.372 145.135 153.169C180.59 140.06 209.624 39.7728 207.181 47.6388C204.737 55.5048 132.181 224.616 236.499 125.64M89.453 89.5886C89.453 89.5886 73.8183 75.8244 51.0438 85.0003C28.2693 94.1762 -3.02225 148.831 26.4983 156.447C49.5591 162.396 67.682 138.75 79.2257 119.085M89.453 89.5886L79.2257 119.085M236.499 125.64C247.408 86.9674 281.499 69.9252 306.045 93.5221M236.499 125.64C235.317 161.784 276.726 166.279 302.635 138.75C328.545 111.22 345.59 86.966 346.272 82.3784C346.954 77.7908 293.772 207.574 375.59 132.195L391.272 107.943L404.908 82.3784C373.333 157.315 377.873 168.719 417.863 145.304C443.952 126.83 456.629 113.312 477.863 86.9674C514.573 41.2113 519.454 14.2102 502.409 7C479.227 7.65547 471.727 33.2196 454.681 86.9674C435.139 147.854 438.999 167.263 468.318 153.17C497.636 139.077 517.409 106.632 502.409 89.5886C526.366 126.807 536.5 132.85 563.772 116.464C591.045 100.077 577.502 79.4008 563.772 85.001C550.043 90.6013 545.069 96.7502 541.272 113.842C540.74 149.225 545.383 162.29 577.409 153.17C610.457 135.862 620.212 111.73 633.592 71.2361C631.149 88.3186 651.045 88.9338 670.136 85.001C689.227 81.0682 623.773 190.532 679 145.304M177.455 71.2361H203H227.228M145.135 38C145.135 56.4 150.378 63.6667 153 65"

const pathLength = 2000; // Adjust to your actual path length for best effect

export default function Index() {
  // progress goes from 1 (hidden) to 0 (fully drawn)
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) }), // draw
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) })  // erase
      ),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * pathLength,
  }));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222222"
      }}
    >
      <Svg width={400} height={400} viewBox="0 0 700 200">
        <AnimatedPath
          d={pathData}
          stroke="white"
          fill="none"
          strokeWidth={15}
          strokeDasharray={pathLength}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );


  // 71.2361H203H227.228M145.135 38C145.135 56.4 150.378 63.6667 153 65
}
