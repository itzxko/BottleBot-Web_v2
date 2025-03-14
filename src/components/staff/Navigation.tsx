import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Bottle_Bot.png";
import axios from "axios";
import { useAuthorization } from "../../contexts/AuthorizationProvider";
import { useUrl } from "../../contexts/UrlProvider";

const Navigation = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const location = useLocation();
  const { onLogout } = useAuthorization();
  const [openNav, setOpenNav] = useState(false);
  const { urlString } = useUrl();

  const getUser = async () => {
    try {
      const user = localStorage.getItem("user");

      if (user) {
        const currentUser = JSON.parse(user);

        if (currentUser) {
          let url = `${urlString}/api/users/${currentUser._id}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setUserName(
              `${response.data.user.personalInfo.firstName} ${response.data.user.personalInfo.middleName} ${response.data.user.personalInfo.lastName}`
            );
          }
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();

    if (location.pathname.includes("/staff/dashboard")) {
      setActiveRoute("dashboard");
      document.title = "Dashboard";
    } else if (location.pathname.includes("/staff/monitor")) {
      setActiveRoute("monitor");
      document.title = "Monitoring";
    } else if (location.pathname.includes("/staff/history")) {
      setActiveRoute("history");
      document.title = "History";
    } else if (location.pathname.includes("/staff/users")) {
      setActiveRoute("users");
      document.title = "Users";
    } else if (location.pathname.includes("/staff/redeem")) {
      setActiveRoute("redeem");
      document.title = "Redeem";
    } else if (location.pathname.includes("/staff/profile")) {
      setActiveRoute("profile");
      document.title = "Profile";
    } else {
      document.title = "BottleBot";
    }
  }, [location.pathname]);

  return (
    <div className="fixed w-full flex items-center justify-center px-4 font-DM z-20">
      <div className="w-full lg:w-3/6 flex items-center justify-between py-4">
        {/* logo */}
        <div
          className="flex flex-row space-x-2 items-center justify-center px-4 py-2 rounded-xl bg-[#FCFCFC] cursor-pointer shadow-xl shadow-black/10"
          onClick={() => navigate("/staff/dashboard")}
        >
          <img src={Logo} className="w-[26px]" />
          <p className="text-xs font-normal">
            Welcome, {userName ? userName : "Not Found"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="hidden lg:flex flex-row items-center justify-center space-x-6">
            {activeRoute === "dashboard" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/dashboard")}
              >
                <i className="ri-home-3-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/dashboard")}
              >
                <i className="ri-home-3-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "monitor" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/monitor")}
              >
                <i className="ri-macbook-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer "
                onClick={() => navigate("/staff/monitor")}
              >
                <i className="ri-macbook-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "redeem" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/redeem")}
              >
                <i className="ri-shopping-bag-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/redeem")}
              >
                <i className="ri-shopping-bag-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "history" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/history")}
              >
                <i className="ri-calendar-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/history")}
              >
                <i className="ri-calendar-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "users" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/users")}
              >
                <i className="ri-user-smile-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/users")}
              >
                <i className="ri-user-smile-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "profile" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/profile")}
              >
                <i className="ri-user-4-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/staff/profile")}
              >
                <i className="ri-user-4-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
          </div>
          <div className="flex px-3 py-2 cursor-pointer rounded-xl bg-[#FCFCFC] shadow-xl shadow-black/10 space-x-4">
            <i
              className="ri-contract-right-line text-md"
              onClick={onLogout}
            ></i>
            <div
              className="flex lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <i className="ri-close-line text-md"></i>
              ) : (
                <i className="ri-menu-line text-md"></i>
              )}
            </div>
          </div>
        </div>
        {openNav ? (
          <div className="fixed lg:hidden top-0 left-0 w-4/5 bg-[#FCFCFC] h-[100svh] shadow-xl shadow-black/10 ease-in-out duration-150 flex flex-col items-center justify-center space-y-6">
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/staff/dashboard")}
            >
              Dashboard
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/staff/monitor")}
            >
              Monitor
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/staff/redeem")}
            >
              Redeem
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/staff/history")}
            >
              History
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/staff/users")}
            >
              Users
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/staff/profile")}
            >
              Profile
            </p>
          </div>
        ) : (
          <div className="fixed lg:hidden top-0 left-[-100%] w-4/5 bg-[#FCFCFC] h-[100svh] shadow-xl shadow-black/10 ease-in-out duration-75"></div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
