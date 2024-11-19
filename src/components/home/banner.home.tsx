import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import bn1 from "@/assets/banner/spa_banner1.jpg";
import bn2 from "@/assets/banner/spa_banner2.jpg";
import bn3 from "@/assets/banner/spa_banner3.jpg";
import bn4 from "@/assets/banner/spa_banner4.jpg";
import bn5 from "@/assets/banner/spa_banner5.jpg";
import bn6 from "@/assets/banner/spa_banner6.jpg";

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

const BannerHome = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const width = Dimensions.get("window").width;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const sliders = [
    { id: 1, source: bn1 },
    { id: 2, source: bn2 },
    { id: 3, source: bn3 },
    { id: 4, source: bn4 },
    { id: 5, source: bn5 },
    { id: 6, source: bn6 },
  ];

  return (
    <View>
      <Carousel
        ref={ref}
        width={width}
        height={width / 3}
        data={sliders}
        autoPlay={true}
        autoPlayInterval={2000}
        onProgressChange={progress}
        renderItem={({ item, index }) => (
          <Image
            style={{
              width: width,
              height: width / 3,
              resizeMode: "cover",
            }}
            source={item.source}
          />
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          height: 5,
          width: 5,
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 50,
        }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default BannerHome;
