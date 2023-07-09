import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Layout,
  Home,
  Login,
  Register,
  MyOffers,
  AddOffer,
  Freelancers,
  Offers,
  PrivateRoute,
  InvalidAddress,
  UserProfile,
  Favorites,
  EditUserProfile,
  ForgotPassword,
  MyOfferDetails,
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
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* Ściezki prywatne */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/mojeoferty" element={<MyOffers />} />
          <Route path="/mojeoferty/:ofertaid" element={<MyOfferDetails />} />
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
