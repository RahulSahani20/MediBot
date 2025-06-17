import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navigation = [
  // { name: 'Dashboard', to:"/dashboard"},
  { name: "Home", to: "/" },
  { name: "Chat", to: "/chat" },
  { name: "First Aid", to: "/firstaid" },
  { name: "About Us", to: "/about" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ isAuthenticated, setIsAuthenticated, resetChatState }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    resetChatState();
    navigate("/");
  };

  return (
    <Disclosure
      as="nav"
      className="bg-blue-600 p-5 sticky top-0 z-50 shadow-md"
    >
      <div className="mx-auto w-[475] px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-10 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-blue-200  hover:text-white focus:ring-1 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="MediBot" src={logo} className="h-10 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-white hover:text-sky-200",
                        "rounded-md px-3 py-2 text-lg font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* lef side */}

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full bg-blue-200 p-2 text-blue-600 hover:text-white hover:bg-blue-400 focus:ring-1 focus:ring-white focus:text-white focus:bg-blue-400 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-8" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="Profile Image"
                        src={logo}
                        className="size-12 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}

            {/* fdf */}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
