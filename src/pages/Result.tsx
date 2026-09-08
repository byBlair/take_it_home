import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

type ResultState = {
  level: number;
  correctCount: number;
};

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as ResultState | null;

  const correctCount =
    state?.correctCount ?? 0;

  return (
    <main className="result-page">
      <header className="result-header">
        <button
          className="result-back-button"
          onClick={() => navigate("/game")}
          aria-label="뒤로 돌아가기"
        >
          ‹
        </button>

        <h1 className="result-title">
          SCORE
        </h1>
      </header>
      
      {/* back 이미지 */}
      <img
        src="/images/pizza_italy.png"
        alt=""
        className="result-food result-pizza"
      />


      {/* 가운데 점수 접시 */}
      <section className="score-area">
        <div className="score-plate">
          <img
            src="/images/score_plate.png"
            alt="Score plate"
            className="score-plate-image"
          />

          <div className="score-text">
            <span className="score-label">
              score
            </span>

            <strong className="score-number">
              {correctCount}
            </strong>
          </div>
        </div>
      </section>

      {/* back 이미지 */}
      <img
        src="/images/gyoja_asia.png"
        alt=""
        className="result-food result-gyoja"
      />
      <img
        src="/images/chicken.png"
        alt=""
        className="result-food result-chicken"
      />
      <button
        className="ranking-result-button"
        onClick={() => navigate("/ranking")}
      >
        내 순위 보러가기
      </button>
    </main>
  );
}

export default Result;