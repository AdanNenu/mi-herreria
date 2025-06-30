import React, { forwardRef, useEffect, useState } from "react";
import "./Video.css";

import miVideo from "../assets/video.mp4";
import miVideoH from "../assets/videoh.mp4";

const Video = forwardRef(({ onVideoClick }, ref) => {
  // ✅ Aquí adentro van tus hooks y lógica
  const [videoSrc, setVideoSrc] = useState(miVideo);

  const elegirVideo = () => {
    const isLandscape = window.innerWidth > window.innerHeight;
    const seleccionado = isLandscape ? miVideoH : miVideo;
    setVideoSrc(seleccionado);
  };

  useEffect(() => {
    elegirVideo();
    window.addEventListener("resize", elegirVideo);
    return () => window.removeEventListener("resize", elegirVideo);
  }, []);

  return (
    <div className="video-container" onClick={onVideoClick}>
      <video
        ref={ref}
        src={videoSrc}
        className="video-element " // <-- Ojo, cambia esto si sigues la recomendación anterior
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
});

export default Video;
