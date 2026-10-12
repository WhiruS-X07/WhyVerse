import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-black text-white">
      <SiteHeader />

      <main className="w-full min-w-0 flex-1 pb-[calc(4.15rem+env(safe-area-inset-bottom))] xl:pb-0">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};

export default AppLayout;
