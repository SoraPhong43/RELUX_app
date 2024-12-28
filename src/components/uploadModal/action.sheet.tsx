import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { APP_COLOR } from "@/app/utils/constant";
import * as ImagePicker from "expo-image-picker";

interface AvatarActionSheetProps {
  visible: boolean;
  onClose: () => void;
  onSetAvatar: (uri: string | null) => void;
}

const AvatarActionSheet: React.FC<AvatarActionSheetProps> = ({
  visible,
  onClose,
  onSetAvatar,
}) => {
  const handleCamera = async () => {
    // Request permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    // Open the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSetAvatar(result.assets[0].uri); // Pass the captured image URI to the parent component
    }

    onClose();
  };

  const handleGallery = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSetAvatar(result.assets[0].uri);
    }

    onClose();
  };

  const handleRemove = () => {
    onSetAvatar(null);
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>Profile Photo</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCamera}>
            <AntDesign name="camera" size={30} color="#FFA500" />
            <Text style={styles.actionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleGallery}>
            <AntDesign name="picture" size={30} color="#FFA500" />
            <Text style={styles.actionText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleRemove}>
            <AntDesign name="delete" size={30} color="#FF6347" />
            <Text style={styles.actionText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center", // Đặt nội dung ra giữa theo chiều dọc
    alignItems: "center", // Đặt nội dung ra giữa theo chiều ngang
    margin: 0, // Loại bỏ khoảng cách xung quanh Modal
  },
  sheetContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 300, // Độ rộng cụ thể cho sheet
    shadowColor: "#000", // Tạo bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10, // Tạo bóng cho Android
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#f5f5f5", // Màu sáng hơn gần trắng
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    textAlign: "center",
  },
});

export default AvatarActionSheet;
