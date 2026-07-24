import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center gap-2 pb-1 transition-all duration-300 ${
      isActive ? "text-[#EF5D12]" : "text-slate-300 hover:text-[#EF5D12]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#000000]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="WhyVerse"
            className="h-16 sm:h-20 lg:h-24 transition duration-300 hover:scale-105"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {/* Home */}
            <li>
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 10.5L12 3l9 7.5" />
                      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
                    </svg>

                    <span className="font-bold">Home</span>

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#EF5D12] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>

            {/* Movies */}
            <li>
              <NavLink to="/movies" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" />
                    </svg>

                    <span className="font-bold">Movies</span>

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#EF5D12] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>

            {/* TV Shows */}
            <li>
              <NavLink to="/tvshows" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="12" rx="2" />
                      <path d="M8 21h8" />
                      <path d="M12 17v4" />
                    </svg>

                    <span className="font-bold">TV Shows</span>

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#EF5D12] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>

            {/* People */}
            <li>
              <NavLink to="/people" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.8 5.5 21 7.5 13.5 2 9 9 9" />
                    </svg>
                    <span className="font-bold">People</span>

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#EF5D12] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>

            <input
              type="text"
              placeholder="Search movies, TV shows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
               w-40 sm:w-48 md:w-52 lg:w-56 xl:w-64 2xl:w-72
                rounded-2xl
                border
                border-white/10
                bg-white/5
                py-3
                pl-14
                pr-5
                text-sm
                text-white
                placeholder:text-zinc-500
                backdrop-blur-xl
                transition-all
                duration-300
                focus:border-[#EF5D12]
                focus:bg-white/10
                focus:outline-none
                focus:ring-4
                focus:ring-[#EF5D12]/15
              "
            />
          </div>

          {/* Login */}
          <Link
            to=""
            className="flex items-center gap-2 rounded-full bg-[#EF5D12] px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#F97316]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>

            <span className="font-bold">Login</span>
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          {menuOpen ? (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black px-5 py-5">
          <div className="flex flex-col gap-3">
            {/* Home */}
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-[#EF5D12]/10 text-[#EF5D12]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#EF5D12]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-6 w-1 rounded-full bg-[#EF5D12] transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 10.5L12 3l9 7.5" />
                    <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
                  </svg>

                  <span className="font-semibold">Home</span>
                </>
              )}
            </NavLink>

            {/* Movies */}
            <NavLink
              to="/movies"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-[#EF5D12]/10 text-[#EF5D12]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#EF5D12]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-6 w-1 rounded-full bg-[#EF5D12] transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" />
                  </svg>

                  <span className="font-semibold">Movies</span>
                </>
              )}
            </NavLink>

            {/* TV Shows */}
            <NavLink
              to="/tvshows"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-[#EF5D12]/10 text-[#EF5D12]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#EF5D12]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-6 w-1 rounded-full bg-[#EF5D12] transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="12" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>

                  <span className="font-semibold">TV Shows</span>
                </>
              )}
            </NavLink>

            {/* People */}
            <NavLink
              to="/people"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-[#EF5D12]/10 text-[#EF5D12]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#EF5D12]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-6 w-1 rounded-full bg-[#EF5D12] transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.8 5.5 21 7.5 13.5 2 9 9 9" />
                  </svg>

                  <span className="font-semibold">People</span>
                </>
              )}
            </NavLink>

            {/* Search */}
            <div className="relative mt-3">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:border-[#EF5D12] focus:outline-none focus:ring-2 focus:ring-[#EF5D12]/20"
              />
            </div>

            {/* Login */}
            <Link
              to=""
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#EF5D12] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#F97316]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>

              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
