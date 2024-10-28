import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CustomThemeProvider } from "./design-system/themes/theme";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import "./App.css";

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
