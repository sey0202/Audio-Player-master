import React, { useRef, useState } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ audioSrc }) => {
  //플레이어의 현재 상태와 현재 시간
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  //오디오 트랙에서 구체적인? 특정? 시간을 탐색
  const handleSeek = (e) => {};

  //플레이
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  // 정지
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  //재생 버튼과 정지 버튼 토글 기능
  const handlePlayPause = () => {
    if(isPlaying){
        handlePause();
    }else{
        handlePlay();
    }
  };

  return (
    <div className="player-card">
      <img src="" alt="Cover Image" />
      {/* 오디오 트랙 */}
      <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />

      {/* 오디오를 실행하기 위한 <audio> 태그 */}
      <audio ref={audioRef} src={audioSrc}/>

      {/* 현재시간 및 전체 duration */}
      <div className="track-duration">
        <p>{currentTime}</p>
        <p>{duration}</p>
      </div>

      {/* 재생, 정지 버튼 토글되어야 함 */}
      <button onClick={handlePlayPause}>
        <span>{isPlaying ? "⏸️" : "▶️"}</span>
      </button>
    </div>
  );
};

export default AudioPlayer;
