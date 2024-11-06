import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SectionList,
  ViewToken,
  ScrollView,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
  interpolateColor,
} from "react-native-reanimated";
import Info from "./info";
import demo from "@/assets/spaHome1.jpg";
import StickyHeader from "./sticky.header";
import { useRef, useState } from "react";
import { APP_COLOR } from "@/app/utils/constant";
import {
  currencyFormatter,
  getURLBaseBackend,
  processDataServiceMenu,
} from "@/app/utils/API";
import AntDesign from "@expo/vector-icons/AntDesign";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const { height: sHeight, width: sWidth } = Dimensions.get("window");

const HEADER_HEIGHT = 120;
const IMAGE_HEIGHT = 220;
const INFO_HEIGHT = 250;
const SLIDE_MENU_HEIGHT = 50;
interface IProps {
  service: IService | null;
}
const RMain = (props: IProps) => {
  const { service } = props;

  const scrollY = useSharedValue(0);

  const sectionListRef = useRef<SectionList>(null);
  const flatListRef = useRef<FlatList>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | string>(0);
  const blockUpdateRef = useRef<boolean>(false);

  // Scroll handler to update the scrollY value
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    // console.log(scrollY.value)
  });

  // Fade-in effect for the restaurant header
  const animatedStickyHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP
    );
    const pointerEvents = opacity === 0 ? "none" : "auto";

    return {
      opacity,
      pointerEvents, //on/off click input
    };
  });

  // Sticky positioning for the menu below the header
  const animatedMenuStyle = useAnimatedStyle(() => {
    const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;
    const translateY = interpolate(
      scrollY.value,
      [0, range], // Define scroll range
      [0, -range - 2], //2px menu border
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      position: "absolute",
      top: IMAGE_HEIGHT + INFO_HEIGHT,
      zIndex: 2,
      width: "100%",
      backgroundColor: "white",
    };
  });

  const animatedInfoStyle = useAnimatedStyle(() => {
    const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;

    const translateY = interpolate(
      scrollY.value,
      [0, range], // Define scroll range
      [0, -range],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      position: "absolute",
      top: IMAGE_HEIGHT,
      zIndex: 1,
      width: "100%",
    };
  });

  const animatedHeartIconStyle = useAnimatedStyle(() => {
    const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;

    const translateY = interpolate(
      scrollY.value,
      [0, range], // Define scroll range
      [0, -range],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  // Animated styles for background
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, 100],
        ["rgba(0,0,0,0.3)", "transparent"]
      ),
    };
  });

  // Animate arrow color
  const animatedArrowColorStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollY.value,
        [0, 100],
        [APP_COLOR.vang, APP_COLOR.vang] // Arrow color range
      ),
    };
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0 && !blockUpdateRef.current) {
        const visibleSectionIndex = viewableItems[0].section.index;
        setActiveMenuIndex(visibleSectionIndex);
        flatListRef.current?.scrollToIndex({
          index: visibleSectionIndex,
          animated: true,
        });
      }
    }
  ).current;

  console.log(processDataServiceMenu(service));

  return (
    <View>
      <StickyHeader
        headerHeight={HEADER_HEIGHT}
        imageHeight={IMAGE_HEIGHT}
        animatedBackgroundStyle={animatedBackgroundStyle}
        animatedArrowColorStyle={animatedArrowColorStyle}
        animatedStickyHeaderStyle={animatedStickyHeaderStyle}
        animatedHeartIconStyle={animatedHeartIconStyle}
      />

      {/*  Image */}
      <View style={styles.header}>
        <Image
          source={{
            uri: `${getURLBaseBackend()}/images/service/${service?.image}`,
          }}
          style={styles.headerImage}
        />
      </View>

      {/* Info */}
      <Animated.View style={[animatedInfoStyle]}>
        <Info infoHeight={INFO_HEIGHT} service={service} />
      </Animated.View>

      {/* Sticky Menu */}
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        data={processDataServiceMenu(service)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              blockUpdateRef.current = true;
              setActiveMenuIndex(index);
              sectionListRef.current?.scrollToLocation({
                sectionIndex: item.index,
                itemIndex: 0,
                viewOffset: HEADER_HEIGHT + SLIDE_MENU_HEIGHT,
              });
            }}
          >
            <View
              style={{
                paddingHorizontal: 7,
                height: SLIDE_MENU_HEIGHT,
                justifyContent: "center",
                borderBottomColor:
                  item.index === activeMenuIndex
                    ? APP_COLOR.vang
                    : APP_COLOR.GRAY,
                borderBottomWidth: 2,
              }}
            >
              <Text
                style={{
                  color:
                    item.index === activeMenuIndex ? APP_COLOR.vang : "black",
                  marginHorizontal: 5,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={[animatedMenuStyle]}
      />

      {/* Scrollable Content */}
      <AnimatedSectionList
        ref={sectionListRef as any}
        style={{ zIndex: 1 }}
        onScroll={onScroll}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{
          paddingTop: IMAGE_HEIGHT + INFO_HEIGHT + SLIDE_MENU_HEIGHT,
          paddingBottom: 30,
        }}
        sections={processDataServiceMenu(service)}
        renderItem={({ item, index }: { item: any; index: any }) => {
          const menuItem = item as IMenuItem;
          return (
            // <TouchableOpacity onPress={() => alert("render item sections")}>
            //   <View style={{ paddingHorizontal: 10, backgroundColor: "white" }}>
            //     <View style={{ backgroundColor: "pink", height: 50 }}>
            //       <Text>{menuItem.name}</Text>
            //     </View>
            //   </View>
            // </TouchableOpacity>
            <View
              style={{
                backgroundColor: "white",
                gap: 10,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <View>{/* Image */}</View>
              <View style={{ flex: 1, gap: 10 }}>
                <View>
                  <Text> {menuItem.name}</Text>
                </View>
                <View>
                  <Text> {menuItem.description}</Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: APP_COLOR.vang }}>
                    {currencyFormatter(menuItem.price)}
                  </Text>
                  <AntDesign
                    name="plussquare"
                    size={24}
                    color={APP_COLOR.vang}
                  />
                </View>
              </View>
            </View>
          );
        }}
        renderSectionHeader={({ section }: { section: any }) => (
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            <Text style={{ textTransform: "uppercase" }}>{section.title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <>
            <View style={{ backgroundColor: "white", paddingHorizontal: 10 }}>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#ccc",
                  marginVertical: 5,
                }}
              />
            </View>
          </>
        )}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 1,
          waitForInteraction: true,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollEnd={() => (blockUpdateRef.current = false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLOR.vang,
    marginHorizontal: 10,
  },
  header: {
    width: sWidth,
    height: IMAGE_HEIGHT,
    top: 0,
    left: 0,
    position: "absolute",
    zIndex: 1,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default RMain;
