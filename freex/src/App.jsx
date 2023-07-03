import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Layout,
  Home,
  Login,
  Register,
  MainPanel,
  MyOffers,
  AddOffer,
  Freelancers,
  Offers,
  PrivateRoute,
  InvalidAddress,
  UserProfile,
  Favorites,
  EditUserProfile,
} from "./components";
import Offer from "./components/Offer/Offer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Publiczne ściezki */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<InvalidAddress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ściezki prywatne */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/panelglowny" element={<MainPanel />} />
          <Route path="/mojeoferty" element={<MyOffers />} />
          <Route path="/dodajoferte" element={<AddOffer />} />
          <Route path="/freelancerzy" element={<Freelancers />} />
          <Route path="/freelancerzy/:userId" element={<UserProfile />} />
          <Route path="/zlecenia" element={<Offers />} />
          <Route path="/zlecenia/zlecenie/:zlecenieId" element={<Offer />} />
          <Route path="/profil/:userId" element={<UserProfile />} />
          <Route path="/edytujprofil" element={<EditUserProfile />} />
          <Route path="/ulubione" element={<Favorites />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
