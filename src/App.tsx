import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login";
import RequireAuth from "./routes/RequireAuth";
import Questions from "./pages/Questions";
import Answers from "./pages/Answers";
import Home from "./pages/Home"; 
import { ROLES } from "./utils/Roles";
import "./App.css";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="answers" element={<Answers />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/" element={<Home />} />
          <Route path="questions" element={<Questions />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
