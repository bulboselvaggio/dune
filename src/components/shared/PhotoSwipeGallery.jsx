import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

const PhotoSwipeGallery = ({ posters }) => {
  useEffect(() => {
    // Importa dinamicamente il CSS di PhotoSwipe
    import('photoswipe/style.css').then(() => {
      const lightbox = new PhotoSwipeLightbox({
        gallery: '#poster-gallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();

      return () => {
        lightbox.destroy();
      };
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Griglia Locandine */}
      <div id="poster-gallery" className="grid gap-8 lg:grid-cols-3">
        {posters.slice(0, 3).map((poster, index) => {
          const baseSrc = poster.src.split('/m/')[0]; // URL base senza modifiche

          return (
            <a
              key={index}
              href={`${baseSrc}/m/2560x3840/filters:format(webp)`} // URL immagine grande in formato WebP
              data-pswp-width="2560"
              data-pswp-height="3840"
              target="_blank"
              className="block bg-primary-500/10 dark:bg-primary-400/10 rounded-3xl overflow-hidden"
            >
              <picture>
                <source
                  srcSet={`${baseSrc}/m/600x900/filters:format(avif)`}
                  type="image/avif"
                  media="(max-width: 768px)"
                />
                <source
                  srcSet={`${baseSrc}/m/600x900/filters:format(webp)`}
                  type="image/webp"
                  media="(max-width: 768px)"
                />
                <img
                  src={`${baseSrc}/m/600x900/filters:format(webp)`}
                  alt={poster.alt}
                  className="w-full h-auto object-cover"
                  loading={index > 2 ? 'lazy' : 'eager'}
                />
              </picture>
              <p className="mt-2 text-center text-sm">{poster.title}</p>
            </a>
          );
        })}
      </div>

      {/* Bottone Guarda Tutto */}
      <button
        className="bg-primary-600 dark:bg-primary-400 hover:bg-primary-700 dark:hover:bg-primary-300 text-white px-5 py-3 rounded-full text-base font-medium transition"
        onClick={() => {
          const firstLink = document.querySelector('#poster-gallery a');
          if (firstLink) firstLink.click();
        }}
      >
        Guarda Tutto
      </button>
    </div>
  );
};

export default PhotoSwipeGallery;
