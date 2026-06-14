import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function AuthLayout() {

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white">
      <nav className="sticky top-0 left-0 w-full z-50 px-10 pt-8 flex items-center">
        <Link to="/" className="flex items-center gap-3  text-primaryText/70 hover:text-primaryText transition" >
          <span className="text-xl"> ← </span>
          <span className="font-cinzel tracking-[0.25em] text-lg uppercase"> Back </span>
        </Link>
      </nav>
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
