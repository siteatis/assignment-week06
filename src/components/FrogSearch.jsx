// A search box to let the user find Unsplash images of their favourite
// kind of frog, to add to the slideshow

export function FrogSearch({ getAnotherFrog }) {
  return (
    <form
      id="frogSearch"
      action=""
      onSubmit={(ev) => {
        ev.preventDefault();
        const searchTerm = ev.target.children["frogSearchBox"].value;
        if (searchTerm) getAnotherFrog(searchTerm);
        // TODO: Should we reset the form? Probably not, as the user might
        // TODO: want to add lots of their favourite frog type!
      }}
    >
      <input
        type="text"
        id="frogSearchBox"
        placeholder="The best frogs are ..."
      />
    </form>
  );
}
