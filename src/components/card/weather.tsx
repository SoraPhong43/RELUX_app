import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const CloudWithSun = () => {
  return (
    <View style={styles.container}>
      <Svg width={80} height={80} viewBox="0 0 64 64">
        <Defs>
          <LinearGradient
            id="sunGradient"
            x1="16.5"
            y1="19.67"
            x2="21.5"
            y2="28.33"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#fbbf24" />
            <Stop offset="0.45" stopColor="#fbbf24" />
            <Stop offset="1" stopColor="#f59e0b" />
          </LinearGradient>
          <LinearGradient
            id="cloudGradient"
            x1="22.56"
            y1="21.96"
            x2="39.2"
            y2="50.8"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#f3f7fe" />
            <Stop offset="0.45" stopColor="#f3f7fe" />
            <Stop offset="1" stopColor="#deeafb" />
          </LinearGradient>
        </Defs>
        {/* Mặt trời */}
        <Circle cx="19" cy="24" r="5" fill="url(#sunGradient)" />
        {/* Mây */}
        <Path
          d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"
          fill="url(#cloudGradient)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CloudWithSun;
