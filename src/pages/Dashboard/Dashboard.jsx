import { PiUsersThreeLight } from "react-icons/pi";
import StatCard from "../../components/Dashboard/StatCard";
import { FiUsers } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import IncomeReport from "../../components/Dashboard/IncomeReport";
import UserGrowth from "../../components/Dashboard/UserGrowth";
import SubscriberGrowth from "../../components/Dashboard/SubscriberGrowth";
import UserTable from "../../components/Dashboard/Table/UserTable";

const Dashboard = () => {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<PiUsersThreeLight className="text-5xl" />}
          value="10"
          description="Total User"
        />
        <StatCard
          icon={<FiUsers className="text-5xl" />}
          value="1k"
          growth="70%"
          description="Total Subscribers"
        />
        <StatCard
          icon={<MdOutlineAttachMoney className="text-5xl" />}
          currency="$"
          value="14k"
          growth="70%"
          growthIcon={<GrLineChart className="text-green-600 text-xl" />}
          description="Total Income"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscriberGrowth />
        <UserGrowth />
      </div>
      <div className="mt-6">
        <IncomeReport />
      </div>
      <UserTable isDashboard = {true} />
    </div>
  );
};

export default Dashboard;
