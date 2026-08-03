import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  const location = useLocation();
  const isProblemPage = location.pathname.startsWith("/problem/");

  return (
    <>
      <Navbar />

      <main className={isProblemPage ? "h-[calc(100vh-4rem)]" : "min-h-screen"}>
        <Outlet />
      </main>

      {!isProblemPage && <Footer />}
    </>
  );
}

export default MainLayout;