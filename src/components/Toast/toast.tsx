import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info"; // Giới hạn kiểu cho `type`
  visible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, visible, onHide }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Hiệu ứng hiển thị
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Tự động ẩn sau 3 giây
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onHide();
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, styles[type], { opacity: fadeAnim }]} // TypeScript giờ đã biết `type` hợp lệ
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 50,
    left: "10%",
    right: "10%",
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  success: {
    backgroundColor: "green",
  },
  error: {
    backgroundColor: "red",
  },
  info: {
    backgroundColor: "blue",
  },
  toastText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Toast;
