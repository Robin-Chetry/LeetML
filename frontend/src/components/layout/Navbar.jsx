import { Link, NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100 border-b border-base-300 h-16">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <div className="flex-1">
          <Link to="/">
            <span className="text-3xl font-extrabold tracking-tight text-primary">
              LeetML
            </span>
          </Link>
        </div>

        {/* Navigation Links & User Profile */}
        <div className="flex items-center gap-4">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "text-base-content/70 hover:text-primary"
                }
              >
                Problems
              </NavLink>
            </li>
          </ul>

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;