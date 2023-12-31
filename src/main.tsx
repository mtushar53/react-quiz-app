import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ServiceProvider } from "./context/ServiceProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ServiceProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ServiceProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
