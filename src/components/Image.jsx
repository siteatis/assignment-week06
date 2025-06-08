export function Image({ url, title, alt, onClick }) {
  return (
    <img
      className="thumb"
      src={url}
      title={title}
      alt={alt}
      onClick={onClick} // Select if clicked
      onKeyDown={(ev) => {
        if (ev.key === " ") onClick();
      }} // Respond to space bar too
      tabIndex="0"
      //style={{ width: "5vh" }}
    />
  );
}
