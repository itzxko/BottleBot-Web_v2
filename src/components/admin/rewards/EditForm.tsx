import axios from "axios";
import { useEffect, useState } from "react";
import Notification from "../../Notification";
import { RiAddLine, RiArrowDownSLine } from "react-icons/ri";

const EditForm = ({
  rewardId,
  onClose,
}: {
  rewardId: string;
  onClose: () => void;
}) => {
  const [rewardName, setRewardName] = useState("");
  const [pointsRequired, setPointsRequired] = useState("");
  const [description, setDescription] = useState("");
  const [stocks, setStocks] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["Goods", "Clothing", "Beverage", "Other"];
  const [openCategory, setOpenCategory] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //modal
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getReward = async () => {
    if (rewardId) {
      try {
        let url = `http://localhost:8080/api/rewards/${rewardId}`;

        let response = await axios.get(url);

        if (response.data.success) {
          setCategory(response.data.reward.category);
          setStocks(response.data.reward.stocks);
          setRewardName(response.data.reward.rewardName);
          setPointsRequired(response.data.reward.pointsRequired);
          setImagePreview(
            `http://localhost:8080/api/images/${response.data.reward.image}`
          );
          setDescription(response.data.reward.rewardDescription);
          setValidFrom(
            response.data.reward.validFrom
              ? new Date(response.data.reward.validFrom)
                  .toISOString()
                  .split("T")[0]
              : ""
          );
          setValidUntil(
            response.data.reward.validUntil
              ? new Date(response.data.reward.validUntil)
                  .toISOString()
                  .split("T")[0]
              : ""
          );
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getReward();
  }, []);

  const updateReward = async () => {
    const formData = new FormData();

    formData.append("rewardName", rewardName);
    formData.append("pointsRequired", pointsRequired);
    formData.append("rewardDescription", description);
    formData.append("stocks", stocks);
    formData.append("category", category);
    formData.append("validFrom", validFrom);
    formData.append("validUntil", validUntil);
    if (imageFile !== null) {
      formData.append("imageChanged", "true");
      formData.append("image", imageFile);
    } else {
      formData.append("imageChanged", "false");
    }

    try {
      let url = `http://localhost:8080/api/rewards/${rewardId}`;

      let response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success === true) {
        setNotif(true);
        setError(false);
        setMessage(response.data.message);
      }
    } catch (error: any) {
      setNotif(true);
      setError(true);
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start p-4 overflow-y-auto font-DM">
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
                    Edit Reward
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="px-2.5 py-1 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={updateReward}
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
                {/* image upload */}
                <div className="relative">
                  <div className="relative w-[120px] h-[120px] bg-black rounded-full flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="text-xs text-white">No Image</p>
                    )}
                  </div>
                  <div className="absolute right-2 bottom-0 bg-gradient-to-tr from-[#466600] to-[#699900] rounded-full p-2 cursor-pointer">
                    <label htmlFor="imageUpload">
                      <RiAddLine size={16} color="white" />
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Reward Name</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    placeholder="reward name"
                    value={rewardName}
                    onChange={(e) => setRewardName(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Points Required</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    placeholder="points required"
                    value={pointsRequired}
                    onChange={(e) =>
                      setPointsRequired(e.target.value.replace(/\D/, ""))
                    }
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Reward Description</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    placeholder="reward description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Stocks</p>

                  <input
                    type="text"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    placeholder="reward stocks"
                    value={stocks}
                    onChange={(e) =>
                      setStocks(e.target.value.replace(/\D/, ""))
                    }
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Valid From</p>

                  <input
                    type="date"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    placeholder="valid from"
                    value={validFrom}
                    onChange={(e) => setValidFrom(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Valid Until</p>

                  <input
                    type="date"
                    className="w-full outline-none border-none text-xs font-normal bg-[#EDEDED] px-6 py-3 rounded-lg"
                    placeholder="valid until"
                    value={validUntil}
                    min={validFrom}
                    onChange={(e) => setValidUntil(e.target.value)}
                    disabled={!validFrom}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center space-y-1">
                  <p className="text-xs font-normal">Category</p>

                  <div className="relative w-full flex flex-row items-center justify-center bg-[#EDEDED] rounded-xl cursor-pointer">
                    <div
                      className="w-full flex flex-row items-center justify-between space-x-4 px-6 py-3"
                      onClick={() => setOpenCategory(!openCategory)}
                    >
                      <p className="text-xs font-normal">{category}</p>
                      <RiArrowDownSLine size={16} color="black" />
                    </div>
                    {openCategory ? (
                      <div className="absolute top-[120%] left-0 w-full flex flex-col items-center justify-center space-y-4 bg-[#EDEDED] rounded-xl px-6 py-3">
                        {categories.map((category: any) => (
                          <p
                            className="text-xs font-normal w-full truncate"
                            key={category}
                            onClick={() => {
                              setCategory(category);
                              setOpenCategory(false);
                            }}
                          >
                            {category}
                          </p>
                        ))}
                      </div>
                    ) : null}
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
