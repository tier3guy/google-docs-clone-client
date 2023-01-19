import { Routes, Route, useNavigate } from "react-router-dom";
import { TextEditor } from "./components"; 
import { useEffect } from "react";
import { nanoid } from "nanoid";

const App = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const location = window.location.pathname;
    if (location === "/") {
      navigate(`/documents/${nanoid()}`);
    }
  }, []);

  return(
    <Routes>
      <Route path="/documents/:id" element={<TextEditor />} />
    </Routes>
  );
}

export default App;