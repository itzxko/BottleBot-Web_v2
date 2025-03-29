import React, { createContext, useContext, useState } from "react";

const WebsocketContext = createContext<any>(null);

export const WebsocketProvider = ({ children }: any) => {
  const [queue, setQueue] = useState([]);
  const [botLocation, setBotLocation] = useState(null);
  const [overflow, setOverflow] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const [waterLevel, setWaterLevel] = useState(null);
  const [arrived, setArrived] = useState(false);
  const [arrivedAt, setArrivedAt] = useState("");
  const [battery, setBattery] = useState(null);

  const queueWebSocket = () => {
    const socket = new WebSocket(`wss://bottlebot.onrender.com/api/queue`);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.success && response.realTimeType === "queue") {
        setQueue(response.data);
      } else if (response.success && response.realTimeType === "botstate") {
        setBotLocation(response.data.adminBotLocation);
        setOverflow(response.data.overflowLevel);
        setOrientation(response.data.orientation);
        setWaterLevel(response.data.waterLevel);
        setArrived(response.data.arrived);
        setArrivedAt(response.data.arrivedAt);
        setBattery(response.data.batteryLevel);
      }
    };
  };
  return (
    <WebsocketContext.Provider
      value={{
        queue,
        queueWebSocket,
        botLocation,
        overflow,
        waterLevel,
        orientation,
        battery,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);
