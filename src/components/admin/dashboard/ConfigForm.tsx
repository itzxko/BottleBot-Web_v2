import React, { useEffect, useState } from "react";
import { RiCloudWindyLine, RiRefreshLine, RiSearch2Line } from "react-icons/ri";
import { useConfig } from "../../../contexts/ConfigProvider";
import axios from "axios";
import Notification from "../../Notification";

const ConfigForm = ({ onClose }: { onClose: () => void }) => {
  const { config, checkConfig } = useConfig();
  const [locationName, setLocationName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [baseWeight, setBaseWeight] = useState("");
  const [baseUnit, setBaseUnit] = useState("");
  const [equivalentInPoints, setEquivalentInPoints] = useState("");
  const [locationChanged, setLocationChanged] = useState(false);
  const [configId, setConfigId] = useState("");

  //notifs
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkConfig();
  }, []);

  useEffect(() => {
    if (config) {
      setLocationName(config.defaultLocation.locationName);
      setLat(config.defaultLocation.lat);
      setLon(config.defaultLocation.lon);
      setBaseWeight(config.bottleExchange.baseWeight);
      setBaseUnit(config.bottleExchange.baseUnit);
      setEquivalentInPoints(config.bottleExchange.equivalentInPoints);
      setConfigId(config._id);
    }
  }, [config]);

  const toggleUnit = () => {
    if (baseUnit === "kg") {
      setBaseUnit("g");
    } else if (baseUnit === "g") {
      setBaseUnit("lbs");
    } else if (baseUnit === "lbs") {
      setBaseUnit("kg");
    }
  };

  const geocodeAddress = async (address: string) => {
    const apiKey = "72d5a1df72ec497ea48fbb7f2842a176";

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLat(lat.toString());
        setLon(lng.toString());
      } else {
        setLat("Coordinates not Found");
        setLon("Coordinates not Found");
        console.log("Coordinates not found for this address");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setLat("");
      setLon("");
    }
  };

  const handleAddressChange = (text: string) => {
    setLocationName(text);
    if (text) {
      geocodeAddress(text);
      setLocationChanged(false);
    }
  };

  const addConfig = async () => {
    if (locationChanged === false) {
      try {
        let url = `http://localhost:8080/api/configurations`;

        let response = await axios.post(url, {
          defaultLocation: {
            locationName: locationName,
            lat: lat,
            lon: lon,
          },
          bottleExchange: {
            baseWeight: baseWeight,
            baseUnit: baseUnit,
            equivalentInPoints: equivalentInPoints,
          },
        });

        if (response.data.success === true) {
          setNotif(true);
          setMessage(response.data.message);
          setError(false);
        }
      } catch (error: any) {
        setNotif(true);
        setMessage(error.response.data.message);
        setError(true);
      }
    } else {
      setError(true);
      setMessage("Get the Coordinates First");
      setNotif(true);
    }
  };

  const updateConfig = async () => {
    if (locationChanged === false) {
      if (configId) {
        try {
          let url = `http://localhost:8080/api/configurations/${configId}`;

          let response = await axios.put(url, {
            defaultLocation: {
              locationName: locationName,
              lat: lat,
              lon: lon,
            },
            bottleExchange: {
              baseWeight: baseWeight,
              baseUnit: baseUnit,
              equivalentInPoints: equivalentInPoints,
            },
          });

          if (response.data.success === true) {
            setNotif(true);
            setMessage(response.data.message);
            setError(false);
          }
        } catch (error: any) {
          setNotif(true);
          setMessage(error.response.data.message);
          setError(true);
        }
      }
    } else {
      setError(true);
      setMessage("Get the Coordinates First");
      setNotif(true);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[100svh] bg-black/50 flex items-center justify-center font-DM p-6 z-20">
        <div className="w-full lg:w-1/4 flex flex-col items-center justify-center rounded-xl bg-[#FAFAFA] overflow-hidden">
          <div className="w-full flex flex-row items-center justify-between shadow-xl shadow-black/10 px-6 py-4">
            <p className="text-sm font-semibold">
              {!config ? "Add Configuration" : "Edit Configuration"}
            </p>
            <i
              className="ri-close-line text-md cursor-pointer"
              onClick={onClose}
            ></i>
          </div>
          <div className="py-10 px-6 w-full flex flex-col items-center justify-center space-y-4">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Location Name</p>
              <div className="w-full flex flex-row items-center justify-between px-6 py-2 rounded-lg bg-[#EDEDED]">
                <input
                  type="text"
                  className="text-xs font-normal outline-none bg-[#EDEDED] w-3/4"
                  value={locationName}
                  onChange={(e) => {
                    setLocationName(e.target.value);
                    setLocationChanged(true);
                  }}
                />
                <div
                  className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                  onClick={() => handleAddressChange(locationName)}
                >
                  <RiSearch2Line size={12} color="white" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Latitude</p>
              <input
                type="text"
                value={lat}
                onChange={(e) => {
                  setLat(e.target.value.replace(/[^0-9.-]/g, ""));
                }}
                readOnly={true}
                placeholder="latitude coordinates"
                className="outline-none text-xs font-normal px-6 py-3 bg-[#EDEDED] rounded-lg w-full"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Longitude</p>
              <input
                type="text"
                value={lon}
                onChange={(e) => {
                  setLon(e.target.value.replace(/[^0-9.-]/g, ""));
                }}
                readOnly={true}
                placeholder="longitude coordinates"
                className="outline-none text-xs font-normal px-6 py-3 bg-[#EDEDED] rounded-lg w-full"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Base Weight</p>
              <input
                type="text"
                value={baseWeight}
                onChange={(e) =>
                  setBaseWeight(e.target.value.replace(/[^0-9.]/g, ""))
                }
                placeholder="base weight"
                className="outline-none text-xs font-normal px-6 py-3 bg-[#EDEDED] rounded-lg w-full"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Base Unit</p>
              <div className="w-full flex flex-row items-center justify-between px-6 py-3 rounded-lg bg-[#EDEDED]">
                <p className="text-xs font-normal">{baseUnit}</p>
                <RiRefreshLine
                  size={16}
                  color="black"
                  className=" cursor-pointer"
                  onClick={toggleUnit}
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p className="text-xs font-normal">Equivalent Points</p>
              <input
                type="text"
                value={equivalentInPoints}
                onChange={(e) =>
                  setEquivalentInPoints(e.target.value.replace(/[^0-9.]/g, ""))
                }
                placeholder="equivalent points"
                className="outline-none text-xs font-normal px-6 py-3 bg-[#EDEDED] rounded-lg w-full"
              />
            </div>
            <div
              className="w-full flex items-center justify-center rounded-lg bg-gradient-to-tr from-[#466600] to-[#699900] px-6 py-3 cursor-pointer"
              onClick={() => {
                if (config) {
                  updateConfig();
                } else if (!config) {
                  addConfig();
                }
              }}
            >
              <p className="text-xs font-normal text-white">
                {!config ? "Add Config" : "Update Config"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            if (!error) {
              onClose();
            }
            setNotif(false);
          }}
        />
      )}
    </>
  );
};

export default ConfigForm;
