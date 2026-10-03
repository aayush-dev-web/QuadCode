import { useEffect, useMemo, useRef, useState } from 'react'
import { venues } from '../data/demoData.js'
import Modal from '../components/Modal.jsx'
import Brand from '../components/Brand.jsx'

function VenueCard({ venue, onSelect, favorite, onFavorite }) {
  const available = venue.slots.filter((slot) => slot.status === 'available').length
  return (
    <article className="venue-card">
      <div className={`venue-photo venue-photo-${venue.id}`}>
        <span className="photo-sport"><i /> Available</span>
        <button className={`venue-favorite${favorite ? ' is-favorite' : ''}`} type="button" aria-label={`${favorite ? 'Remove' : 'Add'} ${venue.name} ${favorite ? 'from' : 'to'} favorites`} aria-pressed={favorite} onClick={onFavorite}>{favorite ? '♥' : '♡'}</button>
        <span className="photo-mark" aria-hidden="true">{venue.sport === 'Cricket' ? 'CR' : 'FC'}<span>.</span></span>
      </div>
      <div className="venue-card-body">
        <button className="venue-name-button" type="button" onClick={onSelect}>{venue.name}</button>
        <p className="venue-location"><span aria-hidden="true">⌖</span> {venue.area}</p>
        <div className="venue-sport-price"><span className={`sport-label ${venue.sport === 'Cricket' ? 'cricket-label' : ''}`}>{venue.sport}</span><b>{venue.price}<small>/hr</small></b></div>
        <div className="venue-card-bottom"><span className="rating">★ {venue.rating} <small>({venue.id === 1 ? '124' : venue.id === 2 ? '89' : '73'})</small></span><button className="venue-arrow" type="button" onClick={onSelect} aria-label={`View ${venue.name} details`}>→</button></div>
        <details className="availability-details"><summary>{available} example times available</summary><div className="slot-list">{venue.slots.map((slot) => <span className={`slot slot-${slot.status}`} key={slot.time}><i />{slot.time}<small>{slot.status}</small></span>)}</div></details>
      </div>
    </article>
  )
}

export default function Venues() {
  const params = new URLSearchParams(window.location.search)
  const [location, setLocation] = useState(params.get('location') || '')
  const [globalSearch, setGlobalSearch] = useState('')
  const [sport, setSport] = useState(params.get('sport') || 'Any sport')
  const [availability, setAvailability] = useState('Any availability')
  const [price, setPrice] = useState('Any price')
  const [sort, setSort] = useState('Recommended')
  const [menuOpen, setMenuOpen] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [selected, setSelected] = useState(null)
  const searchRef = useRef(null)

  useEffect(() => {
    function focusSearch(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const filtered = useMemo(() => venues.filter((venue) => {
    const query = `${location} ${globalSearch}`.trim().toLowerCase()
    const matchesLocation = !query || `${venue.area} ${venue.name}`.toLowerCase().includes(query)
    const matchesSport = sport === 'Any sport' || venue.sport === sport
    const matchesAvailability = availability === 'Any availability' || venue.slots.some((slot) => slot.status === availability.toLowerCase())
    const matchesPrice = price === 'Any price' || (price === 'Under NPR 2,500' ? Number(venue.price.replace(/\D/g, '')) < 2500 : Number(venue.price.replace(/\D/g, '')) >= 2500)
    return matchesLocation && matchesSport && matchesAvailability && matchesPrice
  }).sort((first, second) => sort === 'Price: low to high' ? Number(first.price.replace(/\D/g, '')) - Number(second.price.replace(/\D/g, '')) : sort === 'Top rated' ? Number(second.rating) - Number(first.rating) : 0), [location, globalSearch, sport, availability, price, sort])

  const resetFilters = () => {
    setLocation('')
    setGlobalSearch('')
    setSport('Any sport')
    setAvailability('Any availability')
    setPrice('Any price')
    setSort('Recommended')
  }

  return (
    <div className="venue-app">
      <aside className={`venue-sidebar${menuOpen ? ' sidebar-open' : ''}`}>
        <Brand light />
        <span className="sidebar-section-title">PLAY</span>
        <nav className="sidebar-nav" aria-label="Venue finder navigation">
          <a href="/" onClick={() => setMenuOpen(false)}><span>⌂</span>Home</a>
          <a href="/venues" className="active" aria-current="page" onClick={() => setMenuOpen(false)}><span>⌖</span>Venues</a>
          <a href="/events" onClick={() => setMenuOpen(false)}><span>▦</span>Events</a>
          <a href="/community" onClick={() => setMenuOpen(false)}><span>♧</span>Teams &amp; Players</a>
        </nav>
        <span className="sidebar-section-title sidebar-extra-title">YOUR PLAYLINK</span>
        <nav className="sidebar-nav">
          <a href="/get-started" onClick={() => setMenuOpen(false)}><span>＋</span>Get started</a>
          <a href="/list-venue" onClick={() => setMenuOpen(false)}><span>▤</span>List a venue</a>
          <a href="/sign-in" onClick={() => setMenuOpen(false)}><span>○</span>Sign in</a>
        </nav>
        <div className="sidebar-promo"><span className="promo-symbol">◎</span><b>Good games.<br />Great people.</b><p>Find your crew and get out there.</p><a href="/community" aria-label="Explore the community">↗</a></div>
        <div className="sidebar-foot">PLAYLINK · PHASE 1 DEMO</div>
      </aside>
      {menuOpen && <button className="venue-sidebar-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}

      <div className="venue-workspace">
        <header className="venue-topbar">
          <button className="venue-menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>☰</button>
          <label className="venue-global-search"><span aria-hidden="true">⌕</span><input ref={searchRef} value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder="Search venues, areas, or sports..." aria-label="Search venues and areas" /><kbd>Ctrl K</kbd></label>
          <span className="topbar-location"><span>⌖</span> Kathmandu <small>⌄</small></span>
          <span className="topbar-demo">DEMO</span>
        </header>

        <main className="venue-dashboard">
          <section className="venue-welcome">
            <div className="venue-welcome-copy"><span className="eyebrow">YOUR NEXT GAME IS CLOSER THAN YOU THINK</span><h1>Find Your Perfect Venue</h1><p>Discover futsal and cricket venues, compare your options, and find a place for your next game.</p>
              <div className="sport-switch" aria-label="Filter venues by sport">
                <button type="button" className={sport === 'Futsal' ? 'sport-switch-button active' : 'sport-switch-button'} aria-pressed={sport === 'Futsal'} onClick={() => setSport(sport === 'Futsal' ? 'Any sport' : 'Futsal')}><span>◉</span> Futsal</button>
                <button type="button" className={sport === 'Cricket' ? 'sport-switch-button active' : 'sport-switch-button'} aria-pressed={sport === 'Cricket'} onClick={() => setSport(sport === 'Cricket' ? 'Any sport' : 'Cricket')}><span>╱</span> Cricket</button>
              </div>
            </div>
            <div className="welcome-court-art" aria-hidden="true"><span className="welcome-ball" /><span className="welcome-court-line" /><span className="welcome-court-circle" /><span className="welcome-art-label">FIND YOUR<br />HOME PITCH</span></div>
          </section>

          <section className="venue-filter-panel" aria-label="Venue filters">
            <label className="dashboard-filter location-filter"><span>⌖</span><span className="filter-text"><small>Location / Area</small><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Any area" /></span></label>
            <label className="dashboard-filter"><span>◷</span><span className="filter-text"><small>Availability</small><select value={availability} onChange={(event) => setAvailability(event.target.value)}><option>Any availability</option><option>Available</option><option>Booked</option><option>Closed</option></select></span></label>
            <label className="dashboard-filter"><span>₨</span><span className="filter-text"><small>Price range</small><select value={price} onChange={(event) => setPrice(event.target.value)}><option>Any price</option><option>Under NPR 2,500</option><option>NPR 2,500 and up</option></select></span></label>
            <button className="more-filters" type="button" onClick={resetFilters}><span>↺</span> Reset</button>
          </section>

          <div className="venue-dashboard-grid">
            <section className="venue-main-column">
              <div className="venue-list-heading"><div><span className="result-caption"><b>{filtered.length}</b> sample venues <i>·</i> Showing example listings</span></div><label className="sort-select">Sort by: <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Recommended</option><option>Top rated</option><option>Price: low to high</option></select></label></div>
              <div className="venue-results">
                {filtered.map((venue) => <VenueCard key={venue.id} venue={venue} favorite={favorites.includes(venue.id)} onFavorite={() => setFavorites((current) => current.includes(venue.id) ? current.filter((id) => id !== venue.id) : [...current, venue.id])} onSelect={() => setSelected(venue)} />)}
                {filtered.length === 0 && <div className="empty-state"><span>⌖</span><h2>No sample venues match</h2><p>Try a different area, sport, availability, or price. These are example listings.</p><button className="button button-primary" type="button" onClick={resetFilters}>Clear filters</button></div>}
              </div>
              <p className="venue-data-note">Venue names, prices, ratings, and time slots are fictional sample data—not live listings or availability.</p>
            </section>

            <aside className="venue-dashboard-aside">
              <section className="mini-map" aria-label="Illustrative map placeholder">
                <div className="mini-map-label"><span>⌖</span><b>Kathmandu Valley</b><small>Illustrative map · not to scale</small></div>
                <div className="mini-map-art"><span className="map-road-line map-road-a" /><span className="map-road-line map-road-b" /><span className="map-road-line map-road-c" /><span className="map-river-line" /><button className="mini-map-pin pin-a" type="button" onClick={() => setSelected(venues[0])} aria-label="View Matchday Arena">PL</button><button className="mini-map-pin pin-b" type="button" onClick={() => setSelected(venues[1])} aria-label="View Valley Cricket Ground">PL</button><button className="mini-map-pin pin-c" type="button" onClick={() => setSelected(venues[2])} aria-label="View Northside Futsal">PL</button><span className="map-area area-a">THAMEL</span><span className="map-area area-b">KIRTIPUR</span></div>
                <p>Map search will connect to real venue data in Phase 2.</p>
              </section>
              <section className="venue-callout"><span className="callout-icon">▦</span><div><b>Ready for your next game?</b><p>Browse sample venues and time slots.</p><button type="button" onClick={resetFilters}>View all venues <span>→</span></button></div></section>
              <section className="popular-sports"><h2>Popular sports</h2><div><button type="button" onClick={() => setSport(sport === 'Futsal' ? 'Any sport' : 'Futsal')}><span>⚽</span><b>Futsal<small>{venues.filter((venue) => venue.sport === 'Futsal').length} sample venues</small></b></button><button type="button" onClick={() => setSport(sport === 'Cricket' ? 'Any sport' : 'Cricket')}><span>🏏</span><b>Cricket<small>{venues.filter((venue) => venue.sport === 'Cricket').length} sample venue</small></b></button></div></section>
              <section className="venue-quick-links"><h2>Quick links</h2><a href="/events"><span>▦</span>Explore events <i>→</i></a><a href="/community"><span>♧</span>Find players &amp; teams <i>→</i></a><a href="/list-venue"><span>＋</span>List your venue <i>→</i></a></section>
            </aside>
          </div>
        </main>
      </div>
      {selected && <Modal title={selected.name} onClose={() => setSelected(null)}>
        <p className="modal-lead">{selected.description}</p>
        <div className="detail-facts"><span><small>AREA</small><b>{selected.area}</b></span><span><small>SPORT</small><b>{selected.sport}</b></span><span><small>EXAMPLE PRICE</small><b>{selected.price} / hour</b></span><span><small>DEMO RATING</small><b>★ {selected.rating}</b></span></div>
        <h3 className="modal-subhead">Example time slots · not live availability</h3>
        <div className="slot-list detail-slots">{selected.slots.map((slot) => <span className={`slot slot-${slot.status}`} key={slot.time}><i />{slot.time}<small>{slot.status}</small></span>)}</div>
        <p className="modal-note">Venue details and availability are demonstration content. Reservations are not available in this phase.</p>
      </Modal>}
    </div>
  )
}
