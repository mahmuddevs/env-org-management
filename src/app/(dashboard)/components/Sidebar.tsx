import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { FaHandHoldingHeart, FaLeaf, FaUsers } from "react-icons/fa6";
import { HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";

interface SidebarProps {
  navActive: boolean;
}

const Sidebar = ({ navActive }: SidebarProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const userType = user?.userType;

  const sideNavAdmin = (
    <>
      <li>
        <Link
          className={`${navActive ? "" : "w-full justify-center"}`}
          href="/dashboard/admin"
        >
          <MdDashboard />
          {navActive && <span>Overview</span>}
        </Link>
      </li>
      <li>
        <Link
          className={`${navActive ? "" : "w-full justify-center"}`}
          href="/dashboard/admin/manage-users"
        >
          <FaUsers />
          {navActive && <span>Manage Users</span>}
        </Link>
      </li>
      <li>
        <Link
          className={`${navActive ? "" : "w-full justify-center"}`}
          href="/dashboard/admin/event-management"
        >
          <HiOutlineCalendarDays />
          {navActive && <span>Manage Event</span>}
        </Link>
      </li>
      <li>
        <Link
          className={`${navActive ? "" : "w-full justify-center"}`}
          href="/dashboard/admin/donations"
        >
          <FaHandHoldingHeart />
          {navActive && <span>Donations</span>}
        </Link>
      </li>
      <li>
        <Link
          className={`${navActive ? "" : "w-full justify-center"}`}
          href="/dashboard/admin/reports"
        >
          <HiOutlineChartBar />
          {navActive && <span>Reports & Analytics</span>}
        </Link>
      </li>
    </>
  );

  return (
    <aside className="">
      <Link href="/" className="flex items-center gap-2 p-6">
        <FaLeaf
          className={`${navActive ? "" : "mx-auto"} text-3xl text-emerald-400`}
        />
        {navActive && (
          <span className="hidden md:inline font-bold text-black text-2xl">
            EcoAlliance
          </span>
        )}
      </Link>
      <nav className="mt-2">
        <ul
          className={`dash-nav flex flex-col ${
            navActive ? "" : "items-center"
          }`}
        >
          {userType === "admin" && sideNavAdmin}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
