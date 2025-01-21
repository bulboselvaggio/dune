import React from 'react';

const HeroVideo = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-center gap-12 sm:gap-16">
          {/* Titolo e Descrizione Centrati */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 py-16 lg:py-64">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl text-center">
              2070
            </h2>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl text-center text-white">
              La Terra è un deserto sotto il controllo dell'Intelligenza Artificiale che ha un solo obiettivo...
            </h1>
          </div>

          {/* Video Vimeo Embeddato */}
          <div
            id="hero-video-anchor"
            className="aspect-w-16 aspect-h-9 w-full rounded-3xl overflow-hidden"
          >
            <iframe
              className="w-full h-full"
              src="https://player.vimeo.com/video/1048620180?badge=0&autopause=0&player_id=0&app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ border: "none" }}
              title="Dune 70 - Trailer Ufficiale AI"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
