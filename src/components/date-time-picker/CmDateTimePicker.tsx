import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, ViewStyle } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface CmDateTimePickerProps {
    mode?: 'date' | 'time' | 'datetime';
    value?: Date;
    onChange?: (date: Date) => void;
    display?: 'default' | 'spinner' | 'calendar' | 'clock';
    label?: string;
    style?: ViewStyle;
    minDate?: Date; // Thêm hỗ trợ giới hạn tối thiểu
}

const CmDateTimePicker: React.FC<CmDateTimePickerProps> = ({
    mode = 'date',
    value = new Date(),
    onChange,
    display = 'default',
    label = 'Select Date/Time',
    style = {},
    minDate = new Date(), // Mặc định giới hạn ngày giờ tối thiểu là hiện tại
}) => {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [step, setStep] = useState<'date' | 'time'>('date'); // Quản lý bước chọn (dành cho datetime)
    const [selectedValue, setSelectedValue] = useState<Date>(value);

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'dismissed') {
            setShowPicker(false);
            setStep('date');
            return;
        }

        const currentDate = selectedDate || selectedValue;

        if (mode === 'datetime' && step === 'date') {
            // Khi chọn ngày xong, chuyển sang bước chọn giờ
            setStep('time');
        } else {
            setShowPicker(false);
            setStep('date'); // Reset bước
            if (onChange) onChange(currentDate);
        }

        setSelectedValue(currentDate);
    };

    const handleOpenPicker = () => {
        setShowPicker(true);
        setStep(mode === 'datetime' ? 'date' : mode); // Nếu mode là datetime, bắt đầu từ chọn ngày
    };

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={handleOpenPicker} style={styles.button}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>
                    {mode === 'date'
                        ? selectedValue.toLocaleDateString() // Hiển thị ngày
                        : mode === 'time'
                            ? selectedValue.toLocaleTimeString() // Hiển thị giờ
                            : `${selectedValue.toLocaleDateString()} ${selectedValue.toLocaleTimeString()}`} {/* Hiển thị ngày và giờ */}
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={selectedValue}
                    mode={step} // Hiển thị chế độ theo bước hiện tại
                    display={display}
                    onChange={handleChange}
                    minimumDate={minDate} // Đặt giới hạn tối thiểu
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
});

export default CmDateTimePicker;
