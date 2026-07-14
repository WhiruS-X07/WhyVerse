import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const [search, setSearch] = useState("");

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 ${
    isActive ? "text-[#F5C518] hover:text-[#F5C518]" : "text-white hover:text-[#f2e8c2]"
  }`;
    

  return (
    <>
      <nav className="sticky top-0 left-0 z-20 w-full text-white ">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between">
          <Link to="/">
            <img src={logo} alt="WhyVerse Logo" className="w-20" />
          </Link>
          <ul className="flex items-center gap-8">
            {/* Home */}
            <li>
              <NavLink to="/" className={navLinkClass}>
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                    fill="currentColor"
                  />
                </svg>

                <span>Home</span>
              </NavLink>
            </li>

            {/* Movies */}
            <li>
              <NavLink to="/movies" className={navLinkClass}>
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 234.42 234.42"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M234.42,51.402v-6.566H0v6.566h29.135V71.61H0v90.944h27.507v20.211H0v6.819h234.42v-6.819h-30.768v-20.211h30.768V71.604h-29.138V51.397h29.138V51.402z M79.47,51.402h32.728V71.61H79.47V51.402z M141.081,113.006c3.229,1.998,4.677,7.238,0.727,9.514c-10.613,6.144-21.236,12.273-31.847,18.412c-3.339,1.93-8.6,0.3-8.6-4.179c0.051-12.659,0.071-25.332,0.082-37.994c0.018-1.201,0.417-2.173,0.937-2.991c1.097-2.438,3.592-3.979,6.484-2.526c0.135,0.051,0.229,0.104,0.343,0.135c0.036,0.015,0.068,0.015,0.109,0.03c0.043,0.033,0.079,0.053,0.124,0.073c0.579,0.214,1.082,0.531,1.514,0.952C120.998,100.636,131.042,106.818,141.081,113.006z M69.444,182.754H36.722v-20.205h32.722V182.754z M71.071,71.604H38.344V51.397h32.728V71.604z M110.565,182.754H77.843v-20.205h32.723V182.754z M152.507,182.754h-32.728v-20.205h32.728V182.754z M154.137,71.604h-32.723V51.397h32.723V71.604z M194.446,182.754h-32.733v-20.205h32.733V182.754z M196.07,71.604h-32.727V51.397h32.727V71.604z" />
                </svg>

                <span>Movies</span>
              </NavLink>
            </li>

            {/* TV Shows */}
            <li>
              <NavLink to="/tvshows" className={navLinkClass}>
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 21H16M12 17V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <span>TV Shows</span>
              </NavLink>
            </li>

            {/* Anime */}
            <li>
              <NavLink to="/anime" className={navLinkClass}>
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M325.41 32.18L222.562 237.879h13.711l13.364-13.363 6.363-6.364 19.727 19.727H346l74.947-179.873c-8.11-4.986-23.97-11.715-41.314-16.445-19.05-5.196-39.628-8.654-54.223-9.381zm-139.205.021c-14.576.771-34.953 4.21-53.838 9.36-17.344 4.73-33.204 11.46-41.314 16.445L166 237.879h36.44l38.722-77.445zm29.25 22.563l36.25 84.584 41.984-83.971c-26.948 5.752-51.079 5.561-78.234-.613zM88.416 98.478l-43.691 65.54 65.88 39.529 15.24-15.24zm335.168 0l-37.43 89.829 15.24 15.24 65.881-39.53zM256 243.605l-20.42 20.42 20.42 30.63 20.42-30.63zM153 255.88v30h75.518l-16.098-24.147 5.853-5.853zm140.727 0l5.853 5.853-16.098 24.147H359v-30zm-129.125 48l-26.045 165.24c114.22 14.268 120.666 14.268 234.886 0l-26.045-165.24h-75.916L256 327.102l-15.482-23.223z" />
                </svg>

                <span>Anime</span>
              </NavLink>
            </li>
          </ul>

          <ul className="flex items-center gap-4">
            <li>
              <input
                type="text"
                className="border border-[#272b38] py-2 px-4 rounded-full bg-[#111827] text-white focus:outline-none focus:ring-2 focus:ring-[#F5C518] focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search WhyVerse..."
              />
            </li>
            <li>
              <Link to="/login" className="flex items-center gap-2 text-white ">
                <svg
                  className="w-5 h-5 "
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" />

                  <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" />
                </svg>

                <span>Login</span>
              </Link>
            </li>
          </ul>
        </div>
        <hr />
      </nav>
    </>
  );
};

export default Header;
