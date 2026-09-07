import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

type Zone =
  | "INDIA"
  | "ASIA"
  | "AMERICA"
  | "KOREA"
  | "ITALY"
  | "JAPAN";

type Food = {
  id: number;
  name: string;
  image: string;
  answer: Zone;
};

// =========================
// 전체 국가 / 지역
// =========================

const allZones: Zone[] = [
  "INDIA",
  "ASIA",
  "AMERICA",
  "KOREA",
  "ITALY",
  "JAPAN",
];

// =========================
// 음식 데이터
// =========================

const foods: Food[] = [
  {
    id: 1,
    name: "Curry",
    image: "/images/curry_india.png",
    answer: "INDIA",
  },
  {
    id: 2,
    name: "Dongpa",
    image: "/images/dongpa_asia.png",
    answer: "ASIA",
  },
  {
    id: 3,
    name: "Gyoja",
    image: "/images/gyoja_asia.png",
    answer: "ASIA",
  },
  {
    id: 4,
    name: "Honey",
    image: "/images/honey_america.png",
    answer: "AMERICA",
  },
  {
    id: 5,
    name: "Japchae",
    image: "/images/japchae_korea.png",
    answer: "KOREA",
  },
  {
    id: 6,
    name: "Mala",
    image: "/images/mala_asia.png",
    answer: "ASIA",
  },
  {
    id: 7,
    name: "Pizza",
    image: "/images/pizza_italy.png",
    answer: "ITALY",
  },
  {
    id: 8,
    name: "Poti",
    image: "/images/poti_italy.png",
    answer: "ITALY",
  },
  {
    id: 9,
    name: "Sushi",
    image: "/images/sushi_japan.png",
    answer: "JAPAN",
  },
  {
    id: 10,
    name: "Tteokbokki",
    image: "/images/ttokbokki_korea.png",
    answer: "KOREA",
  },
];

// =========================
// 배열 랜덤 섞기
// =========================

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

// =========================
// 랜덤 음식 가져오기
// 바로 전 음식은 제외
// =========================

function getRandomFood(previousId?: number) {
  const availableFoods =
    previousId === undefined
      ? foods
      : foods.filter((food) => food.id !== previousId);

  const randomIndex = Math.floor(
    Math.random() * availableFoods.length
  );

  return availableFoods[randomIndex];
}

// =========================
// 정답을 포함한 4개 존 만들기
// =========================

function getRandomZones(correctAnswer: Zone) {
  // 정답을 제외한 나머지 존
  const wrongZones = allZones.filter(
    (zone) => zone !== correctAnswer
  );

  // 오답 존 섞기
  const shuffledWrongZones =
    shuffleArray(wrongZones);

  // 정답 1개 + 오답 3개
  const selectedZones = [
    correctAnswer,
    ...shuffledWrongZones.slice(0, 3),
  ];

  // 위치까지 랜덤으로 섞기
  return shuffleArray(selectedZones);
}

function Game() {
  const navigate = useNavigate();

  const boardRef =
    useRef<HTMLElement | null>(null);

  // =========================
  // 처음 문제 생성
  // =========================

  const [currentFood, setCurrentFood] =
    useState<Food>(() => getRandomFood());

  const [visibleZones, setVisibleZones] =
    useState<Zone[]>(() => {
      const firstFood = getRandomFood();

      return getRandomZones(firstFood.answer);
    });

  // =========================
  // 게임 상태
  // =========================

  const [timeLeft, setTimeLeft] =
    useState(30);

  const [level, setLevel] =
    useState(1);

  const [isDragging, setIsDragging] =
    useState(false);

  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  // =========================
  // 드래그 관련 ref
  // =========================

  const draggingRef =
    useRef(false);

  const dragStartRef =
    useRef({
      x: 0,
      y: 0,
    });

  const positionStartRef =
    useRef({
      x: 0,
      y: 0,
    });

  // =========================
  // 중요!
  // currentFood와 visibleZones
  // 첫 문제 정답 맞추기
  // =========================

  useEffect(() => {
    setVisibleZones(
      getRandomZones(currentFood.answer)
    );
  }, [currentFood]);

  // =========================
  // 30초 타이머
  // =========================

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/result", {
        state: {
          level: level,
          correctCount: level - 1,
        },
      });

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, level, navigate]);

  // =========================
  // 접시 잡기
  // =========================

  const handlePointerDown = (
    e: React.PointerEvent<HTMLImageElement>
  ) => {
    if (timeLeft <= 0) return;

    e.preventDefault();

    draggingRef.current = true;
    setIsDragging(true);

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
    };

    positionStartRef.current = {
      x: position.x,
      y: position.y,
    };

    e.currentTarget.setPointerCapture(
      e.pointerId
    );
  };

  // =========================
  // 접시 움직이기
  // =========================

  const handlePointerMove = (
    e: React.PointerEvent<HTMLImageElement>
  ) => {
    if (!draggingRef.current) {
      return;
    }

    e.preventDefault();

    const moveX =
      e.clientX -
      dragStartRef.current.x;

    const moveY =
      e.clientY -
      dragStartRef.current.y;

    setPosition({
      x:
        positionStartRef.current.x +
        moveX,

      y:
        positionStartRef.current.y +
        moveY,
    });
  };

  // =========================
  // 접시 놓기
  // =========================

  const handlePointerUp = (
    e: React.PointerEvent<HTMLImageElement>
  ) => {
    draggingRef.current = false;
    setIsDragging(false);

    const board =
      boardRef.current;

    if (!board) {
      return;
    }

    const boardRect =
      board.getBoundingClientRect();

    // =========================
    // 최종 접시 위치 계산
    // =========================

    const finalX =
      positionStartRef.current.x +
      (e.clientX -
        dragStartRef.current.x);

    const finalY =
      positionStartRef.current.y +
      (e.clientY -
        dragStartRef.current.y);

    // 접시 중심 위치
    const plateCenterX =
      boardRect.width / 2 +
      finalX;

    const plateCenterY =
      boardRect.height / 2 +
      finalY;

    // =========================
    // 게임판 밖
    // =========================

    if (
      plateCenterX < 0 ||
      plateCenterX >
        boardRect.width ||
      plateCenterY < 0 ||
      plateCenterY >
        boardRect.height
    ) {
      resetFoodPosition();
      return;
    }

    // =========================
    // 어느 칸인지 계산
    // =========================

    const halfWidth =
      boardRect.width / 2;

    const halfHeight =
      boardRect.height / 2;

    let zoneIndex = 0;

    // 왼쪽 위
    if (
      plateCenterX < halfWidth &&
      plateCenterY < halfHeight
    ) {
      zoneIndex = 0;
    }

    // 오른쪽 위
    else if (
      plateCenterX >= halfWidth &&
      plateCenterY < halfHeight
    ) {
      zoneIndex = 1;
    }

    // 왼쪽 아래
    else if (
      plateCenterX < halfWidth &&
      plateCenterY >= halfHeight
    ) {
      zoneIndex = 2;
    }

    // 오른쪽 아래
    else {
      zoneIndex = 3;
    }

    const selectedZone =
      visibleZones[zoneIndex];

    checkAnswer(selectedZone);
  };

  // =========================
  // Pointer 취소
  // =========================

  const handlePointerCancel = () => {
    draggingRef.current = false;

    setIsDragging(false);

    resetFoodPosition();
  };

  // =========================
  // 정답 확인
  // =========================

  const checkAnswer = (
    selectedZone: Zone
  ) => {
    const isCorrect =
      currentFood.answer ===
      selectedZone;

    // =========================
    // 오답
    // =========================

    if (!isCorrect) {
      resetFoodPosition();
      return;
    }

    // =========================
    // 정답
    // =========================

    setLevel(
      (prev) => prev + 1
    );

    // 현재 음식과 다른
    // 새로운 랜덤 음식
    const nextFood =
      getRandomFood(currentFood.id);

    setCurrentFood(nextFood);

    // 접시 중앙 복귀
    resetFoodPosition();
  };

  // =========================
  // 접시 중앙으로
  // =========================

  const resetFoodPosition = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  // =========================
  // 시간 표시
  // =========================

  const formattedTime =
    `00:${String(timeLeft).padStart(
      2,
      "0"
    )}`;

  return (
    <main className="game-page">

      {/* 상단 */}

      <section className="game-header">

        <div className="game-top-bar">

          <button
            className="back-button"
            onClick={() =>
              navigate("/")
            }
            aria-label="홈으로 돌아가기"
          >
            ‹
          </button>

          <span className="game-title">
            Drag Dish To Home!
          </span>

        </div>

        {/* 타이머 */}

        <div
          className={`timer ${
            timeLeft <= 5
              ? "warning"
              : ""
          }`}
        >
          {formattedTime}
        </div>

        {/* 레벨 */}

        <div className="level">
          Lv.
          {String(level).padStart(
            2,
            "0"
          )}
        </div>

      </section>

      {/* 게임판 */}

      <section
        className="game-board"
        ref={boardRef}
      >

        {/* 랜덤 4개 존 */}

        {visibleZones.map(
          (zone, index) => (
            <div
              key={`${zone}-${index}`}
              className={`country zone-${index}`}
            >
              {zone}
            </div>
          )
        )}

        {/* 음식 접시 */}

        <img
          src={currentFood.image}
          alt={currentFood.name}
          draggable={false}
          className={`game-food ${
            isDragging
              ? "dragging"
              : ""
          }`}
          style={{
            transform: `translate(
              calc(-50% + ${position.x}px),
              calc(-50% + ${position.y}px)
            )`,
          }}
          onPointerDown={
            handlePointerDown
          }
          onPointerMove={
            handlePointerMove
          }
          onPointerUp={
            handlePointerUp
          }
          onPointerCancel={
            handlePointerCancel
          }
        />

      </section>

    </main>
  );
}

export default Game;