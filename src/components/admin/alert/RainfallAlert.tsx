import axios from "axios";
import { useState } from "react";
import Notification from "../../Notification";
import { useUrl } from "../../../contexts/UrlProvider";

const RainfallAlert = ({ onClose }: { onClose: () => void }) => {
  //notifs
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { urlString } = useUrl();

  const returntoDefault = async () => {
    try {
      let url = `${urlString}/api/queue`;

      let response = await axios.post(url, {
        returnToDefault: "true",
      });

      if (response.data.success === true) {
        setMessage(response.data.message);
        setNotif(true);
        setError(false);
      }
    } catch (error: any) {
      setNotif(true);
      setError(false);
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100svh] bg-black/50 flex items-center justify-center font-DM p-6 z-10">
        <div className="w-3/4 lg:w-[260px] flex flex-col items-center justify-center rounded-xl bg-[#FAFAFA] overflow-hidden">
          <div className="w-full flex flex-row items-center justify-between shadow-xl shadow-black/10 px-6 py-4">
            <p className="text-sm font-semibold">Notification</p>
            <i
              className="ri-close-line text-md cursor-pointer"
              onClick={onClose}
            ></i>
          </div>
          <div className="py-10 px-6 w-full flex flex-col items-center justify-center space-y-4">
            <div className="px-3 py-2 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
              <i className="ri-notification-4-line text-xl text-white"></i>
            </div>
            <p className="text-xs font-normal text-center">
              High Rainfall Probability Detected
            </p>
            <div
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
              onClick={() => returntoDefault()}
            >
              <p className="text-xs font-normal text-white">
                Return to Default Location
              </p>
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

export default RainfallAlert;
