import SignUp from "./screens/SignUp.tsx";
import SignIn from "./screens/SignIn.tsx";
import { Routes, Route } from "react-router"
import Home from "./screens/Home.tsx";
import { useNavigate } from "react-router-dom";
import { verifyAuth } from "./utils/auth.ts";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const checkAuth = async () => {
      const isAuth = await verifyAuth();
      if (!isAuth) {
          navigate("/signin");
      } else {
        navigate('/');
      }
  };

  useEffect(() => {
      checkAuth();
  }, []);


  return (
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
          </Routes>
  )
}

export default App
