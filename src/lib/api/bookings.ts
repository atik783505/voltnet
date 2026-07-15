import { serverFetch } from "../core/server";

export const getChargingHistory = async (email: string) => {
  return await serverFetch(`/api/history/charging/${email}`, false);
};

// 💳 Payment Transactions Fetcher
export const getTransactionHistory = async (email: string) => {
  return await serverFetch(`/api/history/transactions/${email}`, false);
};