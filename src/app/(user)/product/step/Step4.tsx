import { ScrollView, Text, View, StyleSheet } from "react-native";
import { APP_COLOR } from "@/app/utils/constant";
import { currencyFormatter } from "@/app/utils/API";
import { useCurrentApp } from "@/context/app.context";

const Step4 = () => {
  const { booking } = useCurrentApp();

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>
              {currencyFormatter(booking?.price - 0)}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Discount</Text>
            <Text style={styles.value}>
              {booking?.discountPercentage * 100}%
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.totalCard]}>
          <View style={styles.row}>
            <Text style={[styles.label, styles.totalLabel]}>Total</Text>
            <Text style={[styles.value, styles.totalValue]}>
              {currencyFormatter(
                booking?.price - booking?.price * booking?.discountPercentage
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLOR.primary,
  },
  totalCard: {
    backgroundColor: APP_COLOR.lightPurple,
  },
  totalLabel: {
    fontSize: 18,
    color: APP_COLOR.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLOR.primary,
  },
});

export default Step4;
