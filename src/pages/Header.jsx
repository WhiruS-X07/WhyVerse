import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [search, setSearch] = useState("");

  const navLinkClass = ({ isActive }) =>
    `group relative flex items-center gap-2 pb-1 transition-all duration-300 ${
      isActive ? "text-[#EF5D12]" : "text-slate-300 hover:text-[#EF5D12]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#000000]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="WhyVerse"
            className="h-26 transition duration-300 hover:scale-105"
          />
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-8">
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
        <div className="flex items-center gap-4">
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
                w-72
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
      </div>
    </header>
  );
};

export default Header;
