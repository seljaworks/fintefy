import DropdownCircleButton from "@/components/DropdownCircleButton";
import RoundedBtn from "@/components/RoundedBtn";
import Colors from "@/constants/Colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Page = () => {
  const balance = 1420;
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balanceText}>{balance}</Text>
          <Text style={styles.currencyText}>$</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundedBtn title="Add Money" iconName="add" />
        <RoundedBtn title="Exchange" iconName="refresh" />
        <RoundedBtn title="Details" iconName="list" />
        <DropdownCircleButton />
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  account: { margin: 80, alignItems: "center" },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  balanceText: { fontSize: 50, fontWeight: "bold" },
  currencyText: { fontSize: 20, fontWeight: 500 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
