import { APP_COLOR } from "@/app/utils/constant";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCurrentApp } from "@/context/app.context";

const DropDownFacility = ({}) => {
  const [next7Days, setNext7Days] = useState<
    { date: moment.Moment; day: string; formattedDate: string }[]
  >([]);
  const [timeList, setTimeList] = useState<{ time: string }[]>([]);
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } =
    useCurrentApp();
  const [bookedDates, setBookedDates] = useState<moment.Moment[]>([]);

  useEffect(() => {
    getDay();
    getTime();
  }, []);

  // Lấy các ngày trong tuần
  const getDay = () => {
    const nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, "days");
      nextSevenDays.push({
        date: date,
        day: date.format("ddd"),
        formattedDate: date.format("Do MMM"),
      });
    }
    setNext7Days(nextSevenDays);
  };

  // Lấy các thời gian có sẵn
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({ time: `${i}:00 AM` });
      timeList.push({ time: `${i}:30 AM` });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: `${i}:00 PM` });
      timeList.push({ time: `${i}:30 PM` });
    }
    setTimeList(timeList);
  };

  // Khi đặt lịch thành công
  const handleBookingSuccess = (selectedDate: moment.Moment) => {
    // Thêm ngày đã đặt vào danh sách
    setBookedDates([...bookedDates, selectedDate]);
  };

  // Khi chọn ngày và thời gian, gọi handleBookingSuccess
  const handleDaySelection = (item: {
    date: moment.Moment;
    day: string;
    formattedDate: string;
  }) => {
    if (bookedDates.some((bookedDate) => bookedDate.isSame(item.date, "day"))) {
      // Nếu ngày đã được đặt, hiển thị cảnh báo và không cho chọn
      Alert.alert("Ngày đã được đặt", "Ngày này không thể chọn lại.");
      return;
    }

    // Chọn ngày và gọi handleBookingSuccess để lưu ngày đã chọn
    setSelectedDate(item.date);
    handleBookingSuccess(item.date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Day</Text>
      </View>
      <FlatList
        data={next7Days}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (
                bookedDates.some((bookedDate) =>
                  bookedDate.isSame(item.date, "day")
                )
              ) {
                // Nếu ngày đã được đặt, hiển thị cảnh báo và không cho chọn
                Alert.alert("Ngày đã được đặt", "Ngày này không thể chọn lại.");
                return;
              }
              setSelectedDate(item.date); // Nếu chưa đặt, chọn ngày
            }}
            style={[
              styles.dayButton,
              selectedDate?.isSame(item.date, "day") && styles.selectedButton,
              bookedDates.some((bookedDate) =>
                bookedDate.isSame(item.date, "day")
              ) && styles.disabledButton, // Tô xám nếu ngày đã đặt
            ]}
            disabled={bookedDates.some((bookedDate) =>
              bookedDate.isSame(item.date, "day")
            )} // Vô hiệu hóa nếu ngày đã đặt
          >
            <Text
              style={[
                styles.dayText,
                selectedDate?.isSame(item.date, "day") && styles.selectedText,
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDate?.isSame(item.date, "day") && styles.selectedText,
              ]}
            >
              {item.formattedDate}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Time</Text>
      </View>
      <FlatList
        data={timeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.time.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTime(item.time)}
            style={[
              styles.timeButton,
              selectedTime === item.time && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === item.time && styles.selectedText,
              ]}
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DropDownFacility;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  labelContainer: {
    marginBottom: 10,
    marginTop: 15,
  },
  labelText: {
    fontSize: 18,
    fontWeight: "500",
  },
  dayButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginRight: 10,
    borderColor: APP_COLOR.GRAY,
  },
  timeButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginRight: 10,
    borderColor: APP_COLOR.GRAY,
  },
  dayText: {
    fontSize: 16,
    color: "black",
  },
  dateText: {
    fontSize: 14,
    color: "black",
  },
  timeText: {
    fontSize: 16,
    color: "black",
  },
  selectedButton: {
    backgroundColor: APP_COLOR.primary,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#f0f0f0", // Màu xám cho ngày đã đặt
    borderColor: "#ccc", // Màu viền xám
  },
});
