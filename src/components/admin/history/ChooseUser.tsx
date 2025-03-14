import React, { useEffect, useState } from "react";
import { useCitizens } from "../../../contexts/CitizensProvider";
import {
  RiArrowRightSLine,
  RiQrCodeLine,
  RiSearch2Line,
  RiXrpLine,
} from "react-icons/ri";
import Man from "../../../assets/Man.jpg";
import axios from "axios";
import Notification from "../../Notification";
import { useUrl } from "../../../contexts/UrlProvider";

const ChooseUser = ({
  points,
  historyId,
  rewardId,
  onClose,
}: {
  rewardId: string;
  onClose: () => void;
  historyId: string | null;
  points: string;
}) => {
  const { citizens, getCitizens, pages } = useCitizens();
  const [userName, setUserName] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [citizenPoints, setCitizenPoints] = useState<{ [key: string]: number }>(
    {}
  );

  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { urlString } = useUrl();

  useEffect(() => {
    getCitizens(userName, page, limit);
  }, [page, userName]);

  const redeemReward = async (userId: string) => {
    if (rewardId && userId) {
      try {
        let url = `${urlString}/api/history/claim`;

        let response = await axios.post(url, {
          userId: userId,
          rewardId: rewardId,
        });

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
        } else {
          setNotif(true);
          setError(true);
          setMessage(response.data.message);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const updateHistory = async (userId: string) => {
    if (rewardId && userId && historyId !== null) {
      try {
        let url = `${urlString}/api/history/claim/${historyId}`;

        let response = await axios.put(url, {
          userId: userId,
          rewardId: rewardId,
          pointsSpent: points,
        });

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
        } else {
          setNotif(true);
          setError(true);
          setMessage(response.data.message);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchPointsForAllCitizens = async () => {
      const promises = citizens.map(async (citizen: any) => {
        try {
          const response = await axios.get(
            `${urlString}/api/history/claim/points/${citizen._id}`
          );
          return {
            id: citizen._id,
            points: response.data.availablePoints.availablePoints || 0,
          };
        } catch (error) {
          console.error("Failed to fetch points:", error);
          return { id: citizen._id, points: 0 };
        }
      });

      const results = await Promise.all(promises);
      const pointsMap = results.reduce(
        (acc, result) => ({ ...acc, [result.id]: result.points }),
        {}
      );
      setCitizenPoints(pointsMap);
    };

    if (citizens.length > 0) {
      fetchPointsForAllCitizens();
    }
  }, [citizens]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start p-4 overflow-y-auto font-DM z-20">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          {/* card */}
          <div className="w-full lg:w-2/6 bg-[#FCFCFC] p-6 rounded-xl flex flex-col space-y-4">
            <div className="w-full flex flex-row justify-between items-center space-x-4 pb-6">
              <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                <div className="px-2 py-1 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <i className="ri-pencil-line text-white font-normal text-sm"></i>
                </div>
                <div className="w-3/5 flex flex-row space-x-1 ">
                  <p className="w-full text-xs font-semibold truncate">
                    {historyId === null ? "Choose User" : "Edit Reward History"}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="px-2.5 py-1 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={() => onClose()}
                >
                  <i className="ri-close-line text-sm"></i>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start px-6 py-3 rounded-full bg-[#EDEDED] space-x-4">
              <RiSearch2Line size={16} color={"#6E6E6E"} />
              <input
                type="text"
                className="bg-[#EDEDED] outline-none text-xs font-normal w-full"
                value={userName || ""}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setPage(1);
                }}
                placeholder="search citizens"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {citizens.length > 0 ? (
                citizens.map((citizen: any) => {
                  return (
                    <div
                      className="w-full flex flex-row items-center justify-between p-6 rounded-xl bg-[#EDEDED]"
                      key={citizen._id}
                    >
                      <div className="w-3/4 flex flex-row items-center justify-start space-x-4">
                        <img
                          src={Man}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <div className="w-2/4 flex flex-col items-start justify-center ">
                          <p className="text-xs font-semibold w-full truncate">{`${citizen.personalInfo.firstName} ${citizen.personalInfo.middleName} ${citizen.personalInfo.lastName}`}</p>
                          <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                            #{citizen._id}
                          </p>
                          <p className="text-xs font-normal text-[#6E6E6E]">
                            Points: {citizenPoints[citizen._id] || 0}
                          </p>
                        </div>
                      </div>
                      <div
                        className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                        onClick={() => {
                          if (historyId === null) {
                            redeemReward(citizen._id);
                          } else if (historyId !== null) {
                            updateHistory(citizen._id);
                          }
                        }}
                      >
                        <RiArrowRightSLine size={16} color="white" />
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
                    No Users Found
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center justify-center space-x-4 py-6">
              {Array.from({ length: pages }, (_, index) => index + 1)
                .filter(
                  (pageNumber) =>
                    pageNumber === page ||
                    pageNumber === page - 1 ||
                    pageNumber === page + 1
                )
                .map((pageNumber) => (
                  <p
                    key={pageNumber}
                    className={`cursor-pointer ${
                      page === pageNumber
                        ? "font-semibold text-sm"
                        : "font-normal text-xs text-[#6E6E6E]"
                    }`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            setNotif(false);
            if (!error) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default ChooseUser;
