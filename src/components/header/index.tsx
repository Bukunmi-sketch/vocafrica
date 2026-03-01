import { Link } from "react-router-dom";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { Icons } from "../icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const Header = (props: {
//   sidebarOpen: string | boolean | undefined;
//   Heading?: string | React.ReactNode
//     text?: string;
//      Headingb?: string;
//   setSidebarOpen: (open: boolean) => void;
// }) => {

interface HeaderAdminProps {
  Heading?: string | React.ReactNode
  text?: string;
  Headingb?: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  orgName?: string;
  orgProfilePic?: string;
  personalName?: string;
  personalProfilePic?: string;
}

const Header: React.FC<HeaderAdminProps> = ({ Heading, text, Headingb, sidebarOpen, setSidebarOpen, orgName, orgProfilePic, personalProfilePic, personalName }) => {

   const [search, setSearch] = useState("");
    const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none  border-b">
      <div className="flex flex-grow items-center justify-between px-4 py-2  md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
             
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={"/images/logo/logo-icon.svg"} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
         <h1 className="text-lg font-semibold text-stone-900 ">{Heading} <span className='text-gray-900'>{Headingb}</span> </h1>
          <span className='font-normal text-xs dark:text-textWhite'>{text} </span>
        </div>

          <div className="relative w-full max-w-sm">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icons.Search />
                      </span>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by Kiosk ID or location..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/20 focus:bg-white transition-all"
                      />
                    </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

            <button onClick={() => navigate('/admin/new-kiosk')} className="bg-[#ff8c00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-200 transition-all flex items-center gap-1.5">
                      <Icons.Plus />
                      <span>Create New Kiosk</span>
                    </button>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
