// hooks/useNetworkStatus.ts
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetworkStatus = (): boolean => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false); // Đảm bảo giá trị luôn là boolean
    });

    // Kiểm tra trạng thái kết nối ngay khi component được mount
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    // Hủy bỏ subscription khi component bị unmount
    return () => unsubscribe();
  }, []);

  return isConnected;
};

export default useNetworkStatus;
