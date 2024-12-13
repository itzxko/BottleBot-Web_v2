import { useEffect, useState } from "react";
import Navigation from "../../components/admin/Navigation";
import {
  RiAddLine,
  RiArchiveLine,
  RiEdit2Line,
  RiFolder6Line,
  RiInboxUnarchiveLine,
  RiXrpLine,
} from "react-icons/ri";
import { useHistory } from "../../contexts/HistoryProvider";
import { useRewards } from "../../contexts/RewardsProvider";
import Man from "../../assets/Man.jpg";
import axios from "axios";
import Notification from "../../components/Notification";
import ChooseUser from "../../components/admin/history/ChooseUser";
import ChooseReward from "../../components/admin/history/ChooseReward";

const History = () => {
  const {
    rewardsHistory,
    getRewardsHistory,
    rewardsPage,
    pointsHistory,
    getPointsHistory,
    pointsPage,
  } = useHistory();
  const { getAllRewards, rewards } = useRewards();
  const [rewardsCurrentPage, setRewardsCurrentPage] = useState(1);
  const [pointsCurrentPage, setPointsCurrentPage] = useState(1);
  const [rewardSearch, setRewardSearch] = useState("");
  const [pointSearch, setPointSearch] = useState("");
  const [rewardsStatus, setRewardsStatus] = useState("active");
  const [pointsStatus, setPointsStatus] = useState("active");
  const [limit, setLimit] = useState(4);
  const [rewardForm, setRewardForm] = useState(false);
  const [historyId, setHistoryId] = useState<string | null>(null);

  //notif
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllRewards();
    getRewardsHistory(rewardSearch, rewardsCurrentPage, limit, rewardsStatus);
  }, [rewardSearch, rewardsCurrentPage, rewardsStatus]);

  useEffect(() => {
    getPointsHistory(pointSearch, pointsCurrentPage, limit, pointsStatus);
  }, [pointSearch, pointsCurrentPage, pointsStatus]);

  const toggleRewardsStatus = () => {
    if (rewardsStatus === "active") {
      setRewardsStatus("archived");
    } else if (rewardsStatus === "archived") {
      setRewardsStatus("active");
    }
  };

  const togglePointsStatus = () => {
    if (pointsStatus === "active") {
      setPointsStatus("archived");
    } else if (pointsStatus === "archived") {
      setPointsStatus("active");
    }
  };

  const archiveRewardHistory = async (historyId: string) => {
    if (historyId) {
      try {
        let url = `http://localhost:8080/api/history/claim/${historyId}`;

        let response = await axios.delete(url);

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getRewardsHistory(rewardSearch, 1, limit, rewardsStatus);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const archivePointHistory = async (historyId: string) => {
    if (historyId) {
      try {
        let url = `http://localhost:8080/api/history/dispose/${historyId}`;

        let response = await axios.delete(url);

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getPointsHistory(pointSearch, 1, limit, pointsStatus);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const unarchiveRewardHistory = async (rewardHistory: any) => {
    if (rewardHistory) {
      try {
        let url = `http://localhost:8080/api/history/claim/${rewardHistory._id}`;

        let response = await axios.put(url, {
          archiveDate: null,
          userId: rewardHistory.userId,
          rewardId: rewardHistory.rewardId,
          pointsSpent: rewardHistory.pointsSpent,
        });

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getRewardsHistory(rewardSearch, 1, limit, rewardsStatus);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const unarchivePointHistory = async (pointHistory: any) => {
    if (pointHistory) {
      try {
        let url = `http://localhost:8080/api/history/dispose/${pointHistory._id}`;

        let response = await axios.put(url, {
          userId: pointHistory.userId,
          bottleCount: pointHistory.bottleCount,
          pointsAccumulated: pointHistory.pointsAccumulated,
          archiveDate: null,
        });

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getPointsHistory(pointSearch, 1, limit, pointsStatus);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-4">
          {/* search */}
          <div className="w-full flex flex-row items-center justify-between rounded-full py-3 pl-6 pr-4 bg-[#FCFCFC]">
            <div className="w-2/3 flex flex-row items-center justify-center space-x-4">
              <i className="ri-search-2-line text-sm text-[#6E6E6E]"></i>
              <input
                type="text"
                value={rewardSearch}
                onChange={(e) => {
                  setRewardSearch(e.target.value);
                  setRewardsCurrentPage(1);
                }}
                className="w-full outline-none text-xs font-normal bg-[#FCFCFC]"
                placeholder="search users"
              />
            </div>
            <div
              className="flex flex-row items-center justify-center space-x-2 px-3 py-1 bg-[#050301] rounded-full cursor-pointer"
              onClick={toggleRewardsStatus}
            >
              <p className="text-xs font-normal text-white">{rewardsStatus}</p>
              <i className="ri-refresh-line text-sm text-white"></i>
            </div>
          </div>

          {/* label */}
          <div className="w-full flex flex-row items-center justify-between px-1">
            <div className="w-2/3 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Rewards History</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                all rewards claim history
              </p>
            </div>
            <div
              className="p-2 rounded-full bg-[#050301] cursor-pointer"
              onClick={() => {
                setRewardForm(true);
                setHistoryId(null);
              }}
            >
              <RiAddLine size={16} color="white" />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            {rewardsHistory.length > 0 ? (
              rewardsHistory.map((rewardHistory: any) => {
                const reward = rewards.find(
                  (rewards: any) => rewardHistory.rewardId === rewards._id
                );

                if (!reward) {
                  return null;
                }

                return (
                  <div
                    className="w-full flex flex-col items-center justify-center p-6 rounded-xl bg-[#FCFCFC] space-y-6"
                    key={rewardHistory._id}
                  >
                    <div className="w-full flex flex-row items-start justify-between space-x-4">
                      <img
                        src={`http://localhost:8080/api/images/${reward.image}`}
                        alt=""
                        className="w-[80px] h-[80px] rounded-full"
                      />
                      <div className="flex flex-row justify-center items-center space-x-2">
                        {rewardHistory.archiveDate === null ? (
                          <div
                            className="p-2 rounded-full bg-black/10 cursor-pointer"
                            onClick={() => {
                              setRewardForm(true);
                              setHistoryId(rewardHistory._id);
                            }}
                          >
                            <RiEdit2Line size={16} color="black" />
                          </div>
                        ) : null}
                        {rewardHistory.archiveDate === null ? (
                          <div
                            className="p-2 rounded-full bg-black/10 cursor-pointer"
                            onClick={() =>
                              archiveRewardHistory(rewardHistory._id)
                            }
                          >
                            <RiArchiveLine size={16} color="black" />
                          </div>
                        ) : rewardHistory.archiveDate !== null ? (
                          <div
                            className="p-2 rounded-full bg-black/10 cursor-pointer"
                            onClick={() =>
                              unarchiveRewardHistory(rewardHistory)
                            }
                          >
                            <RiInboxUnarchiveLine size={16} color="black" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center">
                      <p className="text-xs font-semibold w-full truncate">
                        {reward.rewardName}
                      </p>

                      <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                        Points Spent:{" "}
                        {`${rewardHistory.pointsSpent} ${
                          rewardHistory.pointsSpent > 1 ? "pts." : "pt."
                        }`}
                      </p>
                      <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                        Date: {rewardHistory.dateClaimed}
                      </p>
                      <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                        Citizen:{" "}
                        {`${rewardHistory.userInfo.personalInfo.firstName} ${rewardHistory.userInfo.personalInfo.middleName} ${rewardHistory.userInfo.personalInfo.lastName}`}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="min-h-[40svh] p-6 w-full flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiXrpLine size={22} color="white" />
                </div>
                <p className="text-xs font-normal capitalize">No Users Found</p>
              </div>
            )}
          </div>
          {/* pages */}
          <div className="flex flex-row items-center justify-center space-x-4 py-6">
            {Array.from({ length: rewardsPage }, (_, index) => index + 1)
              .filter(
                (pageNumber) =>
                  pageNumber === rewardsCurrentPage ||
                  pageNumber === rewardsCurrentPage - 1 ||
                  pageNumber === rewardsCurrentPage + 1
              )
              .map((pageNumber) => (
                <p
                  key={pageNumber}
                  className={`cursor-pointer ${
                    rewardsCurrentPage === pageNumber
                      ? "font-semibold text-sm"
                      : "font-normal text-xs text-[#6E6E6E]"
                  }`}
                  onClick={() => setRewardsCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-4">
          {/* search */}
          <div className="w-full flex flex-row items-center justify-between rounded-full py-3 pl-6 pr-4 bg-[#FCFCFC]">
            <div className="w-2/3 flex flex-row items-center justify-center space-x-4">
              <i className="ri-search-2-line text-sm text-[#6E6E6E]"></i>
              <input
                type="text"
                value={pointSearch}
                onChange={(e) => {
                  setPointSearch(e.target.value);
                  setPointsCurrentPage(1);
                }}
                className="w-full outline-none text-xs font-normal bg-[#FCFCFC]"
                placeholder="search users"
              />
            </div>
            <div
              className="flex flex-row items-center justify-center space-x-2 px-3 py-1 bg-[#050301] rounded-full cursor-pointer"
              onClick={togglePointsStatus}
            >
              <p className="text-xs font-normal text-white">{pointsStatus}</p>
              <i className="ri-refresh-line text-sm text-white"></i>
            </div>
          </div>

          {/* label */}
          <div className="w-full flex flex-row items-center justify-between px-1">
            <div className="w-2/3 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Points History</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                all disposals history
              </p>
            </div>
            <div className="p-2 rounded-full bg-[#050301] cursor-pointer">
              <RiAddLine size={16} color="white" />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            {pointsHistory.length > 0 ? (
              pointsHistory.map((pointHistory: any) => {
                return (
                  <div
                    className="w-full flex flex-col items-center justify-center p-6 rounded-xl bg-[#FCFCFC] space-y-6"
                    key={pointHistory._id}
                  >
                    <div className="w-full flex flex-row items-start justify-between space-x-4">
                      <img
                        src={Man}
                        alt=""
                        className="w-[80px] h-[80px] rounded-full"
                      />
                      <div className="flex flex-row justify-center items-center space-x-2">
                        {pointHistory.archiveDate === null ? (
                          <div className="p-2 rounded-full bg-black/10 cursor-pointer">
                            <RiEdit2Line size={16} color="black" />
                          </div>
                        ) : null}
                        {pointHistory.archiveDate === null ? (
                          <div
                            className="p-2 rounded-full bg-black/10 cursor-pointer"
                            onClick={() =>
                              archivePointHistory(pointHistory._id)
                            }
                          >
                            <RiArchiveLine size={16} color="black" />
                          </div>
                        ) : pointHistory.archiveDate !== null ? (
                          <div
                            className="p-2 rounded-full bg-black/10 cursor-pointer"
                            onClick={() => unarchivePointHistory(pointHistory)}
                          >
                            <RiInboxUnarchiveLine size={16} color="black" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center">
                      <p className="text-xs font-semibold w-full truncate">
                        {pointHistory.userInfo.personalInfo.firstName}
                      </p>

                      <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                        Points Earned:{" "}
                        {`${pointHistory.pointsAccumulated} ${
                          pointHistory.pointsAccumulated > 1 ? "pts." : "pt."
                        }`}
                      </p>
                      <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                        Date: {pointHistory.dateDisposed}
                      </p>
                      <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                        Bottle Count: {pointHistory.bottleCount}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="min-h-[40svh] p-6 w-full flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiXrpLine size={22} color="white" />
                </div>
                <p className="text-xs font-normal capitalize">
                  No History Found
                </p>
              </div>
            )}
          </div>
          {/* pages */}
          <div className="flex flex-row items-center justify-center space-x-4 py-6">
            {Array.from({ length: pointsPage }, (_, index) => index + 1)
              .filter(
                (pageNumber) =>
                  pageNumber === pointsCurrentPage ||
                  pageNumber === pointsCurrentPage - 1 ||
                  pageNumber === pointsCurrentPage + 1
              )
              .map((pageNumber) => (
                <p
                  key={pageNumber}
                  className={`cursor-pointer ${
                    pointsCurrentPage === pageNumber
                      ? "font-semibold text-sm"
                      : "font-normal text-xs text-[#6E6E6E]"
                  }`}
                  onClick={() => setPointsCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </p>
              ))}
          </div>
        </div>
      </div>
      {notif && (
        <Notification onClose={() => setNotif(false)} message={message} />
      )}
      {rewardForm && (
        <ChooseReward
          historyId={historyId}
          onClose={() => {
            setRewardForm(false);
            getRewardsHistory(rewardSearch, 1, limit, rewardsStatus);
          }}
        />
      )}
    </>
  );
};

export default History;
