import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h2 className="text-xl font-extrabo text-center">
          Hello{" "}
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
            {auth.username}
          </span>
        </h2>
        <p className="text-center">
          Welcome to quiz app. Hope you will love it !
        </p>
      </div>
    </div>
  );
};

export default Home;
