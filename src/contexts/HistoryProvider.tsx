import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const HistoryContext = createContext<any>(null);

export const HistoryProvider = ({ children }: any) => {
  const [rewardsHistory, setRewardsHistory] = useState([]);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [pointsPage, setPointsPage] = useState(0);
  const [rewardsPage, setRewardsPage] = useState(0);

  const getRewardsHistory = async (
    userName: string,
    page: number,
    limit: number,
    status: string
  ) => {
    if (page && limit && status) {
      try {
        let url = `http://localhost:8080/api/history/claim?userName=${userName}&page=${page}&limit=${limit}&status=${status}`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          setRewardsHistory(response.data.allusersrewardclaimhistory);
          setRewardsPage(response.data.totalPages);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const getPointsHistory = async (
    userName: string,
    page: number,
    limit: number,
    status: string
  ) => {
    if (page && limit && status) {
      try {
        let url = `http://localhost:8080/api/history/dispose?userName=${userName}&page=${page}&limit=${limit}&status=${status}`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          setPointsHistory(response.data.allusersdisposalhistory);
          setPointsPage(response.data.totalPages);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        rewardsHistory,
        getRewardsHistory,
        rewardsPage,
        pointsHistory,
        getPointsHistory,
        pointsPage,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
