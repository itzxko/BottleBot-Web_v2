import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useUrl } from "./UrlProvider";

const RewardsContext = createContext<any>(null);

export const RewardsProvider = ({ children }: any) => {
  const [rewards, setRewards] = useState([]);
  const [pages, setPages] = useState(0);
  const [activeRewards, setActiveRewards] = useState([]);
  const [activePages, setActivePages] = useState(0);
  const { urlString } = useUrl();

  const getRewards = async (
    rewardName: string,
    category: string,
    page: number,
    limit: number,
    status: string
  ) => {
    if (page && limit && status) {
      try {
        let url = `${urlString}/api/rewards?rewardName=${rewardName}&category=${category}&page=${page}&limit=${limit}&status=${status}`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          setRewards(response.data.rewards);
          setPages(response.data.totalPages);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const getActiveRewards = async (
    rewardName: string,
    category: string,
    page: number,
    limit: number
  ) => {
    if (page && limit) {
      try {
        let url = `${urlString}/api/rewards?rewardName=${rewardName}&category=${category}&page=${page}&limit=${limit}&status=active`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          setActiveRewards(response.data.rewards);
          setActivePages(response.data.totalPages);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const getAllRewards = async () => {
    try {
      let url = `${urlString}/api/rewards?page=1&limit=0`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setRewards(response.data.rewards);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // const getUserPoints = async (userId: string) => {
  //   if (userId) {
  //     try {
  //       let url = `http://localhost:8080/api/history/claim/points/${userId}`;

  //       let response = await axios.get(url)

  //       if (response.data.success === true) {

  //       }
  //     }
  //     catch (error: any) {
  //       console.log(error)
  //     }
  //   }
  // }

  return (
    <RewardsContext.Provider
      value={{
        rewards,
        getRewards,
        pages,
        getActiveRewards,
        getAllRewards,
        activeRewards,
        activePages,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => useContext(RewardsContext);
