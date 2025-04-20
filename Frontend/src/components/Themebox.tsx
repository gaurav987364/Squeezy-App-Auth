import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useTheme } from "../context/theme/ThemeContext";
import { themes } from "../utils/constants/constants";

const ThemeBox = () => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  //our context
  const {mode,setMode} = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setMode(newTheme)

    if(newTheme !== "system"){
        localStorage.theme = newTheme;
    } else{
        localStorage.removeItem("theme")
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={boxRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Toggle theme"
      >
        {mode === "dark" && <FaMoon/>}
        {mode === "light" && <FaSun/>}
        {mode === "system" && <FaDesktop/>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 transition-all duration-200">
          <ul className="py-2">
           {themes.map(theme => {
            const Icon = theme.icon;
            return (
              <li 
                key={theme.label} 
                onClick={()=>handleThemeChange(theme.value)}
                className={`w-full flex items-center justify-start gap-3 px-4 py-2 text-sm transition-colors duration-200 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer ${
                    theme.value === mode ? "font-bold text-purple-700 bg-purple-100 dark:bg-purple-900" : "font-light"
                  }`}
              >
                  <Icon size={16}/> {theme.label} 
              </li>
             )
           })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeBox;
