import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import Questions from "./pages/Questions";
import Answers from "./pages/Answers";
import { ROLES } from "./utils/Roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="questions" element={<Questions />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="answers" element={<Answers />} />
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<>No route matched</>} />
      </Route>
    </Routes>
  );
}

export default App;
