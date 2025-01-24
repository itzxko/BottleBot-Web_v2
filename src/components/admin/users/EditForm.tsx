import axios from "axios";
import { useEffect, useState } from "react";
import Notification from "../../Notification";

const EditForm = ({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [nationality, setNationality] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");

  //modal
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [vPassword, setVPassword] = useState(false);

  const getInfo = async () => {
    if (userId) {
      try {
        let url = `http://localhost:8080/api/users/${userId}`;

        let response = await axios.get(url);

        if (response.data.success) {
          setFirstName(response.data.user.personalInfo.firstName);
          setMiddleName(response.data.user.personalInfo.middleName);
          setLastName(response.data.user.personalInfo.lastName);
          setDateOfBirth(
            new Date(response.data.user.personalInfo.dateOfBirth)
              .toISOString()
              .split("T")[0]
          );
          setGender(response.data.user.personalInfo.gender);
          setCivilStatus(response.data.user.personalInfo.civilStatus);
          setNationality(response.data.user.personalInfo.nationality);
          setHouseNumber(response.data.user.contactInfo.address.houseNumber);
          setStreet(response.data.user.contactInfo.address.street);
          setBarangay(response.data.user.contactInfo.address.barangay);
          setCity(response.data.user.contactInfo.address.city);
          setPhoneNumber(response.data.user.contactInfo.phoneNumbers[0]);
          setEmploymentStatus(response.data.user.economicInfo.employmentStatus);
          setOccupation(response.data.user.economicInfo.occupation);
          setEmail(response.data.user.credentials.email);
          setPassword(response.data.user.credentials.password);
          setLevel(response.data.user.credentials.level);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const updateUser = async () => {
    if (userId) {
      try {
        let url = `http://localhost:8080/api/users/${userId}`;

        let response = await axios.put(url, {
          personalInfo: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            civilStatus: civilStatus,
            nationality: nationality,
          },
          contactInfo: {
            address: {
              houseNumber: nationality,
              street: street,
              barangay: barangay,
              city: city,
            },
            phoneNumbers: phoneNumber,
          },
          economicInfo: {
            employmentStatus: employmentStatus,
            occupation: occupation,
          },
          credentials: {
            email: email,
            password: password,
            level: level,
          },
        });

        if (response.data.success === true) {
          setNotif(true);
          setError(false);
          setMessage(response.data.message);
        }
      } catch (error: any) {
        setError(true);
        setNotif(true);
        setMessage(error.response.data.message);
      }
    }
  };

  const handleGenderToggle = () => {
    if (gender === "Male") {
      setGender("Female");
    } else if (gender === "Female") {
      setGender("Other");
    } else if (gender === "Other") {
      setGender("Male");
    }
  };

  const handleStatusToggle = () => {
    if (civilStatus === "Single") {
      setCivilStatus("Married");
    } else if (civilStatus === "Married") {
      setCivilStatus("Widowed");
    } else if (civilStatus === "Widowed") {
      setCivilStatus("Single");
    }
  };

  const handleLevelToggle = () => {
    if (level === "citizen") {
      setLevel("staff");
    } else if (level === "staff") {
      setLevel("citizen");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start py-8 px-4 overflow-y-auto font-DM z-20">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          {/* card */}
          <div className="w-full lg:w-2/6 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row justify-between items-center space-x-4 pb-6">
              <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                <div className="px-2 py-1 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <i className="ri-pencil-line text-white font-normal text-sm"></i>
                </div>
                <div className="w-3/5 flex flex-row space-x-1 ">
                  <p className="w-full text-xs font-semibold truncate">
                    Edit User Information
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="px-2.5 py-1 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={() => updateUser()}
                >
                  <i className="ri-check-line text-sm"></i>
                </div>
                <div
                  className="px-2.5 py-1 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={() => onClose()}
                >
                  <i className="ri-close-line text-sm"></i>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-4">
              <div className="w-full flex flex-col items-center justify-center space-y-4">
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">First Name</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Middle Name</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Last Name</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Date of Birth</p>

                  <input
                    type="date"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Gender</p>

                  <div className="w-full flex flex-row items-center justify-between px-6 py-2.5 rounded-lg bg-[#EDEDED]">
                    <p className="text-xs font-normal">{gender}</p>
                    <i
                      className="ri-refresh-line text-sm cursor-pointer"
                      onClick={handleGenderToggle}
                    ></i>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Civil Status</p>

                  <div className="w-full flex flex-row items-center justify-between px-6 py-2.5 rounded-lg bg-[#EDEDED]">
                    <p className="text-xs font-normal">{civilStatus}</p>
                    <i
                      className="ri-refresh-line text-sm cursor-pointer"
                      onClick={handleStatusToggle}
                    ></i>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Nationality</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">House Number</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Street</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Barangay</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">City</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Phone Number</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,11}$/.test(value)) {
                        setPhoneNumber(value);
                      }
                    }}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Employment Status</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Occupation</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Email</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Password</p>

                  <div className="w-full flex flex-row items-center justify-between bg-[#EDEDED] px-6 py-2.5 rounded-lg">
                    <input
                      type={vPassword ? "text" : "password"}
                      className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {vPassword ? (
                      <i
                        className="ri-eye-2-line text-sm cursor-pointer"
                        onClick={() => setVPassword(!vPassword)}
                      ></i>
                    ) : (
                      <i
                        className="ri-eye-close-line text-sm cursor-pointer"
                        onClick={() => setVPassword(!vPassword)}
                      ></i>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Level</p>

                  <div className="w-full flex flex-row items-center justify-between px-6 py-2.5 rounded-lg bg-[#EDEDED]">
                    <p className="text-xs font-normal">{level}</p>
                    <i
                      className="ri-refresh-line text-sm cursor-pointer"
                      onClick={handleLevelToggle}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            setNotif(false);
            if (!error) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default EditForm;
