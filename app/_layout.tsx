import {
  Inter_100Thin,
  Inter_100Thin_Italic,
  Inter_200ExtraLight,
  Inter_200ExtraLight_Italic,
  Inter_300Light,
  Inter_300Light_Italic,
  Inter_400Regular,
  Inter_400Regular_Italic,
  Inter_500Medium,
  Inter_500Medium_Italic,
  Inter_600SemiBold,
  Inter_600SemiBold_Italic,
  Inter_700Bold,
  Inter_700Bold_Italic,
  Inter_800ExtraBold,
  Inter_800ExtraBold_Italic,
  Inter_900Black,
  Inter_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { SealCheckIcon } from "phosphor-react-native";
import { Image, Text, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    Inter_100Thin_Italic,
    Inter_200ExtraLight_Italic,
    Inter_300Light_Italic,
    Inter_400Regular_Italic,
    Inter_500Medium_Italic,
    Inter_600SemiBold_Italic,
    Inter_700Bold_Italic,
    Inter_800ExtraBold_Italic,
    Inter_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if you want
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "",

          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("@/assets/profile.jpg")}
                style={{
                  width: 32,
                  height: 32,
                  marginRight: 8,
                  borderRadius: 16,
                }}
              />
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    @gitcuber
                  </Text>
                  <SealCheckIcon
                    size={16}
                    weight="fill"
                    color="#008cffff"
                  />
                </View>

                <Text
                  style={{ fontSize: 12, fontWeight: "400", color: "#888" }}
                >
                  react native components
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen name="writting-animate" options={{ headerShown: false }} />
      <Stack.Screen name="accordion" options={{ headerShown: false }} />
      <Stack.Screen name="reanimated" options={{ headerShown: false }} />
      <Stack.Screen name="animated-feb" options={{ headerShown: false }} />
    </Stack>
  );
}
