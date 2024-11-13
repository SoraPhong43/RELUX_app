import { APP_COLOR } from "@/app/utils/constant";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { useEffect, useState } from "react";

const DropDownFacility = () => {
  const [next7Days, setNext7Days] = useState<
    { date: moment.Moment; day: string; formattedDate: string }[]
  >([]);
  const [timeList, setTimeList] = useState<{ time: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  useEffect(() => {
    getDay();
    getTime();
  }, []);

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

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: `${i}:00 AM`,
      });
      timeList.push({
        time: `${i}:30 AM`,
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: `${i}:00 PM`,
      });
      timeList.push({
        time: `${i}:30 PM`,
      });
    }
    setTimeList(timeList);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>Book apointment</Text> */}
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
            onPress={() => setSelectedDate(item.date)}
            style={[
              styles.dayButton,
              selectedDate === item.date && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                selectedDate === item.date && styles.selectedText,
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDate === item.date && styles.selectedText,
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
  headerText: {
    fontSize: 18,
    color: APP_COLOR.GRAY,
    fontWeight: "600",
    marginBottom: 10,
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
    backgroundColor: APP_COLOR.vang,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
});
