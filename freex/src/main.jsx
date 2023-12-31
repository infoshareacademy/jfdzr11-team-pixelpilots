import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import { CurrentUserDataProvider } from "./components/Context/CurrentUserDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CurrentUserDataProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </CurrentUserDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
