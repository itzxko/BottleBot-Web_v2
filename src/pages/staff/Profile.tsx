import axios from "axios";
import Navigation from "../../components/staff/Navigation";
import { useEffect, useState } from "react";
import Man from "../../assets/Man.jpg";
import EditUser from "../../components/admin/profile/EditUser";

interface user {
  _id: string;
  personalInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    civilStatus: string;
    nationality: string;
  };
  contactInfo: {
    address: {
      houseNumber: string;
      street: string;
      barangay: string;
      city: string;
    };
    phoneNumbers: [string];
  };
  economicInfo: {
    employmentStatus: string;
    occupation: string;
  };
  credentials: {
    email: string;
    password: string;
    level: string;
  };
}

const defaultUser: user = {
  _id: "",
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    civilStatus: "",
    nationality: "",
  },
  contactInfo: {
    address: {
      houseNumber: "",
      street: "",
      barangay: "",
      city: "",
    },
    phoneNumbers: [""],
  },
  economicInfo: {
    employmentStatus: "",
    occupation: "",
  },
  credentials: {
    email: "",
    password: "",
    level: "",
  },
};
const Profile = () => {
  const [user, setUser] = useState<user>(defaultUser);
  const [editForm, setEditForm] = useState(false);
  const [userId, setUserId] = useState("");

  const getProfileInfo = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currentUser = JSON.parse(user);

      if (currentUser._id) {
        setUserId(currentUser._id);
        try {
          let url = `http://localhost:8080/api/users/${currentUser._id}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setUser(response.data.user);
          }
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  };

  const formatDateOfBirth = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      <Navigation />
      <div className="w-full flex py-8 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-4">
          {/* header */}
          <div className="w-full flex flex-col items-start justify-center space-y-4">
            <img
              src={Man}
              alt=""
              className="w-[120px] h-[120px] rounded-full"
            />
            <div className="w-full flex flex-col items-start justify-center space-y-1">
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-sm font-semibold">
                  {`${user.personalInfo.firstName} ${user.personalInfo.middleName} ${user.personalInfo.lastName}`}
                </p>
                <p className="text-xs font-normal text-[#6E6E6E] uppercase">
                  #{user._id}
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-xl bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                onClick={() => setEditForm(true)}
              >
                <p className="text-xs font-normal text-white">Edit Profile</p>
              </div>
            </div>
          </div>
          {/* personal info */}
          <div className="w-full flex flex-col items-center justify-center space-y-4 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row items-center justify-start space-x-2 pb-2">
              <div className="px-2 py-1 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                <i className="ri-info-i text-sm text-white"></i>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-semibold">Personal Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  name, birthdate, gender, nationality etc.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">First Name:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.personalInfo.firstName}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Middle Name:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.personalInfo.middleName}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Last Name:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.personalInfo.lastName}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Date of Birth:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {formatDateOfBirth(user.personalInfo.dateOfBirth)}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Gender:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.personalInfo.gender}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Civil Status:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.personalInfo.civilStatus}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Nationality:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.personalInfo.nationality}
              </p>
            </div>
          </div>
          {/* contact info */}
          <div className="w-full flex flex-col items-center justify-center space-y-4 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row items-center justify-start space-x-2 pb-2">
              <div className="px-2 py-1 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                <i className="ri-info-i text-sm text-white"></i>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-semibold">Contact Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  address and phone number
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">House Number:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.contactInfo.address.houseNumber}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Street:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.contactInfo.address.street}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Barangay:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.contactInfo.address.barangay}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">City:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.contactInfo.address.city}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Phone Number:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.contactInfo.phoneNumbers[0]}
              </p>
            </div>
          </div>
          {/* economic info */}
          <div className="w-full flex flex-col items-center justify-center space-y-4 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row items-center justify-start space-x-2 pb-2">
              <div className="px-2 py-1 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                <i className="ri-info-i text-sm text-white"></i>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-semibold">Economic Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  occupation and employment status
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Employment Status:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.economicInfo.employmentStatus}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Occupation:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.economicInfo.occupation}
              </p>
            </div>
          </div>
          {/* credentials */}
          <div className="w-full flex flex-col items-center justify-center space-y-4 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row items-center justify-start space-x-2 pb-2">
              <div className="px-2 py-1 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                <i className="ri-info-i text-sm text-white"></i>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-semibold">Credentials</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  user credentials
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Email:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.credentials.email}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Password:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.credentials.password}
              </p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">User Level:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                {user.credentials.level}
              </p>
            </div>
          </div>
        </div>
      </div>
      {editForm && (
        <EditUser
          userId={userId}
          onClose={() => {
            setEditForm(false);
            getProfileInfo();
          }}
        />
      )}
    </>
  );
};

export default Profile;
