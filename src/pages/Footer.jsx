const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#000000]">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">
        {/* Logo & About */}
        <div className="max-w-sm">
          <h2 className="text-3xl font-black text-white">
            Why<span className="text-[#EF5D12]">Verse</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Explore thousands of movies, TV shows, and anime in one place.
            Discover trending titles, timeless classics, and your next favorite
            story.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Explore
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>
              <a href="/" className="transition hover:text-[#EF5D12]">
                Home
              </a>
            </li>

            <li>
              <a href="/movies" className="transition hover:text-[#EF5D12]">
                Movies
              </a>
            </li>

            <li>
              <a href="/tvshows" className="transition hover:text-[#EF5D12]">
                TV Shows
              </a>
            </li>

            <li>
              <a href="/anime" className="transition hover:text-[#EF5D12]">
                Anime
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Resources
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#EF5D12]"
              >
                TMDB
              </a>
            </li>

            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#EF5D12]"
              >
                React
              </a>
            </li>

            <li>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#EF5D12]"
              >
                Tailwind CSS
              </a>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            About
          </h3>

          <p className="text-slate-400">
            Built with ❤️ using React, Vite, Tailwind CSS, and the TMDB API.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6">
        <p className="text-center text-sm text-slate-500">
          © {year} WhyVerse. All Rights Reserved.
        </p>

        <p className="mt-2 text-center text-xs text-slate-600">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;