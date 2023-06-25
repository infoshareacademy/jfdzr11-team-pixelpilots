import { useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <h2>Home</h2>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Zaloguj się</button>
          <p>Nie masz jeszcze konta?</p>
          <button onClick={() => navigate("/register")}>Zarejestruj się</button>
        </>
      )}
    </div>
  );
};

export default Home;
