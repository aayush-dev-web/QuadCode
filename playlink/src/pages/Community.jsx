import { useMemo, useState } from 'react'
import { players, teams } from '../data/demoData.js'
import PageIntro from '../components/PageIntro.jsx'

const levels = ['Any level', 'Beginner friendly', 'Intermediate', 'Advanced', 'All levels']

export default function Community() {
  const [mode, setMode] = useState('teams')
  const [sport, setSport] = useState('Any sport')
  const [location, setLocation] = useState('')
  const [level, setLevel] = useState('Any level')
  const [availability, setAvailability] = useState('Any time')
  const source = mode === 'teams' ? teams : players
  const listings = useMemo(() => source.filter((item) => {
    const sportMatch = sport === 'Any sport' || item.sport === sport
    const locationMatch = `${item.area} ${item.name}`.toLowerCase().includes(location.toLowerCase())
    const levelMatch = level === 'Any level' || item.level === level || item.level === 'All levels'
    const timeMatch = availability === 'Any time' || item.availability === availability
    return sportMatch && locationMatch && levelMatch && timeMatch
  }), [source, sport, location, level, availability])

  return (
    <>
      <PageIntro eyebrow="FIND YOUR PEOPLE" title="Your team is out there." description="Whether you’re looking for a side or filling a spot, meet the local players who make every game better." />
      <section className="community-section page-container">
        <div className="community-demo-note"><span className="demo-note-icon">i</span><span>These example profiles are fictional demo listings. PlayLink connections aren’t enabled yet.</span></div>
        <div className="community-switch" role="tablist" aria-label="Community search mode">
          <button role="tab" aria-selected={mode === 'teams'} className={mode === 'teams' ? 'community-tab active' : 'community-tab'} onClick={() => setMode('teams')} type="button"><span className="mode-icon">⚑</span><span><b>I’m looking for a team</b><small>Find a side that needs a player</small></span><span className="mode-arrow">↗</span></button>
          <button role="tab" aria-selected={mode === 'players'} className={mode === 'players' ? 'community-tab active' : 'community-tab'} onClick={() => setMode('players')} type="button"><span className="mode-icon">◎</span><span><b>I’m looking for players</b><small>Find a player for your team</small></span><span className="mode-arrow">↗</span></button>
        </div>
        <div className="community-content">
          <aside className="community-filters">
            <span className="filter-eyebrow">TUNE YOUR SEARCH</span>
            <label className="filter-control"><span>SPORT</span><select value={sport} onChange={(event) => setSport(event.target.value)}><option>Any sport</option><option>Futsal</option><option>Cricket</option></select></label>
            <label className="filter-control"><span>LOCATION</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Thamel" /></label>
            <label className="filter-control"><span>SKILL LEVEL</span><select value={level} onChange={(event) => setLevel(event.target.value)}>{levels.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="filter-control"><span>AVAILABILITY</span><select value={availability} onChange={(event) => setAvailability(event.target.value)}><option>Any time</option><option>Weeknights</option><option>Weekends</option></select></label>
            <p className="filter-footnote">Filters use example listings only.</p>
          </aside>
          <div className="community-results">
            <div className="community-result-heading"><div><span className="eyebrow">{mode === 'teams' ? 'TEAMS WITH OPEN SPOTS' : 'PLAYERS READY TO PLAY'}</span><h2>{mode === 'teams' ? 'Find your next team.' : 'Meet your next teammate.'}</h2></div><span>{listings.length} sample {mode === 'teams' ? 'teams' : 'players'}</span></div>
            <div className="people-list">
              {listings.map((listing) => <article className="person-card" key={listing.name}><div className="person-avatar">{listing.initials}</div><div className="person-main"><div className="person-title"><h3>{listing.name}</h3><span className="sport-chip">{listing.sport}</span></div><p>⌖ {listing.area} · {listing.level}</p><div className="person-tags"><span>◷ {listing.availability}</span><span>{mode === 'teams' ? `＋ ${listing.need}` : `↗ ${listing.role}`}</span></div></div><button type="button" className="button button-outline small-button" onClick={(event) => { event.currentTarget.blur(); window.alert('Demo only: connecting with players and teams is not available yet.') }}>View profile <span aria-hidden="true">↗</span></button></article>)}
              {listings.length === 0 && <div className="empty-state compact-empty"><span>◎</span><h2>No matches in these examples</h2><p>Try broadening your filters to see more demo listings.</p><button className="text-link" type="button" onClick={() => { setSport('Any sport'); setLocation(''); setLevel('Any level'); setAvailability('Any time') }}>Clear filters ↗</button></div>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
