import React, { useState, useEffect, useRef } from 'react';

const Video = () => {
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Inizia o riprendi il video
          if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
              '{"method":"play"}',
              '*'
            );
          }
        } else {
          // Metti in pausa il video
          if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
              '{"method":"pause"}',
              '*'
            );
          }
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#lazy-video');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="lazy-video" className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
      {isVisible ? (
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src="https://player.vimeo.com/video/1048620180?badge=0&autopause=0&player_id=0&app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{ border: 'none' }}
          title="Dune 70 - Trailer Ufficiale AI"
          loading="lazy"
        ></iframe>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-800 dark:bg-gray-900 text-gray-900 dark:text-white text-lg">
          Video Loading...
        </div>
      )}
    </div>
  );
};

export default Video;
