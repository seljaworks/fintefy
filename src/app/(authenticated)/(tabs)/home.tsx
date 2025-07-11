import DropdownCircleButton from "@/components/DropdownCircleButton";
import RoundedBtn from "@/components/RoundedBtn";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Page = () => {
  const { addTransaction, totalBalance, transactions, clearTransaction } =
    useBalanceStore();
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balanceText}>{totalBalance()}</Text>
          <Text style={styles.currencyText}>$</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundedBtn
          title="Add Money"
          iconName="add"
          onPress={() =>
            addTransaction({
              amount: 500,
              date: new Date(),
              description: "",
              title: "uang Makan",
              id: Math.floor(Math.random() * 7).toString(),
            })
          }
        />
        <RoundedBtn
          title="Exchange"
          iconName="refresh"
          onPress={clearTransaction}
        />
        <RoundedBtn title="Details" iconName="list" />
        <DropdownCircleButton />
      </View>

      <Text style={defaultStyles.sectionHeader}>Latest Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={styles.transactions}>No Transaction yet</Text>
        )}
        {transactions
          .reverse()
          .slice(0, 5)
          .map((t) => (
            <View key={t.id} style={styles.transaction}>
              <View style={styles.circle}>
                <Ionicons
                  name={t.amount > 0 ? "add" : "remove"}
                  size={24}
                  color={Colors.dark}
                />
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ fontWeight: 500 }}>{t.title}</Text>
                <Text style={{ color: Colors.gray }}>
                  {t.date.toLocaleString()}
                </Text>
              </View>
              <Text style={styles.amountText}>{t.amount}$</Text>
            </View>
          ))}
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
    paddingBlock: 10,
  },
  transactions: {
    backgroundColor: "white",
    margin: 20,
    marginTop: 4,
    borderRadius: 10,
  },
  circle: {
    backgroundColor: Colors.lightGray,
    borderRadius: 50,
    padding: 10,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    margin: 10,
  },
  amountText: {
    fontWeight: "bold",
  },
});
