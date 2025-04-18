import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineAccountCircle } from "react-icons/md";
import SqueezyLogo from "./Logo";
import Themebox from "./Themebox";
import { generateAvatarFromName } from "../utils/herlper";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import LogoutModal from "./LogoutDialog";
import { useAuth } from "../hooks/useAuth";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const {user} = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dropdownRef = useRef(null);


  //logout
  const {handleLogout, isLoading} = useLogout();

  //logout and make modal close ok
  const doLogoutAnCloseModal = ()=>{
    handleLogout();
    setShowModal(false);
  }

  //random avatar;
  const avatar = generateAvatarFromName(user?.name || "");

  //handle outside click;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-md">
    <div className="flex items-center justify-between h-[60px] px-7 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="block md:hidden text-gray-700 dark:text-gray-300 text-2xl"
        >
          <FiMenu />
        </button>
        <h1 className="text-2xl font-bold text-purple-500 dark:text-purple-400">
          <SqueezyLogo  />
        </h1>
      </div>

      <div ref={dropdownRef} className="flex items-center gap-3">
         {user ? (
            <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold focus:outline-none cursor-pointer"
            style={{ backgroundColor: avatar.backgroundColor }}
          >
            {avatar.initials}
          </button>
          ) : (
            <button className="text-4xl text-purple-500 dark:text-purple-400">
              <FaUserCircle />
            </button>
          )}
        <Themebox />
        {dropdownOpen && (
            <div className="absolute right-28 mt-32 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-50 transition-colors duration-200">
              <Link
                to="/profile"
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
              >
                <MdOutlineAccountCircle className="text-lg" /> Profile
              </Link>
              <button
                role="button"
                type="button"
                disabled={isLoading}
                onClick={()=>setShowModal(true)}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-b-lg transition-colors duration-200"
              >
                <MdOutlineLogout className="text-lg" /> Sign Out
              </button>
            </div>
          )}
      </div>
      <LogoutModal isOpen={showModal} onConfirm={doLogoutAnCloseModal} onClose={()=>setShowModal(false)}/>
    </div>
  </header>
  );
};

export default Header;
