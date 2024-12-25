import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface OptionItem {
    value: string | number;
    label: string;
}

interface CmSelectProps {
    label: string;
    data: OptionItem[];
    value?: string | number | null; // The currently selected value
    onChange: (value: OptionItem) => void;
    placeholder?: string;
}

const CmSelect: React.FC<CmSelectProps> = ({
    label,
    data,
    value,
    onChange,
    placeholder,
}) => {
    const handleChange = (selectedValue: string | number | null) => {
        const selectedItem = data.find((item) => item.value === selectedValue);
        if (selectedItem) {
            onChange(selectedItem);
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => handleChange(itemValue)}
                >
                    {placeholder && (
                        <Picker.Item label={placeholder} value="" enabled={false} />
                    )}
                    {data.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
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
    },
});

export default CmSelect;
