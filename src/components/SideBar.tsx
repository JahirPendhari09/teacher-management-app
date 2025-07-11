import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Context/ThemeProvider";
import type { NavigationItem, SideBarContentProps } from "./types";


import { RxHome, RxCross2 } from "react-icons/rx";
import { CgNotes } from "react-icons/cg";
import { CiCloudOn } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { LuBookmark } from "react-icons/lu";
import { MdOutlineLocalPhone, MdLogout } from "react-icons/md";
import { FaBars } from "react-icons/fa";


// -------------------- Static Data --------------------

const topNavigationContent: NavigationItem[] = [
  { id: 1, icon: RxHome, label: "Home", active: true },
  { id: 2, icon: CgNotes, label: "Release notes" },
  { id: 3, icon: CiCloudOn, label: "Cloud Security" },
  { id: 4, icon: IoBookOutline, label: "How to Use" },
  { id: 5, icon: LuBookmark, label: "Book Mark" },
  { id: 6, icon: RxHome, label: "Home" },
  { id: 7, icon: CgNotes, label: "Release notes" },
  { id: 8, icon: CiCloudOn, label: "Cloud Security" },
  { id: 9, icon: IoBookOutline, label: "How to Use" },
  { id: 10, icon: LuBookmark, label: "Book Mark" },
  { id: 11, icon: MdOutlineLocalPhone, label: "Support" },
  { id: 12, icon: MdLogout, label: "Logout" },
];


// -------------------- SideBarContent --------------------

const SideBarContent: React.FC<SideBarContentProps> = ({
  handleClick,
  topNaviLinks,
}) => {
  return (
      <nav className="flex-1 px-4 py-2 space-y-2 text-white">
        {topNaviLinks.map(({ id, icon: Icon, label, active }) => (
          <div
            key={id}
            onClick={() => handleClick(id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg 
              ${ active ? "bg-blue-500" : "hover:bg-blue-500" }`}
          >
            <Icon className="w-6 h-6" />
            <span className="ml-3 font-medium">{label}</span>
          </div>
        ))}
      </nav>
  );
};


const SideBar: React.FC = () => {
  const { isSideBarVisible, setIsSideBarVisible } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [topNaviLinks, setTopNaviLinks] = useState<NavigationItem[]>(
    topNavigationContent
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (id: number) => {
    const updatedTopLinks = topNaviLinks.map((link) =>
      link.id === id ? { ...link, active: true } : { ...link, active: false }
    );
    setTopNaviLinks(updatedTopLinks);
  };

  const handleHambergerClick = () => {
    console.log("clicked.");
    setIsSideBarVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full md:w-64 bg-white md:h-screen border-r relative">
      {!isMobile ? (
          <div
            className={`absolute md:static bottom-0 w-full transition-all h-full bg-black/10 md:bg-transparent overflow-hidden`}
          >
            <div className="bg-slate-900 w-full h-full flex flex-col">
              <SideBarContent
                handleClick={handleClick}
                topNaviLinks={topNaviLinks}
              />
            </div>
          </div>
      ) : (
        <>
          <div className="flex justify-between md:justify-around w-full px-4 items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <button onClick={handleHambergerClick}>
              <FaBars className="w-6 h-6" />
            </button>
          </div>

          <div
            className={`fixed top-0 left-0 w-full bg-white shadow-lg z-50 transform transition-transform duration-700 
                ${isSideBarVisible ? "translate-y-0" : "-translate-y-full"}`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-medium">Dashboard</h1>
              </div>
              <button
                onClick={() => setIsSideBarVisible(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <RxCross2 className="w-6 h-6" />
              </button>
            </div>
            <div className="w-full bg-slate-900">
              <SideBarContent
                handleClick={handleClick}
                topNaviLinks={topNaviLinks}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
