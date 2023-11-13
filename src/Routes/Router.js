import { Routes, Route } from "react-router-dom";

import Header from "../Components/Header";
import Home from "../Pages/Home";
import Tournament from "../Pages/Tournament";
import Tournaments from "../Pages/Tournaments";
import Profile from "../Pages/Profile";
import TournamentDetail from "../Pages/TournamentDetail";
import EditTournament from "../Pages/TournamentEdit";

function Router() {
  return (
    <div className="relative h-[100%]">
      <Header />
      <div className="content pt-[70px] h-[100%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
          <Route path="/tournament/edit/:id" element={<EditTournament />} />
        </Routes>
      </div>
    </div>
  );
}

export default Router;
