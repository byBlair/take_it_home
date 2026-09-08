import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Popup from "../components/Popup";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] =
    useState(false);

  return (
    <main className="home">
      {/* 도움말 버튼 */}
      <button
        className="help-button"
        onClick={() => setIsPopupOpen(true)}
      >
        ?
      </button>

      <img
        src="/images/italy.png"
        alt="Italy food"
        className="food food-top"
      />

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

      <button
        className="ranking-button"
        onClick={() => navigate("/ranking")}
      >
        Ranking
      </button>

      <img
        src="/images/korean.png"
        alt="Korean food"
        className="food food-bottom"
      />

      {/* 팝업 */}
      {isPopupOpen && (
        <Popup
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </main>
  );
}

export default Home;