// Album-style artwork. Uses a public-domain image when there is one, otherwise a generated gradient.
// Purely decorative: the title is always repeated in real text next to it.
function Cover({ title, subtitle, colors, image, size = 'md' }) {
  return (
    <div
      className={`cover cover--${size}${image ? ' cover--image' : ''}`}
      style={{ '--cover-from': colors[0], '--cover-to': colors[1] }}
      aria-hidden="true"
    >
      {image ? (
        <img className="cover-image" src={image} alt="" loading="lazy" />
      ) : (
        <>
          <span className="cover-title">{title}</span>
          {subtitle && <span className="cover-subtitle">{subtitle}</span>}
        </>
      )}
    </div>
  );
}

export default Cover;
