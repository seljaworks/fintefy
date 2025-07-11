import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export type Transaction = {
  id: string;
  amount: number;
  date: Date;
  description: string;
  title: string;
};

export type BalanceState = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  totalBalance: () => number;
  clearTransaction: () => void;
};
export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      totalBalance: () =>
        get().transactions.reduce((acc, t) => acc + t.amount, 0),
      addTransaction: (transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
      clearTransaction: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
