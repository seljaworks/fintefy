import { InfoResponse, ListingItem } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Page = () => {
  const fetchCurrencies = (): Promise<ListingItem[]> =>
    fetch("/api/listings").then((res) => res.json());

  const fetchCurrency = (ids: string): Promise<InfoResponse> =>
    fetch(`/api/info?id=${ids}`).then((res) => res.json());

  const { data: currencies, isLoading } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });

  const ids = currencies?.map((c) => c.id).join(",");

  const { data: currency } = useQuery({
    queryKey: ["currency", ids],
    queryFn: () => fetchCurrency(ids ?? ""),
    enabled: !!ids,
  });

  return (
    <View>
      {currencies?.map((c) => (
        <View
          key={c.id}
          style={{
            flexDirection: "row",
            padding: 16,
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image
            source={{ uri: currency?.[c.id]?.logo }}
            style={{ width: 32, height: 32 }}
          />
          <Text>{c.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
