import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface OptionItem {
  value: string | number;
  label: string;
}

interface CmSelectProps {
  label: string; // Tiêu đề của selector
  data: OptionItem[]; // Dữ liệu của danh sách
  value?: string | number | null; // Giá trị hiện tại
  onChange: (value: OptionItem) => void; // Hàm xử lý khi chọn
  placeholder?: string; // Placeholder hiển thị khi chưa chọn
  disabled?: boolean; // Cho phép vô hiệu hóa picker
}

const CmSelect: React.FC<CmSelectProps> = ({
  label,
  data,
  value,
  onChange,
  placeholder,
  disabled = false, // Giá trị mặc định là false
}) => {
  const handleChange = (selectedValue: string | number | null) => {
    const selectedItem = data.find((item) => item.value === selectedValue);
    if (selectedItem) {
      onChange(selectedItem);
    }
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị nhãn */}
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.pickerContainer,
          disabled && styles.pickerDisabled, // Áp dụng style khi bị disabled
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => handleChange(itemValue)}
          enabled={!disabled} // Vô hiệu hóa khi disabled = true
        >
          {/* Hiển thị placeholder */}
          {placeholder && (
            <Picker.Item label={placeholder} value="" enabled={false} />
          )}
          {/* Hiển thị dữ liệu */}
          {data.length > 0 ? (
            data.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))
          ) : (
            <Picker.Item
              label="No options available"
              value=""
              enabled={false}
            />
          )}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  pickerDisabled: {
    backgroundColor: "#f5f5f5", // Màu nền khi bị vô hiệu hóa
    borderColor: "#ddd", // Màu viền khi bị vô hiệu hóa
  },
});

export default CmSelect;
