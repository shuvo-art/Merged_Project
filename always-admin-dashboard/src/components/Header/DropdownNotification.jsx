import { useState } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../ClickOutside.jsx";
import { IoIosNotificationsOutline } from "react-icons/io";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false); // Remove the notification badge
            setDropdownOpen(!dropdownOpen); // Toggle dropdown open state
          }}
          to="#"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 shadow-lg"
        >
          {/* Notification Badge */}
          {notifying && (
            <span className="absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#8CAB91] text-xs font-bold text-white">
              1
            </span>
          )}

          {/* Bell Icon */}
          <IoIosNotificationsOutline className="text-2xl text-[#5E5E5E]" />
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">
                Notification
              </h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 "
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black ">
                      Edit your information in a swipe
                    </span>{" "}
                    Sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim.
                  </p>

                  <p className="text-xs">12 May, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 "
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black ">
                      It is a long established fact
                    </span>{" "}
                    that a reader will be distracted by the readable.
                  </p>

                  <p className="text-xs">24 Feb, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 "
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black ">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">04 Jan, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 "
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black ">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">01 Dec, 2024</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
