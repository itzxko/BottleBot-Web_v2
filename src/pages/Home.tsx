import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Bottle_Bot.png";
import {
  RiCustomerService2Line,
  RiGift2Line,
  RiRobot3Line,
} from "react-icons/ri";
import { Parallax, useParallax } from "react-scroll-parallax";

const Home = () => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const driveLink =
    "https://job-artifacts.eascdn.net/production/e35b3825-381a-4b37-87ab-fbedd85ffc72/ace92333-95b3-420b-8573-e03984bcc927/application-e1ccde7d-c989-4937-9e0a-1c3298585030.apk?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=www-production%40exponentjs.iam.gserviceaccount.com%2F20250329%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250329T022819Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=8c2c45d6d03949842a9edf33ecb364f5e4c2762d47539d1779dccf02c4d6ff81f8d2c0ce842efb99ba336046487940b06b9276751df43e479333e454506aae9e50cfa41c27a62cf738e96229cd3728ccf2e9df3e34789479d004af709048d339f0d235b081266b7afdaf0425228d27d4505bb296fa9e38926ad4b6ba4dd0aecbfd06dfaa0020ec8131cee775a12b25d6bd8d6c9eea30c631a981224ae38681f46b0c1f3ab4b2859e11bcb694de2809b7ea12627a706984c34bec23a69a1225e17c84be0fa40a69d996f167f22eebb0c6fabe082bb77028befbe6cfa0983fa78718e163b313a14f479cb5dbd404e1721013f2b8313fc8b64db915d6e369d95905";

  const Home = () => {
    return (
      <a
        href={driveLink}
        download
        className="px-4 py-2 rounded-xl flex items-center justify-center bg-gradient-to-t from-[#466600] to-[#699900] cursor-pointer"
      >
        <p className="text-xs font-normal text-white">Download App</p>
      </a>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center font-DM">
      <Parallax speed={-16} className="w-full">
        <div className="h-[100svh] w-full bg-[url(assets/Bot.jpg)] bg-center bg-cover flex flex-col items-center justify-end p-4">
          <div className="fixed w-full top-0 left-0">
            <div className="w-full flex items-center justify-center">
              <div className="w-full lg:w-3/6 flex flex-row items-center justify-between p-4">
                <div className="flex flex-row items-center justify-center px-4 py-2 rounded-xl bg-[#FCFCFC] shadow-xl shadow-black/10">
                  <img src={Logo} className="w-[26px]" />
                  <p className="text-xs font-normal truncate">
                    Welcome to BottleBot
                  </p>
                </div>
                <div className="hidden lg:flex flex-row gap-4 items-center justify-center">
                  <p
                    className="text-xs font-normal cursor-pointer"
                    onClick={scrollToSection}
                  >
                    Features
                  </p>

                  <div
                    className="px-4 py-2 rounded-xl bg-gradient-to-t from-[#466600] to-[#699900] cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    <p className="text-xs font-normal text-white">Login</p>
                  </div>
                </div>
                <div
                  className="flex lg:hidden px-4 py-2 rounded-xl bg-[#FCFCFC] shadow-xl shadow-black/10"
                  onClick={() => setOpenNav(true)}
                >
                  <i className="ri-menu-line"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/6 p-12 flex flex-col items-center justify-center gap-4">
            <a
              href={driveLink}
              download
              className="px-4 py-2 rounded-xl flex items-center justify-center bg-gradient-to-t from-[#466600] to-[#699900] cursor-pointer"
            >
              <p className="text-xs font-normal text-white ">Download App</p>
            </a>
            <p className="w-full lg:w-3/4 text-xs font-normal text-center">
              BottleBot Mobile (Android)
            </p>
          </div>
        </div>
      </Parallax>
      <Parallax speed={10}>
        <div className="w-full flex flex-col items-center justify-evenly p-4 bg-transparent">
          <div className="w-full flex flex-col items-center justify-center bg-[#EDEDED] rounded-xl">
            <div className="w-full lg:w-3/6 flex flex-col items-center justify-center bg-[#EDEDED] px-6 py-24 gap-6 rounded-xl">
              <div className="flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-t from-[#466600] to-[#699900]">
                <p className="text-xs font-normal text-white">
                  About BottleBot
                </p>
              </div>
              <p className="w-2/3 text-xs font-normal text-center">
                BottleBot is an autonomous recycling system that uses AI-powered
                detection, GPS navigation, and real-time monitoring to collect
                plastic bottles efficiently. It promotes community engagement
                through a point-based reward system, with scalability for
                broader adoption and future improvements in AI and government
                collaboration.
              </p>
            </div>
          </div>
        </div>
      </Parallax>
      <div
        className="w-full flex flex-col items-center justify-center p-4 gap-6"
        id="features"
        ref={sectionRef}
      >
        <div className="pt-12">
          <p className="text-xs font-normal">Features:</p>
        </div>
        <div className="w-full lg:w-3/6 flex flex-col lg:flex-row items-center justify-evenly gap-6">
          <div className="w-full lg:w-1/3 bg-[#EDEDED] py-20 rounded-xl flex flex-col gap-6 items-center justify-center">
            <div className="flex p-4 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
              <RiRobot3Line size={24} color="white" />
            </div>
            <p className="text-xs font-normal">AI Bottle Detection</p>
          </div>
          <div className="w-full lg:w-1/3 bg-[#EDEDED] py-20 rounded-xl flex flex-col gap-6 items-center justify-center">
            <div className="flex p-4 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
              <RiGift2Line size={24} color="white" />
            </div>
            <p className="text-xs font-normal">Rewards System</p>
          </div>
          <div className="w-full lg:w-1/3 bg-[#EDEDED] py-20 rounded-xl flex flex-col gap-6 items-center justify-center">
            <div className="flex p-4 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
              <RiCustomerService2Line size={24} color="white" />
            </div>
            <p className="text-xs font-normal">Real-Time Monitoring</p>
          </div>
        </div>
      </div>
      {openNav ? (
        <div
          className="h-full fixed lg:hidden top-0 left-0 bg-[#FCFCFC] w-[80svw] ease-in-out duration-300 flex flex-col items-center justify-center gap-6 shadow-xl shadow-black/10"
          onClick={() => setOpenNav(false)}
        >
          <p
            className="text-xs font-normal cursor-pointer"
            onClick={scrollToSection}
          >
            Features
          </p>

          <div className="px-4 py-2 rounded-xl bg-gradient-to-t from-[#466600] to-[#699900] cursor-pointer">
            <p
              className="text-xs font-normal text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full fixed lg:hidden top-0 left-[-100%] bg-[#FCFCFC] w-full ease-in-out duration-300 flex flex-col items-center justify-center gap-6 shadow-xl shadow-black/10">
          <p
            className="text-xs font-normal cursor-pointer"
            onClick={scrollToSection}
          >
            Features
          </p>
          ]
          <div className="px-4 py-2 rounded-xl bg-gradient-to-t from-[#466600] to-[#699900] cursor-pointer">
            <p className="text-xs font-normal text-white">Login</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
