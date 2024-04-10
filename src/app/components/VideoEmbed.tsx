"use client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface EmbedVideoProps {
  videoId: string;
  width: number;
  height: number;
}

const EmbedVideo = ({ videoId, width, height }: EmbedVideoProps) => {
  const [publicId, setPublicId] = useState("");
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView === true) {
      setPublicId(videoId);
    }
  }, [inView, videoId]);

  return (
    <div ref={ref}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbedVideo;
