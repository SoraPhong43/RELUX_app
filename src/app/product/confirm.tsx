import { useCurrentApp } from "@/context/app.context";
import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { APP_COLOR } from "@/app/utils/constant";

const ConfirmService = () => {
  const {
    appState,
    selectedDate,
    selectedTime,
    selectedLocation,
    selectedEmployee,
  } = useCurrentApp();
  const route = useRoute();
  // @ts-ignore
  const { note } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Xác Nhận Dịch Vụ Spa</Text>

      {/* Card Thông tin khách hàng */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Thông Tin Khách Hàng</Text>
        <View style={styles.cardContent}>
          <Text style={styles.label}>Họ tên</Text>
          <Text style={styles.value}>{appState?.user.username}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{appState?.user.email}</Text>
          <Text style={styles.label}>Số điện thoại</Text>
          <Text style={styles.value}>{appState?.user.phone}</Text>
        </View>
      </View>

      {/* Card Thông tin dịch vụ */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chi Tiết Dịch Vụ</Text>
        <View style={styles.cardContent}>
          <Text style={styles.label}>Ngày</Text>
          <Text style={styles.value}>
            {selectedDate ? selectedDate.format("Do MMM") : "Chưa chọn"}
          </Text>
          <Text style={styles.label}>Giờ</Text>
          <Text style={styles.value}>{selectedTime || "Chưa chọn"}</Text>
          <Text style={styles.label}>Địa Điểm</Text>
          <Text style={styles.value}>
            {selectedLocation?.name || "Chưa chọn"}
          </Text>
          <Text style={styles.label}>Nhân Viên</Text>
          <Text style={styles.value}>
            {selectedEmployee?.name || "Chưa chọn"}
          </Text>
          <Text style={styles.label}>Ghi Chú</Text>
          <Text style={styles.value}>{note || "Không có ghi chú"}</Text>
        </View>
      </View>

      {/* Nút xác nhận */}
      <Pressable
        style={styles.confirmButton}
        onPress={() => alert("Dịch vụ đã được xác nhận!")}
      >
        <Text style={styles.confirmButtonText}>Xác Nhận Dịch Vụ</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ConfirmService;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: APP_COLOR.vang,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: APP_COLOR.vang,
    marginBottom: 15,
  },
  cardContent: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: APP_COLOR.vang,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
