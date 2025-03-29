import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../components/admin/Navigation";
import {
  RiAddLine,
  RiCalendarLine,
  RiCloseLine,
  RiDownloadCloud2Line,
  RiFileHistoryLine,
  RiFileListLine,
  RiTimer2Line,
} from "react-icons/ri";
import { useReports } from "../../contexts/ReportsProvider";
import { useUsers } from "../../contexts/UsersProvider";
import { useRewards } from "../../contexts/RewardsProvider";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {
    getTotalCollected,
    totalCollected,
    getTotalPoints,
    totalPoints,
    getTotalClaims,
    totalClaims,
    getDemographics,
    demographics,
    accountsSummary,
    getAccountsSummary,
    topContributors,
    getTopContributors,
    topRewards,
    getTopRewards,
  } = useReports();
  const { allUsers, getAllUsers } = useUsers();
  const { allRewards, getAllRewards } = useRewards();

  useEffect(() => {
    const getReportData = async () => {
      await getAllUsers();
      await getAllRewards();
      await getTotalCollected(startDate, endDate);
      await getTotalPoints(startDate, endDate);
      await getTotalClaims(startDate, endDate);
      await getDemographics();
      await getAccountsSummary();
      await getTopContributors(startDate, endDate);
      await getTopRewards(startDate, endDate);
    };

    getReportData();
  }, [startDate, endDate]);

  const generatePdf = () => {
    console.log("Generating PDF...");
    const doc = new jsPDF();

    // Title and Date Range
    doc.setFontSize(16);
    doc.text("BottleBot Report", 105, 10, { align: "center" });

    doc.setFontSize(12);
    doc.text(`From: ${startDate} To: ${endDate}`, 105, 20, { align: "center" });

    // Add space before the first table
    const initialY = 30;

    // Table 1: Collection Summary
    autoTable(doc, {
      head: [["Metric", "Value"]],
      body: [
        ["Total Bottles Collected", totalCollected],
        ["Total Points Earned", totalPoints],
        ["Reward Claims", totalClaims],
      ],
      startY: initialY,
    });

    // Table 2: Demographics
    const finalY1 = (doc as any).lastAutoTable.finalY;
    autoTable(doc, {
      head: [["Demographics", "Count"]],
      body: [
        ["Male", demographics.male],
        ["Female", demographics.female],
        ["Others", demographics.other],
      ],
      startY: finalY1 + 15, // Added more space
    });

    // Table 3: Account Summary
    const finalY2 = (doc as any).lastAutoTable.finalY;
    autoTable(doc, {
      head: [["Account Type", "Count"]],
      body: [
        ["Admin Accounts", accountsSummary.admin],
        ["Staff Accounts", accountsSummary.staff],
        ["Citizen Accounts", accountsSummary.citizen],
      ],
      startY: finalY2 + 15, // Added more space
    });

    // Table 4: Contributors
    const contributorsBody = topContributors.map((contributor: any) => {
      const user = allUsers.find((user: any) => user._id === contributor._id);
      return [
        `${user?.personalInfo?.firstName || ""} ${
          user?.personalInfo?.middleName || ""
        } ${user?.personalInfo?.lastName || ""}`,
        `${contributor.totalBottles} Bottles`,
      ];
    });

    const finalY3 = (doc as any).lastAutoTable.finalY;
    autoTable(doc, {
      head: [["Contributor", "Total Bottles"]],
      body: contributorsBody,
      startY: finalY3 + 15, // Added more space
    });

    // Table 5: Rewards
    const rewardsBody = topRewards.map((redeemable: any) => {
      const reward = allRewards.find(
        (reward: any) => reward._id === redeemable._id
      );
      return [reward?.rewardName || "N/A", `${redeemable.count} pcs`];
    });

    const finalY4 = (doc as any).lastAutoTable.finalY;
    autoTable(doc, {
      head: [["Reward", "Quantity"]],
      body: rewardsBody,
      startY: finalY4 + 15, // Added more space
    });

    // Save PDF
    doc.save("BottleBot_Report.pdf");
  };

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
    endDateRef.current?.showPicker(); // Automatically trigger end date
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleClearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center gap-6">
          {/* search */}
          <div className="w-full flex flex-row items-center justify-between rounded-full py-3 pl-6 pr-4 bg-[#FCFCFC]">
            <div className="w-2/3 flex flex-row items-center justify-center space-x-4">
              <i className="ri-search-2-line text-sm text-[#6E6E6E]"></i>
              <input
                type="text"
                value={
                  startDate && endDate
                    ? `${startDate} to ${endDate}`
                    : "Filter Date"
                }
                className="w-full outline-none text-xs font-normal bg-[#FCFCFC]"
                placeholder="search users"
                readOnly
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <div
                onClick={() => startDateRef.current?.showPicker()}
                className="flex flex-row items-center justify-center space-x-2 p-2 bg-[#050301] rounded-full cursor-pointer"
              >
                <RiCalendarLine size={14} color="white" />
              </div>
              {startDate && endDate ? (
                <div
                  onClick={handleClearDates}
                  className="flex flex-row items-center justify-center space-x-2 p-2 bg-gradient-to-tr from-[#466600] to-[#699900] rounded-full cursor-pointer"
                >
                  <RiCloseLine size={14} color="white" />
                </div>
              ) : null}
            </div>

            {/* Hidden Date Inputs */}
            <input
              type="date"
              ref={startDateRef}
              value={startDate}
              onChange={handleStartDateChange}
              className="hidden"
            />
            <input
              type="date"
              ref={endDateRef}
              value={endDate}
              onChange={handleEndDateChange}
              className="hidden"
              min={startDate}
            />
          </div>
          {/* label */}
          <div className="w-full flex flex-row items-center justify-between px-1">
            <div className="w-2/3 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Reports Overview</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                overview of data collected and stored
              </p>
            </div>
            <div
              className="p-2 rounded-full bg-[#050301] cursor-pointer"
              onClick={generatePdf}
            >
              <RiDownloadCloud2Line size={16} color="white" />
            </div>
          </div>
          <div className="w-full flex flex-col itece justify-center gap-2">
            <div className="w-full flex flex-row items-center justify-between bg-[#FCFCFC] px-6 py-4 rounded-xl">
              <div className="w-2/3 flex flex-row items-center justify-start gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiTimer2Line size={14} color="white" />
                </div>
                <p className="text-xs font-normal truncate">
                  Total Bottles Collected
                </p>
              </div>
              <p className="text-xs font-normal">{totalCollected}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between bg-[#FCFCFC] px-6 py-4 rounded-xl">
              <div className="w-2/3 flex flex-row items-center justify-start gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiTimer2Line size={14} color="white" />
                </div>
                <p className="text-xs font-normal truncate">
                  Total Points Earned
                </p>
              </div>
              <p className="text-xs font-normal">{totalPoints}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between bg-[#FCFCFC] px-6 py-4 rounded-xl">
              <div className="w-2/3 flex flex-row items-center justify-start gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiTimer2Line size={14} color="white" />
                </div>
                <p className="text-xs font-normal truncate">Reward Claims</p>
              </div>
              <p className="text-xs font-normal">{totalClaims}</p>
            </div>
            <div className="w-full flex flex-col items-center justify-between bg-[#FCFCFC] px-6 py-4 rounded-xl gap-8">
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiTimer2Line size={14} color="white" />
                </div>
                <p className="text-xs font-normal truncate">Demographics</p>
              </div>
              <div className="w-full flex flex-row items-center justify-between px-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                  <p className="text-xs font-normal">
                    Male: {demographics.male}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                  <p className="text-xs font-normal">
                    Female: {demographics.female}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                  <p className="text-xs font-normal">
                    Other: {demographics.other}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-between bg-[#FCFCFC] px-6 py-4 rounded-xl gap-8">
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiTimer2Line size={14} color="white" />
                </div>
                <p className="text-xs font-normal truncate">Accounts Summary</p>
              </div>
              <div className="w-full flex flex-row items-center justify-between px-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                  <p className="text-xs font-normal">
                    Admin: {accountsSummary.admin}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                  <p className="text-xs font-normal">
                    Staff: {accountsSummary.staff}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                  <p className="text-xs font-normal">
                    Citizen: {accountsSummary.citizen}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-full flex flex-col items-center justify-between bg-[#FCFCFC] px-6 py-4 rounded-xl gap-8"
              id="contributors"
            >
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiTimer2Line size={14} color="white" />
                </div>
                <p className="text-xs font-normal truncate">Top Contributors</p>
              </div>
              <div className="w-full flex flex-col items-center justify-between gap-4 px-4">
                {topContributors.length > 0 ? (
                  topContributors.map((contributor: any) => {
                    const user = allUsers.find(
                      (user: any) => user._id === contributor._id
                    );

                    return (
                      <div
                        className="w-full flex flex-row items-center justify-between"
                        key={contributor._id}
                      >
                        <div className="w-1/2 flex flex-row items-center justify-start gap-2">
                          <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                          <p className="text-xs font-normal truncate">
                            {`${user.personalInfo.firstName} ${user.personalInfo.middleName} ${user.personalInfo.lastName}`}
                          </p>
                        </div>
                        <p className="text-xs font-normal">{`${contributor.totalBottles} Bottles`}</p>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div
              className="w-full flex flex-col items-center justify-between bg-[#FCFCFC] px-6 py-4 rounded-xl gap-8"
              id="rewards"
            >
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiTimer2Line size={14} color="white" />
                </div>
                <p className="text-xs font-normal truncate">Top Rewards</p>
              </div>
              <div className="w-full flex flex-col items-center justify-between gap-4 px-4">
                {topRewards.length > 0 ? (
                  topRewards.map((redeemable: any) => {
                    const reward = allRewards.find(
                      (reward: any) => reward._id === redeemable._id
                    );

                    return (
                      <div
                        className="w-full flex flex-row items-center justify-between"
                        key={redeemable._id}
                      >
                        <div className="w-1/2 flex flex-row items-center justify-start gap-2">
                          <div className="w-[10px] h-[10px] rounded-full bg-[#699900]"></div>
                          <p className="text-xs font-normal truncate">
                            {`${reward.rewardName}`}
                          </p>
                        </div>
                        <p className="text-xs font-normal">{`${redeemable.count} pcs`}</p>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
