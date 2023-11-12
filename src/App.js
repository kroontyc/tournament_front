import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Router from "./Routes/Router";

function App() {
  return (
    <div className="relative h-[100%]">
      <Router />
    </div>
  );
}

export default App;
