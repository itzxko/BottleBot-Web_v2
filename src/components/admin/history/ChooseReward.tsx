import React, { useEffect, useState } from "react";
import { useRewards } from "../../../contexts/RewardsProvider";
import { RiArrowRightSLine, RiXrpLine } from "react-icons/ri";
import ChooseUser from "./ChooseUser";
import { useUrl } from "../../../contexts/UrlProvider";

const ChooseReward = ({
  historyId,
  onClose,
}: {
  onClose: () => void;
  historyId: string | null;
}) => {
  const { getActiveRewards, activeRewards, activePages } = useRewards();
  const [rewardSearch, setRewardSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(4);
  const categories = ["Goods", "Clothing", "Beverage", "Other"];

  const [rewardId, setRewardId] = useState("");
  const [points, setPoints] = useState("");
  const [userForm, setUserForm] = useState(false);
  const { urlString } = useUrl();

  useEffect(() => {
    getActiveRewards(rewardSearch, filter, page, limit);
  }, [rewardSearch, filter, page]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start py-8 px-4 overflow-y-auto font-DM z-20">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          {/* card */}
          <div className="w-full lg:w-2/6 bg-[#FCFCFC] p-6 rounded-xl flex-col space-y-4">
            <div className="w-full flex flex-row justify-between items-center space-x-4 pb-6">
              <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                <div className="px-2 py-1 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <i className="ri-pencil-line text-white font-normal text-sm"></i>
                </div>
                <div className="w-3/5 flex flex-row space-x-1 ">
                  <p className="w-full text-xs font-semibold truncate">
                    {historyId ? "Edit Reward History" : "Add Reward History"}
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
            <div className="w-full flex flex-row items-center justify-between rounded-full py-3 pl-6 pr-4 bg-[#EDEDED]">
              <div className="w-2/3 flex flex-row items-center justify-center space-x-4">
                <i className="ri-search-2-line text-sm text-[#6E6E6E]"></i>
                <input
                  type="text"
                  value={rewardSearch}
                  onChange={(e) => {
                    setRewardSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full outline-none text-xs font-normal bg-[#EDEDED]"
                  placeholder="search rewards"
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start overflow-x-auto scrollbar-hide space-x-2">
              {categories.map((category: any) => (
                <div
                  className={`${
                    category === filter
                      ? "bg-gradient-to-tr from-[#466600] to-[#699900]"
                      : "bg-[#EDEDED]"
                  } min-w-[30px] py-3 px-6 rounded-full cursor-pointer flex items-center justify-center`}
                  key={category}
                  onClick={() => {
                    if (category === filter) {
                      setFilter("");
                    } else if (category !== filter) {
                      setFilter(category);
                    }

                    setPage(1);
                  }}
                >
                  <p
                    className={`${
                      category === filter ? "text-white" : "text-black"
                    } text-xs font-normal`}
                  >
                    {category}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              {activeRewards.length > 0 ? (
                activeRewards.map((reward: any) => {
                  return (
                    <div
                      className="w-full flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#EDEDED]"
                      key={reward._id}
                    >
                      <div
                        className={`w-full flex flex-row bg-cover bg-center items-start justify-between space-x-4 h-[220px]`}
                        style={{
                          backgroundImage: `url(${urlString}/api/images/${reward.image})`,
                        }}
                      >
                        <div className="w-full h-full flex items-start justify-center bg-gradient-to-tr from-black/25 to-black/75 p-6"></div>
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
                            setPoints(reward.pointsRequired);
                            setRewardId(reward._id);
                            setUserForm(true);
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
            <div className="flex flex-row items-center justify-center space-x-4 py-6">
              {Array.from({ length: activePages }, (_, index) => index + 1)
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
      {userForm && (
        <ChooseUser
          points={points}
          rewardId={rewardId}
          onClose={() => {
            setUserForm(false);
            onClose();
          }}
          historyId={historyId}
        />
      )}
    </>
  );
};

export default ChooseReward;
