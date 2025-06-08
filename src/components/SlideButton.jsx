// A button that lets the user slide left or right around the slideshow

export function SlideButton({ howFar, switchBy }) {
  // This is all a bit silly as we're piling up all this conditionality just
  // for two possible options. It'd be better to just hardcode left and right
  // probably. But it's just for proof of concept.
  const word = howFar === -1 ? "previous" : howFar === +1 ? "next" : "other";
  return (
    <button
      className={`${word}-btn slide-btn`}
      onClick={() => switchBy(howFar)}
      aria-label={`See ${word} frog`}
    >
      {howFar === +1 ? `>>` : howFar === -1 ? "<<" : "!!"}
    </button>
  );
}
