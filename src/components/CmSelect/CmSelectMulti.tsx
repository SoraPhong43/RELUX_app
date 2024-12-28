import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface OptionItem {
    value: string | number;
    label: string;
}

interface CmSelectProps {
    label: string;
    data: OptionItem[]; // Options to display
    value?: (string | number)[]; // Selected values (string | number)
    onChange: (values: (string | number)[]) => void;
    placeholder?: string;
}

const CmSelect: React.FC<CmSelectProps> = ({
    label,
    data,
    value = [],
    onChange,
    placeholder,
}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedValues, setSelectedValues] = useState<(string | number)[]>(value);

    const handleSelect = (item: OptionItem) => {
        const alreadySelected = selectedValues.includes(item.value);

        if (alreadySelected) {
            setSelectedValues((prev) => prev.filter((val) => val !== item.value));
        } else {
            setSelectedValues((prev) => [...prev, item.value]);
        }
    };

    const handleConfirm = () => {
        onChange(selectedValues);
        setModalVisible(false);
    };

    const handleCancel = () => {
        setSelectedValues(value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectText}>
                    {selectedValues.length > 0
                        ? selectedValues
                            .slice(0, 3) // Show first 3 selected items
                            .map((val) => data.find((option) => option.value === val)?.label || val)
                            .join(", ") +
                        (selectedValues.length > 3 ? `, ...and ${selectedValues.length - 3} more` : "")
                        : placeholder || "Select options"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#666" />
            </TouchableOpacity>

            {/* Modal for selection */}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{label || "Select Options"}</Text>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={({ item }) => {
                                const isSelected = selectedValues.includes(item.value);
                                return (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text style={styles.optionLabel}>{item.label}</Text>
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={18} color="green" />
                                        )}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    selectBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#fff",
    },
    selectText: {
        color: "#666",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 8,
        padding: 20,
        maxHeight: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionLabel: {
        fontSize: 16,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
    },
    cancelText: {
        color: "#666",
    },
    confirmButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#007BFF",
        borderRadius: 8,
    },
    confirmText: {
        color: "#fff",
    },
    selectedItemsContainer: {
        marginTop: 12,
    },
    selectedItems: {
        fontSize: 16,
        lineHeight: 22,
    },
});

export default CmSelect;
