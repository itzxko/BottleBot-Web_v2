import Navigation from "../../components/admin/Navigation";
import { useAuthorization } from "../../contexts/AuthorizationProvider";

const Dashboard = () => {
  const { onLogout } = useAuthorization();

  return (
    <>
      <Navigation />
      <div className="w-full flex items-center justify-center p-6 bg-[#EDEDED]">
        <div className="w-full lg:w-3/6 min-h-[100svh]"></div>
      </div>
    </>
  );
};

export default Dashboard;
