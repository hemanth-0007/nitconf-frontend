import { useCallback } from "react";
import { FcConferenceCall } from "react-icons/fc";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import unverifyUser from "../../services/apiRequests/unverifyUser";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1719549707~exp=1719550307~hmac=6550a0390d098fef070fd383afdbb3449a3118fe090b83debbcaa754f0a97817",
};

const navigation = [
  { name: "Home", route: "/", current: true },
  { name: "Dashboard", route: "/dashboard", current: false },
  { name: "Upload", route: "/upload-paper", current: false },
  { name: "View Status", route: "/view-status", current: false },
  { name: "Notification", route: "/notification", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeaderNew = (props) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("Home");

  const { logout } = useAuth();

  const onClickMenuItem = async (name = "") => {
    if (name === "Sign out") {
      await onClickLogout();
      return;
    } else if (name === "Your Profile") {
      history.push("/my-profile");
    }
  };

  const onClickLogout = async  () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user.email);
      const [isUnverified, data] = await unverifyUser(user.email);
      if(!isUnverified){
        console.log("Error in unverifying user");
        return;
      }
      Cookies.remove("jwt_token");
      localStorage.removeItem("user");
      logout();
      history.replace("/login");
  }

 
  const classNameActive =
    "text-blue-500 hover:bg-gray-300 hover:text-black hover:transition-all duration-500 ease-in-out";
  const inactiveClassName =
    "text-gray-300 hover:bg-gray-300 hover:text-black hover:transition-all duration-500 ease-in-out";
 

  const NavItem = (item) => {
    return (
      <NavLink
        key={item.name}
        exact
        to={item.route}
        herf={item.route}
        className={
          activeTab === item.name
            ? `rounded-lg font-semibold p-3 ${classNameActive}`
            : `rounded-lg font-semibold  p-3 ${inactiveClassName}`
        }
        onClick={() => setActiveTab(item.name)}
      >
        {item.name}
      </NavLink>
    );
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white p-5">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FcConferenceCall className="h-20 w-20" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => {
                            return NavItem(item);
                        }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </MenuButton>
                        </div>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ focus }) => (
                                  <a
                                    onClick={() => onClickMenuItem(item.name)}
                                    href={item.href}
                                    className={classNames(
                                      focus ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default HeaderNew;
