/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import { TextEditor } from "./components"; 
import { Home } from "./pages";
import { useUser } from "./contexts/userContext";
import { useEffect } from "react";

const App = () => {

  const { setUser } = useUser();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  }, []);

  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents/:id" element={<TextEditor />} />
    </Routes>
  );
}

export default App;