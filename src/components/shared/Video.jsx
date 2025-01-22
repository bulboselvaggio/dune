import React, { useState, useEffect, useRef } from 'react';

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false); // Stato per tracciare se l'iframe è caricato
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleVimeoMessage = (event) => {
      if (
        event.origin.includes('vimeo') &&
        event.data &&
        typeof event.data === 'string'
      ) {
        const data = JSON.parse(event.data);

        if (data.event === 'play') {
          setIsPlaying(true);
        } else if (data.event === 'pause') {
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('message', handleVimeoMessage);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !iframeLoaded) {
          // Carica l'iframe quando entra nel viewport
          setIframeLoaded(true);
        }
        if (entry.isIntersecting) {
          if (isPlaying && iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
              '{"method":"play"}',
              '*'
            );
          }
        } else {
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

    return () => {
      observer.disconnect();
      window.removeEventListener('message', handleVimeoMessage);
    };
  }, [isPlaying, iframeLoaded]);

  return (
    <div
      id="lazy-video"
      className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden border border-primary-500 dark:border-primary-400 relative"
    >
      {!iframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-lg">
          Video Loading...
        </div>
      )}
      {iframeLoaded && (
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src="https://player.vimeo.com/video/1048620180?badge=0&autopause=0&player_id=0&app_id=58479"
          allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{ border: 'none' }}
          title="Dune 70 - Trailer Ufficiale AI"
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
};

export default Video;
