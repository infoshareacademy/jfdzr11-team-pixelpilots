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
} from "./components";

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
        <Route element={<PrivateRoute />}>
          <Route path="/userID/panelglowny" element={<MainPanel />} />
          <Route path="/userID/mojeoferty" element={<MyOffers />} />
          <Route path="/userID/dodajoferte" element={<AddOffer />} />
          <Route path="/userID/freelancerzy" element={<Freelancers />} />
          <Route path="/userID/zlecenia" element={<Offers />} />
          <Route path="/userID/profil" element={<UserProfile />} />
          <Route path="/userID/ulubione" element={<Favorites />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
