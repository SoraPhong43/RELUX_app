import React, { useState, useEffect } from "react";
import Booking from "../(user)/product/CpBooking";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";

const BookingNow = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hiển thị loading skeleton trong 2000ms
    const timer = setTimeout(() => {
      setIsLoading(false); // Kết thúc loading sau 2000ms
    }, 200);

    // Xóa timer nếu component bị hủy
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width="100%"
          height={300}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Header Skeleton */}
          <Rect x="20" y="30" rx="10" ry="10" width="90%" height="30" />
          {/* List Items Skeleton */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Rect
              key={index}
              x="20"
              y={80 + index * 70} // Vị trí Y tăng dần
              rx="10"
              ry="10"
              width="90%"
              height="50"
            />
          ))}
        </ContentLoader>
      ) : (
        <Booking />
      )}
    </View>
  );
};

export default BookingNow;
