import { FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import SqueezyLogo from "./Logo";
import Themebox from "./Themebox";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    // <header className="w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-md">
    //   <div className="flex items-center justify-between h-[60px] px-4 border-b border-gray-200 dark:border-gray-700">
    //     {/* Left: Brand + Hamburger */}
    //     <div className="flex items-center gap-4">
    //       {/* Hamburger - only visible on small screens */}
    //       <button type="button" role="button" onClick={onMenuClick} className="block md:hidden text-gray-700 dark:text-gray-300 text-2xl">
    //         <FiMenu />
    //       </button>

    //       {/* Brand logo */}
    //       <h1 className="text-2xl font-bold text-purple-500 dark:text-purple-400">
    //         <SqueezyLogo size="small"/>
    //       </h1>
    //     </div>

    //     <div className=" flex items-center gap-3">
    //         {/* Right: User Avatar */}
    //         <div className="text-2xl border p-1 rounded-full text-gray-700 dark:text-gray-300">
    //           <FaUserCircle />
    //         </div>
            
    //        {/* {theme-box} */}
    //         <div>
    //           <Themebox/>
    //         </div>
    //     </div>
    //   </div>
    // </header>
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

      <div className="flex items-center gap-3">
        <div className="text-2xl border p-1 rounded-full text-gray-700 dark:text-gray-300">
          <FaUserCircle />
        </div>
        <Themebox />
      </div>
    </div>
  </header>
  );
};

export default Header;
