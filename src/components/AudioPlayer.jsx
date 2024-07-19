import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioSrc }) => {
  //오디오가 재생 중인지 정지 상태인지 확인
  const [isPlaying, setIsPlaying] = useState(false);

  //오디오의 현재 재생 시간 추적
  const [currentTime, setCurrentTime] = useState(0);

  //오디오의 총 재생 시간을 저장
  const [duration, setDuration] = useState(0);

  //오디오 요소
  const audioRef = useRef(null);

  //오디오 트랙에서 특정 시간을 탐색
  const handleSeek = (e) => {
    //범위 입력 값에 따라 오디오의 현재 시간을 업데이트
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
    
};
 
  //오디오의 현재 시간과 지속 시간을 업데이트
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  //컴포넌트가 마운트될 때와 언마운트 될 때 이벤트 리스너를 추가/제거
  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    //언마운트
    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  //mm:ss 형식으로 바꾸기
  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  //오디오 재생
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  //오디오 정지
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  //오디오 재생/정지 토글
  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div className="player-card">
      <img src="./asset/thumb.jpg" alt="Cover Image" />

      <h3>When Will My Life Begin?</h3>

      <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />

      {/* 오디오  */}
      <audio ref={audioRef} src={audioSrc} />

      <div className="control">
        <div className="btnArea">
          <button>
            <img src={process.env.PUBLIC_URL + "/asset/preBtn.svg"} style={{ width: "16px" }} />
          </button>

          {/* 재생/정지 버튼 */}
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <img src={process.env.PUBLIC_URL + "/asset/pauseBtn.svg"} style={{ width: "28px" }} />
            ) : (
              <img src={process.env.PUBLIC_URL + "/asset/playBtn.svg"} style={{ width: "28px" }} />
            )}
          </button>

          <button>
            <img src={process.env.PUBLIC_URL + "/asset/nextBtn.svg"} style={{ width: "16px" }} />
          </button>
        </div>
        <div className="track-duration">
          <p>{formatDuration(currentTime)}</p>
          <p>{formatDuration(duration)}</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
