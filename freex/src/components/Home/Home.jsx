import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => navigate("/login")}>Zaloguj się</button>
      <p>Nie masz jeszcze konta?</p>
      <button onClick={() => navigate("/register")}>Zarejestruj się</button>
    </div>
  );
};

export default Home;
