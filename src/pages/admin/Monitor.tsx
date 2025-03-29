import {
  RiAddLine,
  RiBatteryLine,
  RiDirectionLine,
  RiDonutChartFill,
  RiFloodLine,
  RiRainyLine,
  RiScanLine,
  RiXrpLine,
} from "react-icons/ri";
import Navigation from "../../components/admin/Navigation";
import { useWebsocket } from "../../contexts/WebsocketProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import RainfallAlert from "../../components/admin/alert/RainfallAlert";
import Rainfall from "../../components/admin/monitor/Rainfall";

const Monitor = () => {
  const { queue, queueWebSocket, overflow, waterLevel, orientation, battery } =
    useWebsocket();
  const [rainyHours, setRainyHours] = useState<any[]>([]);
  const [todayRain, setTodayRain] = useState("");
  const [date, setDate] = useState("");
  const [rainfallAlert, setRainfallAlert] = useState(false);
  const [rainfallForm, setRainfallForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchAndFilterRainyHours = async () => {
    const apiKey = "PQSRXB9VVDCDL87R3T6ZHPE83";
    const city = "Caloocan";

    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;
      const response = await axios.get(url);

      const todayDate = new Date().toISOString().split("T")[0];

      const todayForecast = response.data.days.find(
        (day: any) => day.datetime === todayDate
      );
      setTodayRain(todayForecast.precipprob);
      setDate(todayDate);

      if (todayForecast && todayForecast.hours) {
        const filteredRainyHours = todayForecast.hours.filter(
          (hour: any) => hour.precipprob > 30
        );
        setRainyHours(filteredRainyHours);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAndFilterRainyHours();
  }, []);

  useEffect(() => {
    checkCurrentTime();

    if (overflow > 80) {
      setRainfallAlert(true);
      setAlertMessage("Bot Capacity at Critical Level!");
    } else if (orientation > 0) {
      setRainfallAlert(true);
      setAlertMessage("Bot is Tilted");
    } else if (battery < 30) {
      setRainfallAlert(true);
      setAlertMessage("Bot Power Supply Running Low!");
    } else if (waterLevel > 80) {
      setRainfallAlert(true);
      setAlertMessage("Bot is Sinking!");
    }
  }, [rainyHours, overflow, orientation, battery]);

  const checkCurrentTime = () => {
    const currentTime = new Date();
    const currentHour = 19;
    const currentMinute = currentTime.getMinutes();

    const matchFound = rainyHours.some((rainyHour: any) => {
      const rainyHourValue = convertToHour(rainyHour.datetime);

      if (currentHour === rainyHourValue) {
        return currentMinute >= 0 && currentMinute < 60;
      }
      return false;
    });

    if (matchFound) {
      setRainfallAlert(true);
      setAlertMessage("High Rainfall Probability Detected!");
    }
  };

  const convertToHour = (timeString: string) => {
    const hour = parseInt(timeString.split(":")[0], 10); // Extract the hour part
    if (isNaN(hour)) {
      console.error("Invalid time:", timeString);
      return NaN;
    }
    return hour; // Return the hour
  };

  useEffect(() => {
    queueWebSocket();
    console.log(queue);
  }, []);

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start space-y-6 p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-4">
          {/* label */}
          <div className="w-full flex flex-row items-center justify-between px-1">
            <div className="w-2/3 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">BottleBot Status</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                overview of bot status
              </p>
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 items-center justify-center gap-4">
            <div className="w-full flex flex-row space-x-4 justify-between items-center px-6 py-4 rounded-xl bg-[#FCFCFC]">
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiDonutChartFill size={16} color="white" />
                </div>
                <p className="text-xs font-semibold">Overflow</p>
              </div>
              <p className="text-xs font-normal">
                {overflow ? `${overflow}%` : "Waiting for Data"}
              </p>
            </div>
            <div className="w-full flex flex-row space-x-4 justify-between items-center px-6 py-4 rounded-xl bg-[#FCFCFC]">
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiFloodLine size={16} color="white" />
                </div>
                <p className="text-xs font-semibold">Water Level</p>
              </div>
              <p className="text-xs font-normal">
                {waterLevel ? `${waterLevel}%` : "Waiting for Data"}
              </p>
            </div>
            <div className="w-full flex flex-row space-x-4 justify-between items-center px-6 py-4 rounded-xl bg-[#FCFCFC]">
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiScanLine size={16} color="white" />
                </div>
                <p className="text-xs font-semibold">Orientation</p>
              </div>
              <p className="text-xs font-normal">
                {orientation ? `${orientation}%` : "Waiting for Data"}
              </p>
            </div>
            <div className="w-full flex flex-row space-x-4 justify-between items-center px-6 py-4 rounded-xl bg-[#FCFCFC]">
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiRainyLine size={16} color="white" />
                </div>
                <p className="text-xs font-semibold">Rainfall Probability</p>
              </div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <p className="text-xs font-normal">
                  {todayRain !== null ? `${todayRain}%` : "Waiting for Data"}
                </p>
                <div
                  className="px-3 py-1 rounded-lg bg-black cursor-pointer"
                  onClick={() => setRainfallForm(true)}
                >
                  <p className="text-xs font-normal text-white">View</p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row space-x-4 justify-between items-center px-6 py-4 rounded-xl bg-[#FCFCFC]">
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="flex p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiBatteryLine size={16} color="white" />
                </div>
                <p className="text-xs font-semibold">Battery Level</p>
              </div>
              <p className="text-xs font-normal">
                {battery ? `${battery}%` : "Waiting for Data"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-4">
          {/* label */}
          <div className="w-full flex flex-row items-center justify-between px-1">
            <div className="w-2/3 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Queue</p>
              <p className="text-xs font-normal text-[#6E6E6E]">user queue</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {queue.length > 0 ? (
              queue.map((queue: any) => (
                <div
                  className="w-full flex flex-col space-x-4 justify-between items-center px-6 py-4 space-y-8 rounded-xl bg-[#FCFCFC]"
                  key={queue._id}
                >
                  <div className="w-full flex flex-row items-center justify-start gap-2">
                    <div className="flex p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                      <RiDirectionLine size={16} color="white" />
                    </div>
                    <p className="text-xs font-semibold uppercase">
                      {`${queue.userId.personalInfo.firstName} ${queue.userId.personalInfo.middleName} ${queue.userId.personalInfo.lastName}`}
                    </p>
                  </div>
                  <div className="w-full flex flex-col items-start justify-center">
                    <p className="text-xs font-normal capitalize text-[#6E6E6E] w-full truncate">
                      Status: {queue.status}
                    </p>
                    <p className="text-xs font-normal capitalize text-[#6E6E6E] w-full truncate">
                      Request Time: {queue.requestTime}
                    </p>
                    <p className="text-xs font-normal capitalize text-[#6E6E6E] w-full truncate">
                      Location: {queue.location.locationName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="min-h-[40svh] p-6 w-full flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiXrpLine size={22} color="white" />
                </div>
                <p className="text-xs font-normal capitalize">Queue is Empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {rainfallAlert && (
        <RainfallAlert
          alert={alertMessage}
          onClose={() => setRainfallAlert(false)}
        />
      )}

      {rainfallForm && (
        <Rainfall
          date={date}
          data={rainyHours}
          onClose={() => setRainfallForm(false)}
        />
      )}
    </>
  );
};

export default Monitor;
