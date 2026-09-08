import { useNavigate } from "react-router-dom";
import "./Ranking.css";

type RankItem = {
  rank: number;
  name: string;
  score: number;
};

const rankingData: RankItem[] = [
  {
    rank: 4,
    name: "민경네버다이..",
    score: 28,
  },
  {
    rank: 4,
    name: "은지",
    score: 28,
  },
  {
    rank: 6,
    name: "뚜니",
    score: 27,
  },
  {
    rank: 7,
    name: "안녕하세요",
    score: 26,
  },
  {
    rank: 7,
    name: "테이크아웃",
    score: 26,
  },
];

function Ranking() {
  const navigate = useNavigate();

  return (
    <main className="ranking-page">
      {/* 상단 */}
      <header className="ranking-header">
        <button
          className="ranking-back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ‹
        </button>

        <h1 className="ranking-title">
          RANKING
        </h1>
      </header>

      {/* 내 기록 */}
      <section className="my-record-section">
        <h2 className="section-title">
          내 기록
        </h2>

        <div className="my-record-card">
          <span className="my-rank">
            7위
          </span>

          <span className="best-score-text">
            best score
          </span>

          <strong className="best-score-number">
            26
          </strong>
        </div>
      </section>

      <div className="ranking-divider" />

      {/* 전체 랭킹 */}
      <section className="all-ranking-section">
        <div className="ranking-section-header">
          <h2 className="section-title">
            전체 랭킹
          </h2>

          <div className="ranking-filter">
            <select
              className="ranking-select"
              defaultValue="7월 집계"
            >
              <option>7월 집계</option>
              <option>6월 집계</option>
              <option>5월 집계</option>
            </select>

            <span className="ranking-date">
              26/07/01 - 26/07/31
            </span>
          </div>
        </div>

        {/* TOP 3 */}
        <div className="top-ranking">
          <div className="top-user second">
            <span className="top-rank-badge">
              2위
            </span>

            <div className="top-circle">
              30
            </div>

            <span className="top-name">
              떠
            </span>
          </div>

          <div className="top-user first">
            <span className="top-rank-badge first-badge">
              1위
            </span>

            <div className="top-circle first-circle">
              32
            </div>

            <span className="top-name">
              나옹
            </span>
          </div>

          <div className="top-user third">
            <span className="top-rank-badge">
              3위
            </span>

            <div className="top-circle">
              29
            </div>

            <span className="top-name">
              흐르
            </span>
          </div>
        </div>

        {/* 4위 이하 */}
        <div className="ranking-list">
          {rankingData.map(
            (item, index) => (
              <div
                className="ranking-item"
                key={`${item.name}-${index}`}
              >
                <span className="list-rank">
                  {item.rank}위
                </span>

                <span className="list-name">
                  {item.name}
                </span>

                <strong className="list-score">
                  {item.score}
                </strong>
              </div>
            )
          )}
        </div>
      </section>

      <button
        className="ranking-retry-button"
        onClick={() => navigate("/game")}
      >
        게임 한판 더 하기!
      </button>
    </main>
  );
}

export default Ranking;