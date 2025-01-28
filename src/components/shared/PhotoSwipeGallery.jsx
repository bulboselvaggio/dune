import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

// Funzione per estrarre larghezza e altezza dall'URL
function extractDimensionsFromURL(url) {
  const dimensionString = url.split('/')[5];
  const dimensions = dimensionString.split('x');
  return {
    width: parseInt(dimensions[0], 10),
    height: parseInt(dimensions[1], 10),
  };
}

const PhotoSwipeGallery = ({ posters }) => {
  useEffect(() => {
    // Caricamento dinamico del CSS
    const loadCSS = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/photoswipe@5.3.3/dist/photoswipe.css';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    };

    // Inizializza PhotoSwipe Lightbox
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#poster-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
      preload: [1, 1], // Precarica una immagine prima e una dopo quella corrente
    });

    lightbox.init();
    const removeCSS = loadCSS();

    return () => {
      lightbox.destroy();
      removeCSS(); // Rimuovi il CSS quando il componente viene smontato
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Griglia Locandine */}
      <div id="poster-gallery" className="grid gap-8 lg:grid-cols-3">
        {posters.map((poster, index) => {
          const baseSrc = poster.src.split('/m/')[0];
          const { width, height } = extractDimensionsFromURL(poster.src);

          return (
            <a
              key={index}
              href={`${baseSrc}/m/1600x0`}
              data-pswp-width={width}
              data-pswp-height={height}
              data-pswp-srcset={` 
                ${baseSrc}/m/700x0 700w,
                ${baseSrc}/m/1000x0 1000w,
                ${baseSrc}/m/1600x0 1600w
              `}
              className={`block ${
                index < 3 ? 'visible' : 'hidden'
              } bg-primary-500/10 dark:bg-primary-400/10 rounded-lg overflow-hidden`}
            >
              <picture>
                <source
                  srcSet={`${baseSrc}/m/360x0/filters:format(avif)`}
                  type="image/avif"
                  media="(max-width: 768px)"
                />
                <source
                  srcSet={`${baseSrc}/m/360x0/filters:format(webp)`}
                  type="image/webp"
                  media="(max-width: 768px)"
                />
                <img
                  src={`${baseSrc}/m/360x0/filters:format(webp)`}
                  alt={poster.alt}
                  width="360"
                  height="540"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </picture>
            </a>
          );
        })}
      </div>

      {/* Bottone Guarda Tutto */}
      <div className="flex justify-center">
        <button
          className="bg-primary-600 dark:bg-primary-400 hover:bg-primary-700 dark:hover:bg-primary-300 focus-visible:outline-primary-600 dark:focus-visible:outline-primary-400 dark:text-primary-950 inline-flex items-center justify-center rounded-full border border-transparent px-5 py-3 text-base font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => {
            const firstLink = document.querySelector('#poster-gallery a');
            if (firstLink) firstLink.click();
          }}
        >
          Guarda Tutto
        </button>
      </div>
    </div>
  );
};

export default PhotoSwipeGallery;
