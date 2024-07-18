import React from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  return (
    <div className="container">
      <AudioPlayer audioSrc="./audio/When Will My Life Begin.mp3" />
    </div>
  );
}

export default App;
