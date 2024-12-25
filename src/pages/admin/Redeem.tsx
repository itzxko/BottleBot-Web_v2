import React, { useEffect, useState } from "react";
import Navigation from "../../components/admin/Navigation";
import { useRewards } from "../../contexts/RewardsProvider";
import {
  RiAddLine,
  RiArchiveLine,
  RiArrowRightSLine,
  RiEdit2Line,
  RiInboxUnarchiveLine,
  RiXrpLine,
} from "react-icons/ri";
import AddForm from "../../components/admin/rewards/AddForm";
import EditForm from "../../components/admin/rewards/EditForm";
import axios from "axios";
import Notification from "../../components/Notification";
import RedeemForm from "../../components/admin/rewards/RedeemForm";

const Redeem = () => {
  const { rewards, getRewards, pages } = useRewards();
  const [rewardName, setRewardName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [status, setStatus] = useState("active");
  const categories = ["Goods", "Clothing", "Beverage", "Other"];
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [rewardId, setRewardId] = useState("");
  const [redeemForm, setRedeemForm] = useState(false);

  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRewards(rewardName, categoryName, page, limit, status);
  }, [rewardName, categoryName, page, status]);

  const toggleStatus = () => {
    setPage(1);
    if (status === "active") {
      setStatus("archived");
    } else if (status === "archived") {
      setStatus("active");
    }
  };

  const archiveReward = async (rewardId: string) => {
    if (rewardId) {
      try {
        let url = `http://localhost:8080/api/rewards/${rewardId}`;

        let response = await axios.delete(url);

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getRewards(rewardName, categoryName, 1, limit, status);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const unarchiveReward = async (reward: any) => {
    if (reward) {
      const formData = new FormData();

      formData.append("rewardName", reward.rewardName);
      formData.append("pointsRequired", reward.pointsRequired);
      formData.append("rewardDescription", reward.rewardDescription);
      formData.append("stocks", reward.stocks);
      formData.append("category", reward.category);
      formData.append("validFrom", reward.validFrom);
      formData.append("validUntil", reward.validUntil);
      formData.append("imageChanged", "false");
      formData.append("archiveDate", "");
      try {
        let url = `http://localhost:8080/api/rewards/${reward._id}`;

        let response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getRewards(rewardName, categoryName, 1, limit, status);
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
                value={rewardName}
                onChange={(e) => {
                  setRewardName(e.target.value);
                  setPage(1);
                }}
                className="w-full outline-none text-xs font-normal bg-[#FCFCFC]"
                placeholder="search rewards"
              />
            </div>
            <div
              className="flex flex-row items-center justify-center space-x-2 px-3 py-1 bg-[#050301] rounded-full cursor-pointer"
              onClick={toggleStatus}
            >
              <p className="text-xs font-normal text-white">{status}</p>
              <i className="ri-refresh-line text-sm text-white"></i>
            </div>
          </div>
          {/* label */}
          <div className="w-full flex flex-row items-center justify-between px-1">
            <div className="w-2/3 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Rewards Overview</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                choose a reward to redeem
              </p>
            </div>
            <div
              className="p-2 rounded-full bg-[#050301] cursor-pointer"
              onClick={() => setAddForm(true)}
            >
              <RiAddLine size={16} color="white" />
            </div>
          </div>
          {/* categories */}
          <div className="w-full flex flex-row items-center justify-start overflow-x-auto scrollbar-hide space-x-2">
            {categories.map((category: any) => (
              <div
                className={`${
                  category === categoryName
                    ? "bg-gradient-to-tr from-[#466600] to-[#699900]"
                    : "bg-[#FCFCFC]"
                } min-w-[30px] py-3 px-6 rounded-full cursor-pointer flex items-center justify-center`}
                key={category}
                onClick={() => {
                  if (category === categoryName) {
                    setCategoryName("");
                  } else if (category !== categoryName) {
                    setCategoryName(category);
                  }
                }}
              >
                <p
                  className={`${
                    category === categoryName ? "text-white" : "text-black"
                  } text-xs font-normal`}
                >
                  {category}
                </p>
              </div>
            ))}
          </div>
          {/* rewards */}
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            {rewards.length > 0 ? (
              rewards.map((reward: any) => {
                console.log(reward.image);
                return (
                  <div
                    className="w-full flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#FCFCFC]"
                    key={reward._id}
                  >
                    <div
                      className={`w-full flex flex-row bg-cover bg-center items-start justify-between space-x-4 h-[220px]`}
                      style={{
                        backgroundImage: `url(http://localhost:8080/api/images/${reward.image})`,
                      }}
                    >
                      <div className="w-full h-full flex items-start justify-center bg-gradient-to-tr from-black/25 to-black/75 p-6">
                        <div className="w-full flex flex-row justify-end items-center space-x-2">
                          {reward.archiveDate === null ? (
                            <div
                              className="p-2 rounded-full bg-[#EDEDED]/10 cursor-pointer"
                              onClick={() => {
                                setEditForm(true);
                                setRewardId(reward._id);
                              }}
                            >
                              <RiEdit2Line size={16} color="white" />
                            </div>
                          ) : null}
                          {reward.archiveDate === null ? (
                            <div
                              className="p-2 rounded-full bg-[#EDEDED]/10 cursor-pointer"
                              onClick={() => archiveReward(reward._id)}
                            >
                              <RiArchiveLine size={16} color="white" />
                            </div>
                          ) : reward.archiveDate !== null ? (
                            <div
                              className="p-2 rounded-full bg-[#EDEDED]/10 cursor-pointer"
                              onClick={() => unarchiveReward(reward)}
                            >
                              <RiInboxUnarchiveLine size={16} color="white" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-row items-end justify-between p-6 space-x-4">
                      <div className="w-3/4 flex flex-col items-center justify-start">
                        <p className="text-xs font-semibold w-full truncate">
                          {reward.rewardName}
                        </p>

                        <p className="text-xs font-normal text-[#6E6E6E] w-full truncate">
                          {reward.stocks} available
                        </p>
                        <p className="text-xs font-normal text-[#6E6E6E] capitalize w-full truncate">
                          {`Cost: ${reward.pointsRequired} ${
                            reward.pointsRequired > 1 ? "pts." : "pt."
                          }`}
                        </p>
                      </div>
                      <div
                        className="flex p-2 rounded-full items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                        onClick={() => {
                          setRewardId(reward._id);
                          setRedeemForm(true);
                        }}
                      >
                        <RiArrowRightSLine size={16} color="white" />
                      </div>
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
                  No Rewards Found
                </p>
              </div>
            )}
          </div>
          {/* pages */}
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
      {notif && (
        <Notification message={message} onClose={() => setNotif(false)} />
      )}
      {addForm && (
        <AddForm
          onClose={() => {
            setAddForm(false);
            getRewards(rewardName, categoryName, page, limit, status);
          }}
        />
      )}
      {editForm && (
        <EditForm
          rewardId={rewardId}
          onClose={() => {
            setEditForm(false);
            getRewards(rewardName, categoryName, page, limit, status);
          }}
        />
      )}
      {redeemForm && (
        <RedeemForm
          rewardId={rewardId}
          onClose={() => {
            setRedeemForm(false);
            getRewards(rewardName, categoryName, page, limit, status);
          }}
        />
      )}
    </>
  );
};

export default Redeem;
