import { useForm } from "react-hook-form";
// import useAuthentication from "../../hooks/useAuthentication";
import "./Login.css";
import { Users } from "../../utils/Users";
// import { useContext } from "react";
// import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuth } = useAuth();

  const [authError, setAuthError] = useState("");

  const onSubmit = (data) => {
    const user = Users.find((user) => user.username === data.username);
    if (user) {
      delete user.password;
      setAuth(user);
      localStorage.setItem("auth", JSON.stringify(user));
      navigate("/answers", { replace: true });
    } else {
      setAuthError("Email or Password is not correct.");
    }
  };

  // if (auth?.username) {
  //   navigate("/answers");
  //   return;
  // }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-pink-600">
                <small>Username is Required</small>
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-pink-600">
                <small>Password is Required</small>
              </span>
            )}
          </div>

          {authError && <div className="text-pink-600 mb-2">{authError}</div>}

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-pink-600 text-white p-2 rounded-md w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
