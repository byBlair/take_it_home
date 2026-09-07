import { useLocation, useNavigate } from "react-router-dom";

interface ResultState {
  score: number;
}

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ResultState | null;

  const score = state?.score ?? 0;

  return (
    <div>
      <h1>RESULT</h1>

      <h2>{score}점</h2>

      <button onClick={() => navigate("/game")}>
        다시 하기
      </button>

      <button onClick={() => navigate("/")}>
        홈으로
      </button>
    </div>
  );
}

export default Result;