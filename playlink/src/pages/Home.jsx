const features = [
  { number: '01', title: 'Find Your Ground', text: 'Discover nearby futsal and cricket facilities, and see when they’re ready for a game.', icon: '⌖', link: '/venues', action: 'Explore venues' },
  { number: '02', title: 'Join the Game', text: 'Find a match, meet your next opponents, and get into the game.', icon: '↗', link: '/events', action: 'Browse events' },
  { number: '03', title: 'Find Your People', text: 'Meet teams looking for players and players looking for a team.', icon: '◎', link: '/community', action: 'Meet the community' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner page-container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> YOUR LOCAL SPORTS COMMUNITY</span>
            <h1>Your Next Game<br />Starts <span>Here.</span></h1>
            <p>Find nearby courts, discover games, and connect with players and teams. Everything you need to get out there and play.</p>
            <div className="hero-actions">
              <a className="button button-primary button-large" href="/venues">Find a Venue <span aria-hidden="true">↗</span></a>
              <a className="button button-outline button-large" href="/events">Explore Events <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-trust"><span className="trust-avatars" aria-hidden="true"><i>A</i><i>M</i><i>R</i></span><span>For every player. Every neighborhood.</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a sports field with nearby games">
            <div className="art-sun" />
            <div className="art-label"><span className="live-dot" /> YOUR NEXT GAME, NEARBY</div>
            <div className="art-court">
              <div className="court-line court-half" />
              <div className="court-circle" />
              <div className="court-box court-box-left" />
              <div className="court-box court-box-right" />
              <span className="court-player player-one" /><span className="court-player player-two" /><span className="court-player player-three" />
              <span className="court-ball" />
            </div>
            <div className="art-pin"><span className="pin-icon">⌖</span><span><b>Game on</b><small>Thamel · 0.8 km</small></span><span className="pin-arrow">↗</span></div>
            <div className="art-mini-card"><span className="mini-icon">⚽</span><span><b>5-a-side tonight</b><small>3 spots open</small></span><span className="mini-check">✓</span></div>
            <div className="art-caption"><span>01</span> FIND YOUR GROUND <i /> <span>02</span> MEET YOUR TEAM</div>
          </div>
          <form className="quick-search" action="/venues" method="get">
            <div className="search-intro"><span className="search-spark">⌖</span><span><b>Find your next game</b><small>Good things happen out there.</small></span></div>
            <label className="search-field"><span>LOCATION</span><input name="location" placeholder="Where do you play?" /></label>
            <label className="search-field sport-search"><span>SPORT</span><select name="sport" defaultValue=""><option value="">Any sport</option><option>Futsal</option><option>Cricket</option></select></label>
            <button className="button button-primary search-submit" type="submit">Find a venue <span aria-hidden="true">→</span></button>
            <span className="demo-hint">Demo search · sample listings</span>
          </form>
        </div>
      </section>

      <section className="features-section section-space page-container">
        <div className="section-heading">
          <div><span className="eyebrow">MORE PLAY. LESS PLANNING.</span><h2>Everything you need<br />to get <span>in the game.</span></h2></div>
          <p>From finding your next court to meeting the right teammates, PlayLink brings your local sports scene together.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => <article className="feature-card" key={feature.number}>
            <div className="feature-top"><span className="feature-icon">{feature.icon}</span><span className="feature-number">{feature.number}</span></div>
            <h3>{feature.title}</h3><p>{feature.text}</p>
            <a className="text-link" href={feature.link}>{feature.action}<span aria-hidden="true"> ↗</span></a>
          </article>)}
        </div>
      </section>

      <section className="steps-section section-space">
        <div className="page-container steps-inner">
          <div className="steps-heading"><span className="eyebrow">THREE STEPS. ONE GREAT GAME.</span><h2>It’s easier when<br />you <span>play together.</span></h2><p>Less scrolling, more playing. Here’s how PlayLink gets you there.</p></div>
          <div className="steps-list">
            <div className="step-item"><span className="step-index">01</span><div><h3>Discover a venue or game</h3><p>Find a nearby court or an event that fits your plans.</p></div><span className="step-arrow">↗</span></div>
            <div className="step-item"><span className="step-index">02</span><div><h3>Connect with your people</h3><p>Meet players and teams who are ready to play.</p></div><span className="step-arrow">↗</span></div>
            <div className="step-item"><span className="step-index">03</span><div><h3>Show up and play</h3><p>That’s it. The best part happens on the pitch.</p></div><span className="step-arrow">↗</span></div>
          </div>
        </div>
      </section>

      <section className="owner-section page-container">
        <div className="owner-panel">
          <div className="owner-copy"><span className="eyebrow eyebrow-light">FOR THE PEOPLE BEHIND THE PITCH</span><h2>Make room for<br />the next <span>great game.</span></h2><p>Bring your futsal or cricket venue to the people looking for their next place to play.</p><a className="button button-white" href="/list-venue">List Your Venue <span aria-hidden="true">↗</span></a></div>
          <div className="owner-graphic" aria-hidden="true"><div className="owner-ring ring-one" /><div className="owner-ring ring-two" /><div className="owner-court"><span>PL</span></div><span className="owner-label">YOUR COURT<br />YOUR COMMUNITY</span><span className="owner-dot dot-a" /><span className="owner-dot dot-b" /></div>
        </div>
      </section>
    </>
  )
}
