import { useMemo, useState } from 'react'
import { events } from '../data/demoData.js'
import PageIntro from '../components/PageIntro.jsx'
import Modal from '../components/Modal.jsx'

export default function Events() {
  const [sport, setSport] = useState('Any sport')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selected, setSelected] = useState(null)
  const filtered = useMemo(() => events.filter((event) => {
    const matchesSport = sport === 'Any sport' || event.sport === sport
    const matchesSearch = `${event.title} ${event.location} ${event.description}`.toLowerCase().includes(search.toLowerCase())
    return matchesSport && matchesSearch
  }), [sport, search])

  return (
    <>
      <PageIntro eyebrow="GET IN THE GAME" title="Good games happen together." description="Discover local match-ups, friendly fixtures, and the people ready to play."><button className="button button-primary" type="button" onClick={() => { setShowForm(true); setSubmitted(false) }}>＋ Create Event</button></PageIntro>
      <section className="events-area page-container">
        <div className="page-demo-note"><span className="demo-note-icon">i</span><span><b>Fictional events for the Phase 1 demo.</b> Event details are examples; creating an event won’t publish or save it.</span></div>
        <div className="event-controls"><label className="event-search"><span aria-hidden="true">⌕</span><input aria-label="Search events" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events or locations" /></label><div className="filter-tabs" aria-label="Filter by sport">{['Any sport', 'Futsal', 'Cricket'].map((item) => <button key={item} className={sport === item ? 'filter-tab selected' : 'filter-tab'} type="button" onClick={() => setSport(item)}>{item}</button>)}</div><span className="event-count">{filtered.length} events</span></div>
        <div className="event-grid">
          {filtered.map((event, index) => <article className={`event-card event-card-${index % 3}`} key={event.id}>
            <div className="event-card-art"><span className="event-sport">{event.sport}</span><span className="event-day">{event.date.split(', ')[0]}</span><span className="event-art-number">0{event.id}</span><div className="event-field-line" /></div>
            <div className="event-card-body"><div className="event-date-line"><span>◷ {event.date} · {event.time}</span><span className="event-tag">{event.tag}</span></div><h2>{event.title}</h2><p>{event.description}</p><div className="event-location">⌖ <span>{event.location}</span></div><div className="event-card-bottom"><span className="event-team-count">{event.teams}</span><button className="text-link" type="button" onClick={() => setSelected(event)}>View details <span aria-hidden="true">↗</span></button></div></div>
          </article>)}
        </div>
        {filtered.length === 0 && <div className="empty-state"><span>↗</span><h2>No sample events found</h2><p>Try a different search or sport filter to find a match.</p><button className="button button-primary" type="button" onClick={() => { setSearch(''); setSport('Any sport') }}>Clear filters</button></div>}
      </section>
      {showForm && <Modal title="Create an event" onClose={() => setShowForm(false)}>
        <p className="modal-lead">Sketch out a game and see what the setup could look like.</p>
        <form className="demo-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
          <label>Event name<input required placeholder="e.g. Sunday morning friendly" /></label>
          <div className="form-row"><label>Sport<select required defaultValue=""><option value="" disabled>Select a sport</option><option>Futsal</option><option>Cricket</option></select></label><label>Date<input required type="date" /></label></div>
          <label>Venue or area<input required placeholder="Where will you play?" /></label>
          <button className="button button-primary button-full" type="submit">Preview event details</button>
          {submitted && <p className="form-honest-note" role="status">This is a demo only. Nothing has been published or saved.</p>}
        </form>
      </Modal>}
      {selected && <Modal title={selected.title} onClose={() => setSelected(null)}>
        <p className="modal-lead">{selected.description}</p>
        <div className="detail-facts"><span><small>SPORT</small><b>{selected.sport}</b></span><span><small>WHEN</small><b>{selected.date} · {selected.time}</b></span><span><small>WHERE</small><b>{selected.location}</b></span></div>
        <p className="modal-note">{selected.teams}. This fictional event is shown for the Phase 1 demo; joining is not enabled.</p>
      </Modal>}
    </>
  )
}
