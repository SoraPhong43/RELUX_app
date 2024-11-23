import { APP_COLOR } from "@/app/utils/constant";
import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const styles = StyleSheet.create({
  inputGroup: {
    padding: 5,
    gap: 10,
  },
  text: {
    fontSize: 18,
  },
  input: {
    backgroundColor: "#E8ECF4",
    //  borderColor: APP_COLOR.vienInput,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  eye: {
    position: "absolute",
    right: 10,
    top: 18,
  },
});

interface IProps {
  title?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value: any;
  setValue?: (v: any) => void;
  onChangeText?: any;
  onBlur?: any;
  error?: any;
  touched?: any;
  editable?: boolean;
}
const ShareInput = (props: IProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    title,
    keyboardType,
    secureTextEntry = false,
    value,
    setValue,
    onChangeText,
    onBlur,
    error,
    touched,
    editable = true,
  } = props;
  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.text}>{title}</Text>}
      <View>
        <TextInput
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => {
            if (onBlur) onBlur(e);
            setIsFocus(false);
          }}
          keyboardType={keyboardType}
          style={[
            styles.input,
            { borderColor: isFocus ? APP_COLOR.vang : APP_COLOR.vienInput },
          ]}
          secureTextEntry={secureTextEntry && !isShowPassword}
        />
        {error && touched && (
          <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        )}
        {secureTextEntry && (
          <FontAwesome5
            style={styles.eye}
            name={isShowPassword ? "eye" : "eye-slash"}
            size={15}
            color="black"
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        )}
      </View>
    </View>
  );
};

export default ShareInput;
