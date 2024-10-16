import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import base CSS
import App from "./App"; // Import main App component
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider for authentication

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
