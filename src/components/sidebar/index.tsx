import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "/images/logo/logo.svg";
import { IoAnalytics, IoCash, IoPerson } from "react-icons/io5";
import { Icons } from "../icons";

import UserOne from "/images/user/user-01.png";

interface SidebarProps {
  sidebarOpen: boolean;
  // eslint-disable-next-line no-unused-vars -- type param for callback
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = sessionStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    sessionStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white text-slate-500 duration-300 border-r ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        {/* <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink> */}
        <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-[#ff8c00] rounded-xl flex items-center justify-center text-white">
              <Icons.Grid />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight uppercase text-slate-900">
                VOCACANADA
              </h1>
              <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                Management Suite
              </p>
            </div>
          </div>


        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill="" />{" "} </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Profile Section */}
       

        {/* <!-- Sidebar Menu --> */}
        <nav className="py-4 px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Activity
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("/admin/dashboard")
                }
              >
                {(handleClick) => {
                  // ,text-slate-500 hover:bg-slate-50 hover:text-slate-700
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/admin/kiosk-management"
                        className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm  transition-all  font-medium   duration-300 ease-in-out hover:border-l-4 hover:border-l-primary dark:hover:bg-meta-4 ${(pathname === "/" || pathname.includes("/admin/dashboard")) && "bg-[#ff8c00]/10 text-[#ff8c00] font-semibold     "}`}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   sidebarExpanded
                        //     ? handleClick()
                        //     : setSidebarExpanded(true);
                        // }}
                      >
                        <Icons.Dashboard  />
                        Dashboard
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/admin/kiosk-management"
                  className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm  transition-all  font-medium   duration-300 ease-in-out hover:border-l-4 hover:border-l-primary dark:hover:bg-meta-4 ${pathname.includes("/admin/kiosk-management") && "bg-[#ff8c00]/10 text-[#ff8c00] font-semibold   "}`}
                >
                  <Icons.Kiosk />
                  Kiosk Management
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/admin/settings"
                  className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm  transition-all  font-medium   duration-300 ease-in-out hover:border-l-4 hover:border-l-primary dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-[#ff8c00]/10 text-[#ff8c00] font-semibold "
                  }`}
                >
                  <Icons.Settings />
                  Settings
                </NavLink>
              </li>

               <li>
                <NavLink
                  to="/admin/live"
                  className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm  transition-all  font-medium   duration-300 ease-in-out hover:border-l-4 hover:border-l-primary dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/live") && "bg-[#ff8c00]/10 text-[#ff8c00] font-semibold "
                  }`}
                >
                  <Icons.Wifi />
                  Live
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          {/* <div>
            <h3 className="mt-10 mb-4 ml-4 text-sm font-semibold text-bodydark2">
              {" "}
              Appointment{" "}
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <!-- Menu Item Chart -->
              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out  hover:border-l-4 hover:border-l-primary ${pathname.includes("calendar") && "text-primary font-bold border-l-4 border-l-primary  "}`}
                >
                  <IoPerson />
                  Appointments
                </NavLink>
              </li>
              <!-- Menu Item Chart -->

              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out  hover:border-l-4 hover:border-l-primary ${pathname.includes("calendar") && "text-primary font-bold border-l-4 border-l-primary  "}`}
                >
                  <IoPerson />
                  Waiting Room
                </NavLink>
              </li>
            </ul>
          </div> */}

          {/* <!-- Others Group --> */}
        
        </nav>
        
        {/* <!-- Sidebar Menu --> */}
      </div>
      {/* User footer */}
              <div className="mt-auto p-5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">Admin User</p>
                    <p className="text-xs text-slate-400 truncate">admin@voca.ca</p>
                  </div>
                  <button className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0">
                    <Icons.Logout />
                  </button>
                </div>
              </div>
    </aside>
  );
};

export default Sidebar;
