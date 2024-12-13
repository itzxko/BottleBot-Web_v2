import React from "react";
import { RiCloudWindyLine } from "react-icons/ri";

const Rainfall = ({
  data,
  onClose,
  date,
}: {
  data: any;
  onClose: () => void;
  date: string;
}) => {
  const convertToTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString([], options);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-[100svh] bg-black/50 flex items-center justify-center font-DM p-6">
      <div className="w-3/4 lg:w-1/4 flex flex-col items-center justify-center rounded-xl bg-[#FAFAFA] overflow-hidden">
        <div className="w-full flex flex-row items-center justify-between shadow-xl shadow-black/10 px-6 py-4">
          <p className="text-sm font-semibold">Rainfall Forecast</p>
          <i
            className="ri-close-line text-md cursor-pointer"
            onClick={onClose}
          ></i>
        </div>
        <div className="py-10 px-6 w-full flex flex-col items-center justify-center space-y-4">
          {data.length > 0 ? (
            data.map((hour: any, index: any) => (
              <div
                className="w-full flex flex-row items-center justify-between"
                key={index}
              >
                <p className="text-xs font-normal">
                  {convertToTime(hour.datetime)}
                </p>
                <p className="text-xs font-normal">
                  {hour.precipprob
                    ? `${hour.precipprob}% Probability`
                    : "No Data"}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="w-full flex flex-col items-center justify-center">
                <div className="p-3 mb-2 rounded-full bg-[#699900]">
                  <RiCloudWindyLine size={16} color="white" />
                </div>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  No Rainy Forecasts Today
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rainfall;
