import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useUrl } from "./UrlProvider";

const ConfigContext = createContext<any>(null);

export const ConfigProvider = ({ children }: any) => {
  const [config, setConfig] = useState<any | null>(null);
  const { urlString } = useUrl();

  const checkConfig = async () => {
    try {
      let url = `${urlString}/api/configurations`;

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
