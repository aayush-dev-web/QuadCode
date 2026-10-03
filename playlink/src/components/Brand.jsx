export default function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="/" aria-label="PlayLink home">
      <span className="brand-mark" aria-hidden="true">
        <img src="/playlink-logo.png" alt="" />
      </span>
      <span className="brand-word">Play<span>Link</span></span>
    </a>
  )
}
