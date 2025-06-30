import React, { useRef, useState } from "react";
import Video from "./Video";
import Botones from "./Botones";
import "./Anuncio.css";

import rewindIcon from "../assets/preview.png";
import playIcon from "../assets/play.png";
import pauseIcon from "../assets/pause.png";
import forwardIcon from "../assets/next.png";
import muteIcon from "../assets/silencio.png";
import soundIcon from "../assets/volumen.png";

function Anuncio() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [overlayImage, setOverlayImage] = useState(null);

  // ✅ Muestra la imagen en el overlay temporalmente
  const mostrarOverlay = (imagen) => {
    setOverlayImage(imagen);
    setTimeout(() => setOverlayImage(null), 700);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
        mostrarOverlay(playIcon);
      } else {
        video.pause();
        setIsPlaying(false);
        mostrarOverlay(pauseIcon);
      }
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const handleRewind = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 4);
      mostrarOverlay(rewindIcon);
    }
  };

  const handleForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 4);
      mostrarOverlay(forwardIcon);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      mostrarOverlay(video.muted ? muteIcon : soundIcon);
    }
  };

  return (
    <div className="anuncio-container">
      <Video ref={videoRef} onVideoClick={handleVideoClick} />

      {overlayImage && (
        <div className="overlay show">
          <img src={overlayImage} alt="acción" className="overlay-img" />
        </div>
      )}

      <Botones
        onPlayPause={handlePlayPause}
        onRewind={handleRewind}
        onForward={handleForward}
        onToggleMute={handleToggleMute}
        isMuted={isMuted}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default Anuncio;
