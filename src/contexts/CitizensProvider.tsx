import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const CitizensContext = createContext<any>(null);

export const CitizensProvider = ({ children }: any) => {
  const [pages, setPages] = useState(0);
  const [citizens, setCitizens] = useState([]);

  const getCitizens = async (userName: string, page: number, limit: number) => {
    if (page && limit) {
      try {
        let url = `http://localhost:8080/api/users?userName=${userName}&level=citizen&page=${page}&limit=${limit}&status=active`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          setCitizens(response.data.users);
          setPages(response.data.totalPages);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <CitizensContext.Provider value={{ getCitizens, citizens, pages }}>
      {children}
    </CitizensContext.Provider>
  );
};

export const useCitizens = () => useContext(CitizensContext);
