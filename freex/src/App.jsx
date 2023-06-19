import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Layout,
  Home,
  Login,
  Register,
  ProfilUzytkownika,
  MojeOferty,
  DodajOferte,
  MojeZlecenia,
  ZnajdzZlecenie,
  PrivateRoute,
} from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Publiczne ściezki */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ściezki prywatne */}
        <Route element={<PrivateRoute />}>
          <Route path="/:userId" element={<ProfilUzytkownika />} />
          <Route path="/:userId/mojeoferty" element={<MojeOferty />} />
          <Route path="/:userId/dodajoferte" element={<DodajOferte />} />
          <Route path="/:userId/mojezlecenia" element={<MojeZlecenia />} />
          <Route path="/:userId/znajdzzlecenie" element={<ZnajdzZlecenie />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
