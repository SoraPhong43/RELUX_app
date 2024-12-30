import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { APP_COLOR } from "@/app/utils/constant";
import * as ImagePicker from "expo-image-picker";
import { uploadAvatarAPI } from "@/app/utils/API";
import Toast from "react-native-root-toast";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const handleGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const formData = new FormData();
      formData.append("avatar", {
        uri: result.assets[0].uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any);

      try {
        const response = await uploadAvatarAPI(formData);

        if (response?.data) {
          // API chỉ trả về `true`, nên bạn cần tạm thời hiển thị ảnh từ URI
          onSetAvatar(result.assets[0].uri);
          Toast.show("Avatar uploaded successfully!", {
            duration: Toast.durations.LONG,
            textColor: "white",
            backgroundColor: "green",
          });
        } else {
          throw new Error("Upload failed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        Toast.show("Upload failed. Please try again.", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "red",
        });
      }
    }

    onClose();
  };
  const handleCamera = async () => {
    try {
      // Yêu cầu quyền truy cập camera
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Toast.show("Camera access is required to take a photo.", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "red",
        });
        return;
      }

      // Mở camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Cho phép chỉnh sửa ảnh
        aspect: [4, 3], // Tỷ lệ khung hình
        quality: 1, // Chất lượng ảnh cao nhất
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        // Chuẩn bị dữ liệu để tải lên server
        const formData = new FormData();
        formData.append("avatar", {
          uri: result.assets[0].uri, // Đường dẫn ảnh
          name: "avatar.jpg", // Tên file
          type: "image/jpeg", // MIME type
        } as any);

        // Gửi ảnh lên server
        const response = await uploadAvatarAPI(formData);

        if (response?.data) {
          // Nếu API trả về thành công, cập nhật avatar trong giao diện
          onSetAvatar(result.assets[0].uri); // Hiển thị ảnh mới
          Toast.show("Avatar uploaded successfully!", {
            duration: Toast.durations.LONG,
            textColor: "white",
            backgroundColor: "green",
          });
        } else {
          throw new Error("Failed to upload avatar.");
        }
      } else {
        console.log("Camera operation was cancelled.");
      }
    } catch (error: any) {
      console.error("Error in handleCamera:", error);
      Toast.show(error.message || "An error occurred while uploading.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "red",
      });
    } finally {
      // Đóng modal sau khi xử lý xong
      onClose();
    }
  };

  const handleRemove = () => {
    try {
      // Đường dẫn đến ảnh mặc định
      const defaultAvatarPath = require("../../assets/icon.png");

      // Cập nhật avatar về ảnh mặc định
      onSetAvatar(Image.resolveAssetSource(defaultAvatarPath)?.uri || null);

      Toast.show("Avatar has been reset to the default image.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "green",
      });
    } catch (error) {
      console.error(error);
      Toast.show("Failed to reset avatar. Please try again.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "red",
      });
    } finally {
      // Đóng modal
      onClose();
    }
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
