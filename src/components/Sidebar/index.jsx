import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup.jsx";
import Logo from "../../images/logo/logo.png";
import { FiShoppingBag } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { TiUserAddOutline } from "react-icons/ti";
import { ImPower } from "react-icons/im";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext.jsx";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const { logout } = useContext(AuthContext);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Close sidebar on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
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

  // Close sidebar if the Esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Save expanded state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`relative left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#FAF1E6] duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-1.5 lg:py-1.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* Sidebar Header */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 lg:mt-3 ">
          <ul className="mb-6 flex flex-col gap-1.5 ">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm py-2 px-8 font-medium text-[#364636] duration-300 ease-in-out ${
                    isActive
                      ? "bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]"
                      : "hover:bg-[#8CAB91] hover:text-white"
                  }`
                }
              >
                <MdDashboard className="text-2xl" />
                Dashboard
              </NavLink>
            </li>
            {/* Calendar */}
            <li>
              <NavLink
                to="/orderManagement"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm py-2 px-8 font-medium text-[#364636] duration-300 ease-in-out ${
                    isActive
                      ? "bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]"
                      : "hover:bg-[#8CAB91] hover:text-white"
                  }`
                }
              >
                <FiShoppingBag className="text-2xl" />
                Order Management
              </NavLink>
            </li>
            {/* Profile */}
            <li>
              <NavLink
                to="/addQuestionnaire"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm py-2 px-8 font-medium text-[#364636] duration-300 ease-in-out ${
                    isActive
                      ? "bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]"
                      : "hover:bg-[#8CAB91] hover:text-white"
                  }`
                }
              >
                <GoChecklist className="text-2xl" />
                Add Questionnaire
              </NavLink>
            </li>
            {/* Tables */}
            <li>
              <NavLink
                to="/makeAdmin"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm py-2 px-8 font-medium text-[#364636] duration-300 ease-in-out ${
                    isActive
                      ? "bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]"
                      : "hover:bg-[#8CAB91] hover:text-white"
                  }`
                }
              >
                <TiUserAddOutline className="text-2xl" />
                Make Admin
              </NavLink>
            </li>

            {/* Subscription Dropdown */}
            <SidebarLinkGroup
              activeCondition={
                pathname === "/Subscription" || pathname.includes("auth")
              }
            >
              {(handleClick, open) => (
                <>
                  <NavLink
                    to="#"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-8 font-medium text-[#364636] duration-300 ease-in-out hover:bg-[#8CAB91] hover:text-white`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    <ImPower className="text-2xl" />
                    Subscription
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </NavLink>
                  {/* Dropdown Menu */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 ">
                      <li>
                        <NavLink
                          to="/subscription/subscription"
                          className={({ isActive }) =>
                            "group relative flex items-center gap-2.5 hover:!bg-[#8CAB91] hover:!text-white  px-16 py-2 font-medium text-[#364636] duration-300 ease-in-out " +
                            (isActive &&
                              "!bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]")
                          }
                        >
                          Subscription
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/subscription/couponCode"
                          className={({ isActive }) =>
                            "group relative flex items-center hover:!bg-[#8CAB91] hover:!text-white gap-2.5  px-16 py-2  font-medium text-[#364636] duration-300 ease-in-out " +
                            (isActive &&
                              "!bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]")
                          }
                        >
                          Coupon code
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </SidebarLinkGroup>
            {/* Settings Dropdown */}
            <SidebarLinkGroup
              activeCondition={
                pathname === "/auth" || pathname.includes("auth")
              }
            >
              {(handleClick, open) => (
                <>
                  <NavLink
                    to="#"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-8 font-medium text-[#364636] duration-300 ease-in-out hover:bg-[#8CAB91] hover:text-white`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    <IoMdSettings className="text-2xl" />
                    Settings
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </NavLink>
                  {/* Dropdown Menu */}
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 ">
                      <li>
                        <NavLink
                          to="/settings/termsAndConditions"
                          className={({ isActive }) =>
                            "group relative flex items-center gap-2.5 hover:!bg-[#8CAB91] hover:!text-white  px-16 py-2 font-medium text-[#364636] duration-300 ease-in-out " +
                            (isActive &&
                              "!bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]")
                          }
                        >
                          Terms & condition
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/settings/privacyAndPolicy"
                          className={({ isActive }) =>
                            "group relative flex items-center hover:!bg-[#8CAB91] hover:!text-white gap-2.5  px-16 py-2  font-medium text-[#364636] duration-300 ease-in-out " +
                            (isActive &&
                              "!bg-[#8CAB91] !text-white before:content-[''] before:absolute before:top-0 before:left-2 before:h-full before:w-3 before:bg-[#FAF1E6]")
                          }
                        >
                          Privacy policy
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </SidebarLinkGroup>
          </ul>
        </nav>
        {/* Sidebar Menu */}
        <button
          className="absolute bottom-20 right-20 flex items-center justify-center gap-1 cursor-pointer"
          onClick={logout} // Attach the logout handler
        >
          <BiLogOut className="text-red-500 text-2xl rotate-180" />
          <p className="text-[#364636] text-base font-medium">Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
