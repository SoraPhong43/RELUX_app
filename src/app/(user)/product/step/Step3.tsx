import HeaderHome from "@/components/home/header.home";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { APP_COLOR } from "@/app/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import ShareInput from "@/components/input/share.input";

const Step3 = () => {
  const { booking, setBooking, appState } = useCurrentApp();

  const setNote = (note: string) => {
    setBooking((prevState) => {
      return {
        ...prevState,
        bookingnotes: note,
      };
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Display User Name */}
        <View style={styles.inputWrapper}>
          <ShareInput
            title="Name"
            editable={false}
            value={appState?.user.fullName}
          />
        </View>

        {/* Note Section */}
        <View style={styles.noteWrapper}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            numberOfLines={3}
            value={booking.bookingnotes}
            onChangeText={(text) => setNote(text)}
            style={styles.textInput}
            placeholder="Write your notes here..."
            placeholderTextColor="#666" // Màu placeholder đậm hơn
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Set màu nền trắng
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF", // Đảm bảo ScrollView cũng có màu nền trắng
  },
  inputWrapper: {
    marginBottom: 20,
  },
  noteWrapper: {
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: APP_COLOR.primary,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    backgroundColor: APP_COLOR.lightGray,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: APP_COLOR.primary,
    color: "#333",
    textAlignVertical: "top",
    minHeight: 100,
  },
});

export default Step3;
