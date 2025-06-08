import { useState, useEffect } from "react";
import "./App.css";

import { ImageGallery } from "./components/ImageGallery";
import { FrogSearch } from "./components/FrogSearch";
import { SlideButton } from "./components/SlideButton";

function useImagesFromTechEdAPI() {
  const [images, setImages] = useState(); // Leave undefined, to tell App we're still loading
  useEffect(() => {
    (async () => {
      setImages(
        await (await fetch(import.meta.env.VITE_TECHED_FROGS_URL)).json()
      );
      // Note: fields for frogs are: id, url, title, alt
      // Note: fields for unsplash include: id, urls.regular, alt_description
      // Note: id's of Tech Ed and Unsplash frogs don't overlap, so can be merged 'as is'
    })();
  }, []);
  return images;
}

export default function App() {
  const [currIndex, setCurrIndex] = useState();
  const [extraFrogs, setExtraFrogs] = useState([]); // Frogs added later by user
  const techEdFrogs = useImagesFromTechEdAPI(); // Frogs added initially
  const images = techEdFrogs ? techEdFrogs.concat(extraFrogs) : undefined; // Bit of a bodge

  // Move to a specific chosen frog
  function switchTo(newIndex) {
    setCurrIndex(newIndex);
  }

  // Move +/- some distance from the current frog
  function switchBy(offset) {
    setCurrIndex((currIndex + offset + images.length) % images.length); // Wrap round at each end
  }

  // TODO: Surely this can't be right? It complains if I pass an empty dependency array, but
  // TODO: letting it run on every render doesn't seem to make sense.
  // Attach event listener to move left/right on arrow keys
  useEffect(() => {
    function handleKeyDown(ev) {
      if (ev.key === "ArrowLeft") switchBy(-1);
      else if (ev.key === "ArrowRight") switchBy(1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Called by search box being submitted. Goes to Unsplash, asks for frogs of the
  // specified type, adds a random one of them to the slideshow, and then moves to it.
  async function getAnotherFrog(searchTerm) {
    const rsp = fetch(
      import.meta.env.VITE_UNSPLASH_SEARCH_PREFIX_URL + searchTerm + "%20frog"
    );
    const arr = (await (await rsp).json()).results; // Note: Unsplash seems to return 10 photos
    const frog = arr[Math.floor(Math.random() * arr.length)]; // Pick a random photo anyway
    if (extraFrogs.find((x) => x.id === frog.id)) {
      alert(
        "We won't add this particular frog, becuase you've already got it!"
      );
    } else {
      // TODO: Merge the properties of TechEd/Unsplash frogs and append the new frog
      // TODO: to the existing frog list instead?
      setExtraFrogs([...extraFrogs, frog]); // Append this frog to the slideshow
      // TODO: setCurrIndex(images.length); // And jump to the new frog
      // TODO: Ha ha can't do that! Won't work, as that index doesn't exist yet!
      // TODO: Fix later maybe if there's time after doing some styling
    }
  }

  return (
    <main>
      <h1>Your Favourite Frogs</h1>
      <div>
        {!images ? (
          "Loading..."
        ) : (
          <>
            <FrogSearch getAnotherFrog={getAnotherFrog} />
            <ImageGallery images={images} switchTo={switchTo} />
            <SlideButton howFar={-1} switchBy={switchBy} />
            <SlideButton howFar={1} switchBy={switchBy} />
          </>
        )}
      </div>
      <div>
        {currIndex >= 0 && (
          <img
            className="bigimage"
            src={images[currIndex].url || images[currIndex].urls.regular}
            // Fall back from url (Tech Ed frogs) to urls.regular (Unsplash frogs)
            // TODO: and alt text, etc.
          />
        )}
      </div>
    </main>
  );
}
