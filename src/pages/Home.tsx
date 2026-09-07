import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      {/* 도움말 */}
      <button className="help-button">?</button>

      {/* 왼쪽 위 음식 */}
      <img
        src="/images/italy.png"
        alt="Italy food"
        className="food food-top"
      />

      {/* 중앙 */}
      <section className="home-content">
        <img
          src="/images/logo.png"
          alt="Take it Home"
          className="home-logo"
        />

        <button
          className="start-button"
          onClick={() => navigate("/game")}
        >
          GAME START!
        </button>
      </section>

      {/* 랭킹 */}
      <button
        className="ranking-button"
        onClick={() => navigate("/ranking")}
      >
        Ranking
      </button>

      {/* 오른쪽 아래 음식 */}
      <img
        src="/images/korean.png"
        alt="Korean food"
        className="food food-bottom"
      />
    </main>
  );
}

export default Home;