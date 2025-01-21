import React, { useState, useEffect } from 'react';

const Video = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#lazy-video');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="lazy-video" className="aspect-w-16 aspect-h-9 w-full rounded-3xl overflow-hidden">
      {isVisible ? (
        <iframe
          className="w-full h-full"
          src="https://player.vimeo.com/video/1048620180?badge=0&autopause=0&player_id=0&app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{ border: 'none' }}
          title="Dune 70 - Trailer Ufficiale AI"
          loading="lazy"
        ></iframe>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-800 text-white text-lg">
          Video Loading...
        </div>
      )}
    </div>
  );
};

export default Video;
