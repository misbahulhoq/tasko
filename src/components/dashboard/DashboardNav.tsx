import Link from "next/link";
import DashboardLink from "./DashboardLink";
import ProfileDropdown from "./ProfileDropdown";

const DashboardNav = () => {
  const navLinks = (
    <>
      <li>
        {/* <Link href="/dashboard/task-list">Task List</Link> */}
        <DashboardLink href="/dashboard/task-list" label="📝 Task List" />
      </li>
      <li>
        <DashboardLink href="/dashboard/spin" label="🌀 Spin" />
      </li>
    </>
  );
  return (
    <nav className="navbar bg-base-100 p-0 shadow-none lg:bg-transparent lg:text-white">
      {/* Part 1: Logo & Mobile Hamburger Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost pl-0 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="text-xl">
          🕙 Tasko
        </Link>
      </div>

      {/* Part 2: Centered Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Part 3: User Info Dropdown */}
      <div className="navbar-end mt-3">
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default DashboardNav;
