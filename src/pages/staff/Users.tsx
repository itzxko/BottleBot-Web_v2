import { useEffect, useState } from "react";
import Navigation from "../../components/staff/Navigation";
import { useUsers } from "../../contexts/UsersProvider";
import {
  RiAddLine,
  RiArchiveLine,
  RiDeleteBin4Line,
  RiEdit2Line,
  RiFolder6Line,
  RiInboxUnarchiveLine,
  RiXrpLine,
} from "react-icons/ri";
import Man from "../../assets/Man.jpg";
import axios from "axios";
import Notification from "../../components/Notification";
import AddForm from "../../components/admin/users/AddForm";
import EditForm from "../../components/admin/users/EditForm";
import ViewForm from "../../components/staff/users/ViewForm";
import { useUrl } from "../../contexts/UrlProvider";

const Users = () => {
  const { users, getUsers, pages } = useUsers();
  const [userName, setUserName] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [status, setStatus] = useState("active");
  const [addForm, setAddForm] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [userId, setUserId] = useState("");

  //notif
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { urlString } = useUrl();

  useEffect(() => {
    getUsers(userName, page, limit, status);
  }, [userName, page, status]);

  const toggleStatus = () => {
    setPage(1);
    if (status === "active") {
      setStatus("archived");
    } else if (status === "archived") {
      setStatus("active");
    }
  };

  const archiveUser = async (userId: string) => {
    if (userId) {
      try {
        let url = `${urlString}/api/users/${userId}`;

        let response = await axios.delete(url);

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getUsers(userName, page, limit, status);
        }
      } catch (error: any) {
        setError(true);
        setNotif(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const unarchiveUser = async (user: any) => {
    if (user) {
      try {
        let url = `${urlString}/api/users/${user._id}`;

        let response = await axios.put(url, {
          archiveDate: null,
          personalInfo: user.personalInfo,
          contactInfo: user.contactInfo,
          economicInfo: user.economicInfo,
          credentials: user.credentials,
        });

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          getUsers(userName, page, limit, status);
        }
      } catch (error: any) {
        setNotif(true);
        setError(true);
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-4">
          {/* search */}
          <div className="w-full flex flex-row items-center justify-between rounded-full py-3 pl-6 pr-4 bg-[#FCFCFC]">
            <div className="w-2/3 flex flex-row items-center justify-center space-x-4">
              <i className="ri-search-2-line text-sm text-[#6E6E6E]"></i>
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setPage(1);
                }}
                className="w-full outline-none text-xs font-normal"
                placeholder="search users"
              />
            </div>
            <div
              className="flex flex-row items-center justify-center space-x-2 px-3 py-1 bg-[#050301] rounded-full cursor-pointer"
              onClick={toggleStatus}
            >
              <p className="text-xs font-normal text-white">{status}</p>
              <i className="ri-refresh-line text-sm text-white"></i>
            </div>
          </div>
          {/* label */}
          <div className="w-full flex flex-row items-center justify-between px-1">
            <div className="w-2/3 flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">Users Overview</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                add, edit or archive users
              </p>
            </div>
            <div
              className="p-2 rounded-full bg-[#050301] cursor-pointer"
              onClick={() => setAddForm(true)}
            >
              <RiAddLine size={16} color="white" />
            </div>
          </div>
          {/* users */}
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            {users.length > 0 ? (
              users.map((user: any) => (
                <div
                  className="w-full flex flex-col items-center justify-center p-6 rounded-xl bg-[#FCFCFC] space-y-6"
                  key={user._id}
                >
                  <div className="w-full flex flex-row items-start justify-between space-x-4">
                    <img
                      src={Man}
                      alt=""
                      className="w-[80px] h-[80px] rounded-full"
                    />
                    <div className="flex flex-row justify-center items-center space-x-2">
                      {user.archiveDate === null ? (
                        <div
                          className="p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                          onClick={() => {
                            setViewForm(true);
                            setUserId(user._id);
                          }}
                        >
                          <RiFolder6Line size={16} color="black" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-start justify-center">
                    <p className="text-xs font-semibold w-full truncate">{`${user.personalInfo.firstName} ${user.personalInfo.middleName} ${user.personalInfo.lastName}`}</p>

                    <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                      #{user._id}
                    </p>
                    <p className="text-xs font-normal text-[#6E6E6E] uppercase w-full truncate">
                      {user.credentials.level}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="min-h-[40svh] p-6 w-full flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiXrpLine size={22} color="white" />
                </div>
                <p className="text-xs font-normal capitalize">No Users Found</p>
              </div>
            )}
          </div>
          {/* pages */}
          <div className="flex flex-row items-center justify-center space-x-4 py-6">
            {Array.from({ length: pages }, (_, index) => index + 1)
              .filter(
                (pageNumber) =>
                  pageNumber === page ||
                  pageNumber === page - 1 ||
                  pageNumber === page + 1
              )
              .map((pageNumber) => (
                <p
                  key={pageNumber}
                  className={`cursor-pointer ${
                    page === pageNumber
                      ? "font-semibold text-sm"
                      : "font-normal text-xs text-[#6E6E6E]"
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </p>
              ))}
          </div>
        </div>
      </div>
      {notif && (
        <Notification message={message} onClose={() => setNotif(false)} />
      )}
      {addForm && (
        <AddForm
          onClose={() => {
            getUsers(userName, page, limit, status);
            setAddForm(false);
          }}
        />
      )}
      {viewForm && (
        <ViewForm
          userId={userId}
          onClose={() => {
            setViewForm(false);
            getUsers(userName, page, limit, status);
          }}
        />
      )}
    </>
  );
};

export default Users;
