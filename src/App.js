import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={""} />
      </Routes>
    </div>
  );
}

export default App;
