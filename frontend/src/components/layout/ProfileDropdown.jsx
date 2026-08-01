import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  User,
  FileText,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

function ProfileDropdown() {
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    // Logout logic to be implemented
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Semantic Accessible Avatar Button */}
      <button
        type="button"
        tabIndex={0}
        aria-label="Open profile menu"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-11 rounded-full bg-primary text-primary-content ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
          <span className="text-lg font-bold">
            {user?.firstName?.[0]?.toUpperCase() || "U"}
          </span>
        </div>
      </button>

      {/* Valid UL Menu Overlay */}
      <ul
        tabIndex={0}
        className="dropdown-content menu mt-2 w-72 rounded-box bg-base-100 shadow-xl border border-base-300 p-2 z-[100]"
      >
        {/* User Header */}
        <li className="pointer-events-none">
          <div className="px-2 py-1 flex flex-col items-start">
            <div className="flex items-center justify-between w-full">
              <p className="font-semibold truncate">
                {user?.firstName}
              </p>

              {user?.role === "admin" && (
                <span className="badge badge-primary badge-sm">
                  Admin
                </span>
              )}
            </div>

            <p className="text-xs opacity-60 truncate">
              {user?.emailId}
            </p>
          </div>
        </li>

        <li>
          <hr />
        </li>

        {/* Action Links */}
        <li>
          <Link
            to="/profile"
            className="rounded-lg flex items-center gap-2"
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
        </li>

        <li>
          <Link
            to="/submissions"
            className="rounded-lg flex items-center gap-2"
          >
            <FileText size={16} />
            <span>My Submissions</span>
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="rounded-lg flex items-center gap-2"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </li>

        {/* Conditional Admin Panel */}
        {user?.role === "admin" && (
          <>
            <li>
              <hr />
            </li>

            <li>
              <Link
                to="/admin"
                className="rounded-lg flex items-center gap-2"
              >
                <Shield size={16} />
                <span>Admin Panel</span>
              </Link>
            </li>
          </>
        )}

        <li>
          <hr />
        </li>

        {/* Logout Button */}
        <li>
          <button
            onClick={handleLogout}
            className="rounded-lg text-error hover:bg-error hover:text-error-content flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;