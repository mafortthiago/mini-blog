import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, [auth]);
  if (loadingUser) {
    return <p>carregando...</p>;
  }
  return (
    <>
      <AuthContextProvider value={user}>
        <BrowserRouter>
          <Navbar />
          <div className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
