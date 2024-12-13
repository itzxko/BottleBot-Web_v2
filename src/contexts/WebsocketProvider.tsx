import React, { createContext, useContext, useState } from "react";

const WebsocketContext = createContext<any>(null);

export const WebsocketProvider = ({ children }: any) => {
  const [queue, setQueue] = useState([]);

  const queueWebSocket = () => {
    const socket = new WebSocket(`ws://localhost:8080/api/queue`);

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
      }
    };
  };
  return (
    <WebsocketContext.Provider value={{ queue, queueWebSocket }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);
