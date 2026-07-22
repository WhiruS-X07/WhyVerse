# 🎬 WhyVerse

WhyVerse is a modern movie and TV discovery web application built with **React**, **Vite**, and **Tailwind CSS**. It uses **The Movie Database (TMDB) API** to provide users with an engaging interface for exploring movies, TV shows, and popular people in the entertainment industry.

> 🚧 **Project Status:** This project is currently under active development. More features, pages, and improvements will be added in future updates.

---

## ✨ Features Implemented

### 🏠 Home Page
- Hero banner showcasing featured content
- Multiple categorized content rows
- Horizontally scrollable movie and TV cards
- Responsive design for desktop and mobile

### 🎥 Movies
- Popular Movies
- Now Playing Movies
- Top Rated Movies
- Upcoming Movies

### 📺 TV Shows
- Popular TV Shows
- Airing Today
- Top Rated TV Shows
- Currently Airing Shows

### 👥 People
- Browse popular actors, actresses, directors, and creators
- Dedicated people cards with profile images
- Display known department and notable works

### 📄 Details Pages
- Individual movie details
- Individual TV show details
- Person details page
- Dynamic routing using React Router

### 🎨 UI & UX
- Modern dark-themed interface
- Fully responsive layout
- Smooth hover animations
- Reusable card components
- Clean section headers with custom icons
- Optimized layouts for different screen sizes

---

## 🛠️ Technologies Used

- React
- Vite
- Tailwind CSS 
- React Router DOM
- TMDB API

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Card.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── HeroBanner.jsx
│   ├── PeopleCard.jsx
│   └── Row.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Movies.jsx
│   ├── TVShows.jsx
│   ├── People.jsx
│   ├── Details.jsx
│   ├── PersonDetails.jsx
│   └── Layout.jsx
│
├── services/
│   ├── api.js
│   ├── Movies.js
│   ├── TVShows.js
│   ├── People.js
│   └── Details.js
│
├── main.jsx
└── App.jsx
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/whyverse.git
```

### Navigate to the project

```bash
cd whyverse
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
VITE_TMDB_TOKEN=YOUR_TMDB_BEARER_TOKEN
```

### Start the development server

```bash
npm run dev
```

---

## 📸 Current Highlights

- Responsive movie discovery platform
- TMDB API integration
- Dynamic routing
- Modern UI with Tailwind CSS
- Reusable React components
- Multiple movie, TV, and people categories
- Detail pages for movies, TV shows, and people

---

## 🔜 Planned Features

Some features planned for upcoming updates include:

- Search functionality
- Watchlist/Favorites
- Genre filtering
- Pagination / Infinite scrolling
- Trailers and videos
- Cast & crew information
- Similar and recommended content
- Better loading skeletons
- Error handling improvements
- Performance optimizations
- Authentication (optional)
- Additional UI enhancements

---

## 🙏 Acknowledgements

- **The Movie Database (TMDB)** for providing the API.
- Built with **React**, **Vite**, and **Tailwind CSS**.

---

## 📄 License

This project is created for learning and portfolio purposes.
