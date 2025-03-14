import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useUrl } from "./UrlProvider";

const UsersContext = createContext<any>(null);

export const UsersProvider = ({ children }: any) => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);
  const { urlString } = useUrl();

  const getUsers = async (
    userName: string,
    page: number,
    limit: number,
    status: string
  ) => {
    if (page && limit && status) {
      try {
        let url = `${urlString}/api/users?userName=${userName}&page=${page}&limit=${limit}&status=${status}`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          setUsers(response.data.users);
          setPages(response.data.totalPages);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <UsersContext.Provider value={{ users, getUsers, pages }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
