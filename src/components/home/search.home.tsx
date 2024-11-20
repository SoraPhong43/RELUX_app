import { StyleSheet, TextInput, View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    height: 40,
    width: "90%",
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: "#707070",
    fontSize: 14,
  },
});

const SearchHome = () => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <EvilIcons name="search" size={20} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Search for service..."
          placeholderTextColor="#707070"
        />
      </View>
    </View>
  );
};

export default SearchHome;
