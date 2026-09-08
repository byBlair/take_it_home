import "./Popup.css";

type PopupProps = {
  onClose: () => void;
};

function Popup({ onClose }: PopupProps) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2 className="popup-title">
          How To Play
        </h2>

        {/* 게임 설명 이미지 */}
        <img
          src="/images/popup.png"
          alt="게임 방법"
          className="popup-image"
        />

        <p className="popup-main-text">
          접시에 담긴 음식을 확인한 후,
          <br />
          해당 음식이 속한 존으로 드래그
          <span className="haseyo"> 하세요!</span>
        </p>

        <p className="popup-sub-text">
          제한시간 동안 최대한 많은 음식을 정확하게 분류해
          <br />
          높은 점수와 랭킹에 도전하세요!
        </p>

        <button
          className="popup-confirm-button"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default Popup;