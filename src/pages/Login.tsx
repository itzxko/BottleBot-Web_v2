import { useEffect, useState } from "react";
import Logo from "../assets/Bottle_Bot.png";
import Notification from "../components/Notification";
import axios from "axios";
import { useAuthorization } from "../contexts/AuthorizationProvider";
import { useNavigate } from "react-router-dom";
import { RiShieldLine, RiUser4Line } from "react-icons/ri";
import { useUrl } from "../contexts/UrlProvider";

const Login = () => {
  const { onLogout } = useAuthorization();
  const navigate = useNavigate();
  const { urlString } = useUrl();

  const [pVisible, setPVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   onLogout();
  // }, []);

  const onLogin = async () => {
    try {
      let url = `${urlString}/api/auth/login`;

      let response = await axios.post(url, {
        email: email,
        password: password,
      });

      if (response.data.success === true) {
        if (response.data.user.credentials.level !== "citizen") {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
          const user = JSON.stringify(response.data.user);
          localStorage.setItem("user", user);
          if (response.data.user.credentials.level === "admin") {
            navigate("/admin/dashboard");
          } else if (response.data.user.credentials.level === "staff") {
            navigate("/staff/dashboard");
          }
        } else {
          setNotif(true);
          setError(true);
          setMessage("For Admins and Staffs Only!");
        }
      } else {
        setNotif(true);
        setMessage(response.data.message);
        setError(true);
      }
    } catch (error: any) {
      setNotif(true);
      setMessage(error.response.data.message);
      setError(true);
    }
  };

  return (
    <>
      <div className="w-full h-[100svh] flex flex-col items-center justify-center bg-[url('./assets/Home.jpg')] bg-cover bg-center font-DM">
        <div className="w-full h-full flex flex-row items-center justify-center bg-gradient-to-tr from-black/75 to-black/50 p-6">
          <div className="w-5/6 lg:w-1/6 flex flex-col items-center justify-center p-4 rounded-2xl bg-white gap-8">
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              {/* logo */}
              <div className="w-full flex items-center justify-center">
                <img src={Logo} alt="" className="h-[80px] w-[80px]" />
              </div>
              {/* header */}
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-sm font-semibold">Welcome Back</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  login to your admin or staff account
                </p>
              </div>
            </div>
            {/* inputs */}
            <div className="w-full flex flex-col items-center justify-center space-y-3">
              {/* username */}
              <div className="w-full flex flex-col items-start justify-center space-y-1">
                <p className="text-xs font-semibold">Email</p>
                <div className="w-full flex flex-row items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#EDEDED]">
                  <RiUser4Line size={18} />
                  <input
                    type="text"
                    className="text-xs font-normal outline-none w-full bg-[#EDEDED] "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter username"
                  />
                </div>
              </div>
              {/* password */}
              <div className="w-full flex flex-col items-start justify-center space-y-1">
                <p className="text-xs font-semibold">Password</p>
                <div className="w-full flex flex-row items-center justify-between space-x-3 px-4 py-3 rounded-xl bg-[#EDEDED]">
                  <RiShieldLine size={18} />
                  <input
                    type={pVisible ? "text" : "password"}
                    className="text-xs font-normal outline-none w-full bg-[#EDEDED] no-eye"
                    value={password}
                    placeholder="enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {password &&
                    (pVisible ? (
                      <i
                        className="ri-eye-line text-xs cursor-pointer"
                        onClick={() => setPVisible(!pVisible)}
                      ></i>
                    ) : (
                      <i
                        className="ri-eye-close-line text-xs cursor-pointer"
                        onClick={() => setPVisible(!pVisible)}
                      ></i>
                    ))}
                </div>
              </div>
            </div>
            {/* button */}
            <div
              className="w-full flex flex-row items-center justify-center py-3 bg-gradient-to-tr from-[#466600] to-[#699900] rounded-xl cursor-pointer"
              onClick={onLogin}
            >
              <p className="text-xs font-semibold text-white">Login</p>
            </div>
          </div>
        </div>
      </div>
      {notif && (
        <Notification message={message} onClose={() => setNotif(false)} />
      )}
    </>
  );
};

export default Login;
