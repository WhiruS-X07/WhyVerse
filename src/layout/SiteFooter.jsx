import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#000000]">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white ">
            Why<span className="text-[#EF5D12]">Verse</span>
          </h2>

          <p className="mt-5 max-w-sm leading-7 text-slate-400">
            Explore thousands of movies and TV shows in one place. Discover
            trending releases, timeless classics, and your next favorite story
            with WhyVerse.
          </p>

          {/* Social */}
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              className="rounded-full border border-slate-700 p-2 text-slate-400 transition-all duration-300 hover:border-[#EF5D12] hover:text-[#EF5D12]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 008.36 22.95c.58.1.79-.25.79-.56v-2.17c-3.2.69-3.88-1.38-3.88-1.38-.53-1.33-1.29-1.68-1.29-1.68-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.05 1.79 2.75 1.27 3.42.97.1-.76.41-1.27.74-1.56-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.19a11.1 11.1 0 015.8 0c2.22-1.5 3.19-1.19 3.19-1.19.63 1.59.23 2.77.11 3.06.74.81 1.19 1.85 1.19 3.11 0 4.42-2.69 5.4-5.26 5.69.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>

            <a
              href="#"
              className="rounded-full border border-slate-700 p-2 text-slate-400 transition-all duration-300 hover:border-[#EF5D12] hover:text-[#EF5D12]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 5.92c-.77.34-1.6.57-2.47.67a4.3 4.3 0 001.89-2.38 8.6 8.6 0 01-2.72 1.04 4.29 4.29 0 00-7.3 3.91A12.18 12.18 0 013 4.87a4.29 4.29 0 001.33 5.73 4.25 4.25 0 01-1.94-.54v.05a4.29 4.29 0 003.44 4.2 4.33 4.33 0 01-1.94.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54a12.13 12.13 0 006.58 1.93c7.89 0 12.2-6.53 12.2-12.2v-.56a8.72 8.72 0 002.15-2.23z" />
              </svg>
            </a>

            <a
              href="#"
              className="rounded-full border border-slate-700 p-2 text-slate-400 transition-all duration-300 hover:border-[#EF5D12] hover:text-[#EF5D12]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-9 19H7v-8h3v8zm-1.5-9.3a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM20 19h-3v-4.3c0-2.57-3-2.38-3 0V19h-3v-8h3v1.28c1.4-2.59 6-2.78 6 2.48V19z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">Explore</h3>

          <ul className="space-y-4 text-slate-400">
            <li>
              <Link className="transition hover:text-[#EF5D12]" to="/">
                Explore
              </Link>
            </li>

            <li>
              <Link className="transition hover:text-[#EF5D12]" to="/movies">
                Movies
              </Link>
            </li>

            <li>
              <Link className="transition hover:text-[#EF5D12]" to="/tvshows">
                TV Shows
              </Link>
            </li>

            <li>
              <Link className="transition hover:text-[#EF5D12]" to="/people">
                People
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">Resources</h3>

          <ul className="space-y-4 text-slate-400">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[#EF5D12]"
              >
                TMDB
              </a>
            </li>

            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[#EF5D12]"
              >
                React
              </a>
            </li>

            <li>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[#EF5D12]"
              >
                Tailwind CSS
              </a>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">About</h3>

          <p className="leading-7 text-slate-400">
            Built with React, Vite, Tailwind CSS and the TMDB API. Designed to
            deliver a fast, modern, and enjoyable movie discovery experience.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="mt-6 rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-[#EF5D12] hover:bg-[#EF5D12] hover:text-white"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-3 px-5 py-6 text-center md:flex-row">
          <p className="text-sm text-slate-500">
            © {year} WhyVerse. All Rights Reserved.
          </p>

          <p className="text-xs text-slate-600">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB. Streaming availability data is provided by JustWatch.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
