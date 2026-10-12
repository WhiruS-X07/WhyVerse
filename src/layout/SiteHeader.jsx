import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import GlobalSearch from "../components/search/GlobalSearch";

const NAV_ITEMS = [
  {
    label: "Explore",
    to: "/",
    end: true,
    icon: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h5v-6h4v6h5V9.5" /></>,
  },
  {
    label: "Movies",
    to: "/movies",
    icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" /></>,
  },
  {
    label: "TV Shows",
    to: "/tvshows",
    icon: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  },
  {
    label: "Collection",
    to: "/collection",
    icon: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.25" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.25" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.25" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.25" /></>,
  },
];

const SEARCH_NAV_ITEM = {
  label: "Search",
  to: "/search",
  icon: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
};

const MOBILE_NAV_ITEMS = [
  ...NAV_ITEMS.slice(0, 3),
  SEARCH_NAV_ITEM,
  NAV_ITEMS[3],
];

const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const LoginIcon = () => (
  <Icon><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" /></Icon>
);

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-lg">
        <div className="mx-auto grid h-[4.25rem] max-w-screen-2xl grid-cols-[1fr_auto] items-center px-4 sm:h-[4.5rem] sm:px-6 lg:px-8 xl:flex xl:h-20 xl:justify-between">
          <Link to="/" aria-label="WhyVerse home" className="flex w-fit items-center justify-self-start xl:shrink-0">
            <img
              src={logo}
              alt="WhyVerse"
              className="h-12 w-auto object-contain transition duration-300 hover:scale-[1.03] sm:h-14 xl:h-16"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden xl:block">
            <ul className="flex items-center gap-4 xl:gap-6">
              {NAV_ITEMS.map(({ label, to, end, icon }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) => `group relative flex items-center gap-2 pb-1 transition-colors duration-300 ${isActive ? "text-[#EF5D12]" : "text-slate-300 hover:text-[#EF5D12]"}`}
                  >
                    {({ isActive }) => <>
                      <Icon>{icon}</Icon>
                      <span className="font-bold">{label}</span>
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#EF5D12] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <GlobalSearch />
            <Link to="/login" className="flex items-center gap-2 rounded-full bg-[#EF5D12] px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#F97316]">
              <LoginIcon />
              <span className="font-bold">Login</span>
            </Link>
          </div>

          <Link
            to="/login"
            className="inline-flex min-h-10 items-center justify-self-end gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 text-sm font-bold text-orange-200 transition hover:border-orange-400/70 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:gap-2 sm:px-4 xl:hidden"
          >
            <LoginIcon />
            <span>Login</span>
          </Link>
        </div>

      </header>

      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#090909]/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_36px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:hidden">
        <ul className="mx-auto grid h-[4.15rem] max-w-xl grid-cols-5 items-center px-3 sm:h-[4.4rem] sm:px-6">
          {MOBILE_NAV_ITEMS.map(({ label, to, end, icon }) => (
            <li key={label} className="h-full">
              <NavLink
                to={to}
                end={end}
                aria-label={label}
                title={label}
                className={({ isActive }) => `relative flex h-full w-full flex-col items-center justify-center gap-1 transition-colors duration-200 ${isActive ? "text-orange-400" : "text-zinc-500 hover:text-zinc-200"}`}
              >
                {({ isActive }) => <>
                  <span className={`absolute top-0 h-0.5 w-8 rounded-full bg-orange-500 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                  <Icon className={`h-[1.35rem] w-[1.35rem] sm:h-[1.45rem] sm:w-[1.45rem] ${isActive ? "scale-105" : ""}`}>{icon}</Icon>
                  <span className="sr-only">{label}</span>
                </>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;
