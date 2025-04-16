import { FaHome, FaUserCog, FaLock, FaUserLock, FaUserAlt, FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import SqueezyLogo from "./Logo";

const SideBar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 shadow-lg transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:shadow-none`}
    >
      <div className="flex items-center justify-between px-4 h-[60px] border-b border-gray-200 dark:border-gray-700 md:hidden">
        <span>
            <SqueezyLogo size="small"/>
        </span>
        <button onClick={onClose} className="text-xl text-gray-700 dark:text-white">
          <IoClose />
        </button>
      </div>

      <nav className=" w-full h-full flex flex-col justify-between py-5">
        <div className="mt-4 space-y-3 px-4">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition hover:bg-purple-100 dark:hover:bg-purple-900
            ${isActive ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`
          }
        >
          <FaHome size={22}/> Home
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition hover:bg-purple-100 dark:hover:bg-purple-900
            ${isActive ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`
          }
        >
          <FaUserCog size={22}/> Profile
        </NavLink>

        <NavLink
          to="/session"
          className={({ isActive }) =>
            `flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition hover:bg-purple-100 dark:hover:bg-purple-900
            ${isActive ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`
          }
        >
          <FaLock size={22}/> Security
        </NavLink>
        </div>

        <div className="mt-4 space-y-2 px-6">
            <NavLink
            to="/login"
            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-900 ${isActive ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`
            }
            >
             <FaUserLock size={18} /> Login <FaArrowRight className="mt-1 ml-2 hover:translate-x-1 transition-transform duration-300" size={16}/>
            </NavLink>
            <NavLink
            to="/register"
            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-900 ${isActive ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`
            }
            >
             <FaUserAlt size={18}/> Register <FaArrowRight className="mt-1 ml-2 hover:translate-x-1 transition-transform duration-300" size={16}/>
            </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;