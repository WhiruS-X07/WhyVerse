import { Outlet } from "react-router-dom";
import { Header, Footer } from "../pages/pages";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
