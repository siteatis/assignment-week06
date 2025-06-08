// Really, Image is just part of ImageGallery, so it could be a private
// component. But I split it out anyway, partly because Manny told us to
// show we know to separate our components into separate files for this
// assignment, and partly as I might add something later in stretch goals
// that might use it separately. Logically it's independent of ImageGallery,
// so there's nothing to discourage me from coding it as separate.
import { Image } from "./Image";

export function ImageGallery({ images, switchTo }) {
  return (
    <div className="gallery">
      {images.map((img, idx) => (
        <Image
          key={img.id}
          // Fall back from Tech Ed to Unsplash properties where necessary
          // TODO: Duplication - fallbacks are done in two places and
          // TODO: should be encapsulated somewhere else
          url={img.url || img.urls.regular}
          alt={img.alt || img.alt_description}
          title={img.title || img.alt_description}
          onClick={() => switchTo(idx)}
        />
      ))}
    </div>
  );
}
