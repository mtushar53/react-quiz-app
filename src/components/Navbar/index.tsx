import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { auth, setAuth, isAdmin } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    if (menuRef?.current) {
      menuRef.current.classList.toggle("hidden");
    }
  };

  return (
    <header className="sticky top-0 shadow-md">
      <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 md:px-24 text-lg text-gray-700 bg-white">
        <div>
          <Link to="/">
            <div className="grid place-items-center">
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                Quizzy
              </h1>
            </div>
          </Link>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={toggleMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          ref={menuRef}
        >
          <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
            {!!auth?.username && isAdmin && (
              <li>
                <Link
                  className={`md:p-4 py-2 block hover:text-purple-500 ${
                    location.pathname.includes("questions") && "active"
                  }`}
                  to="/questions"
                >
                  Questions
                </Link>
              </li>
            )}

            {!!auth?.username && (
              <li>
                <Link
                  className={`md:p-4 py-2 block hover:text-purple-500 ${
                    location.pathname.includes("answers") && "active"
                  }`}
                  to="/answers"
                >
                  Answers
                </Link>
              </li>
            )}

            {auth?.username ? (
              <li className="flex items-center py-3">
                <button
                  className="block hover:text-white text-pink-500 h-8 px-4 border border-pink-500 rounded-md hover:bg-gradient-to-r from-purple-500 to-pink-600"
                  onClick={() => {
                    localStorage.removeItem("auth");
                    setAuth(null);
                    navigate("/login");
                  }}
                >
                  Sign out
                </button>
              </li>
            ) : (
              <li className="flex items-center py-3">
                <Link
                  className="block hover:text-white text-pink-500 h-8 px-4 border border-pink-500 rounded-md hover:bg-gradient-to-r from-purple-500 to-pink-600"
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
