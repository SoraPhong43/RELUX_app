import { checkConnected } from "@/components/check/network";
import { useState } from "react";
import { Text, View } from "react-native";
import NoConnectionScreen from "./check.network";

export default function Network() {
  const [connectStatus, setConnectStatus] = useState(false);

  checkConnected().then((res) => {
    setConnectStatus(res ?? false);
  });
  return connectStatus ? (
    <View>
      <Text>anc</Text>
    </View>
  ) : (
    <NoConnectionScreen />
  );
}
