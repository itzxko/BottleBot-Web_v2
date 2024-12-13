import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const ConfigContext = createContext<any>(null);

export const ConfigProvider = ({ children }: any) => {
  const [config, setConfig] = useState<any | null>(null);

  const checkConfig = async () => {
    try {
      let url = `http://localhost:8080/api/configurations`;

      let response = await axios.get(url);

      if (response.data.success === true) {
        setConfig(response.data.config);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ConfigContext.Provider value={{ checkConfig, config }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
