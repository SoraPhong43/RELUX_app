import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type OptionItem = {
  value: string;
  label: string;
};

interface IDropDown {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

const DropDown = ({ data, onChange, placeholder }: IDropDown) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
    console.log("Dropdown expanded:", !expanded); // Kiểm tra trạng thái expanded
  }, [expanded]);

  const [value, setValue] = useState("");

  const buttonRef = useRef<View>(null);
  const [top, setTop] = useState(0);

  const onSelect = useCallback(
    (item: OptionItem) => {
      onChange(item);
      setValue(item.value);
      setExpanded(false);
    },
    [onChange]
  );

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;

        const finalValue =
          topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);

        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleExpanded}
        style={styles.button}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View style={[styles.options, { top }]}>
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionItem}
                      activeOpacity={0.8}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
};
export default DropDown;
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Nền mờ giúp tập trung vào danh sách
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    backgroundColor: "white",
    width: "80%",
    paddingVertical: 8,
    borderRadius: 12,
    maxHeight: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8, // Đổ bóng cho Android
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
    opacity: 0.9,
    color: "#333",
  },
});
