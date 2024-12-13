const Notification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[100svh] bg-black/50 flex items-center justify-center font-DM p-6 z-30">
      <div className="w-3/4 lg:w-[260px] flex flex-col items-center justify-center rounded-xl bg-[#FAFAFA] overflow-hidden">
        <div className="w-full flex flex-row items-center justify-between shadow-xl shadow-black/10 px-6 py-4">
          <p className="text-sm font-semibold">Notification</p>
          <i
            className="ri-close-line text-md cursor-pointer"
            onClick={onClose}
          ></i>
        </div>
        <div className="py-10 px-6 w-full flex flex-col items-center justify-center space-y-4">
          <div className="px-3 py-2 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
            <i className="ri-notification-4-line text-xl text-white"></i>
          </div>
          <p className="text-xs font-normal text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
