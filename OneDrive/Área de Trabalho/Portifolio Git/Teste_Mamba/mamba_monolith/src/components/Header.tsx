import Link from "next/link";
import { useState } from "react";
import Searchbar from "./Searchbar";
import { useCampaigns } from "@/context/CampaignContext";
import { ThemeSwitch } from "./ThemeSwitch";

const Header = () => {
  const { setExpiredCampaigns } = useCampaigns();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await setExpiredCampaigns();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          onClick={handleClick}
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://framerusercontent.com/images/OkEjuDmmIrapBVvBrhbh3Yobzs.png"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">
            Monolito em Next.js
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "scale-y-100" : "scale-y-0"
          } md:scale-y-100 flex flex-col items-center gap-4 absolute z-10 top-16 left-0 w-full bg-white dark:bg-gray-900 p-4 shadow-md md:flex md:flex-row md:static md:w-auto md:p-0 md:shadow-none origin-top transition-all ease-in-out`}
          id="navbar-default"
        >
          <Searchbar />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Header;
