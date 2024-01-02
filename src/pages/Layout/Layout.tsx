import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <main className="App">
      <Navbar />
      <Outlet />
      <ToastContainer theme="colored" hideProgressBar autoClose={3000} />
    </main>
  );
};

export default Layout;
