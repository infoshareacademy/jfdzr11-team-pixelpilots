import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Layout,
  Home,
  Login,
  Register,
  PanelGlowny,
  MojeOferty,
  DodajOferte,
  MojeZlecenia,
  ZnajdzZlecenie,
  PrivateRoute,
  InvalidAddress,
} from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Publiczne ściezki */}
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<InvalidAddress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ściezki prywatne */}
        <Route path="/userID" element={<PrivateRoute />}>
          <Route path="/userID/panelglowny" element={<PanelGlowny />} />
          <Route path="/userID/mojeoferty" element={<MojeOferty />} />
          <Route path="/userID/dodajoferte" element={<DodajOferte />} />
          <Route path="/userID/mojezlecenia" element={<MojeZlecenia />} />
          <Route path="/userID/znajdzzlecenie" element={<ZnajdzZlecenie />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
