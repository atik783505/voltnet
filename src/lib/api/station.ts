import { serverFetch } from "../core/server";

export const getAllStations = async (queryParams: string = '') => {
  return await serverFetch(`/api/stations${queryParams}`, false);
};

export const getStation = async (stationId: string) => {
  return await serverFetch(`/api/stations/${stationId}`, false);
}