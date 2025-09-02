"use client";
import { useTheme } from "next-themes";
import { BiSun } from "react-icons/bi";
import { FaRegMoon } from "react-icons/fa";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=""
    >
      {theme === "dark" ? (
        <div className="text-[20px] text-primary font-semibold">
          <FaRegMoon />
        </div>
      ) : (
        <div className="text-[20px] text-primary font-semibold">
          <BiSun />
        </div>
      )}
    </button>
  );
};

export default ThemeToggler;
