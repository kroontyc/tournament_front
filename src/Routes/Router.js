import { Routes, Route } from "react-router-dom";

import Header from "../Components/Header";
import Home from "../Pages/Home";
import Tournament from "../Pages/Tournament";

function Router() {
  return (
    <div className="relative h-[100%]">
      <Header />
      <div className="content pt-[70px] h-[100%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament" element={<Tournament />} />
        </Routes>
      </div>
    </div>
  );
}

export default Router;
