export const venues = [
  {
    id: 1,
    name: 'The Matchday Arena',
    area: 'Thamel, Kathmandu',
    sport: 'Futsal',
    price: 'NPR 2,500',
    rating: '4.8',
    slots: [
      { time: '4:00 PM', status: 'available' },
      { time: '5:00 PM', status: 'booked' },
      { time: '6:00 PM', status: 'available' },
    ],
    description: 'A bright, well-kept five-a-side pitch with changing rooms and evening lights.',
  },
  {
    id: 2,
    name: 'Valley Cricket Ground',
    area: 'Kirtipur, Kathmandu',
    sport: 'Cricket',
    price: 'NPR 4,000',
    rating: '4.7',
    slots: [
      { time: '7:00 AM', status: 'available' },
      { time: '9:00 AM', status: 'closed' },
      { time: '11:00 AM', status: 'booked' },
    ],
    description: 'A community practice ground with net facilities and space for friendly matches.',
  },
  {
    id: 3,
    name: 'Northside Futsal',
    area: 'Lazimpat, Kathmandu',
    sport: 'Futsal',
    price: 'NPR 2,000',
    rating: '4.6',
    slots: [
      { time: '3:00 PM', status: 'booked' },
      { time: '4:00 PM', status: 'available' },
      { time: '7:00 PM', status: 'closed' },
    ],
    description: 'A friendly neighborhood venue for after-work games and weekend kickabouts.',
  },
]

export const events = [
  {
    id: 1,
    title: 'Friday Night Five-a-side',
    sport: 'Futsal',
    date: 'Fri, Oct 16',
    time: '6:30 PM',
    location: 'The Matchday Arena · Thamel',
    teams: '2 teams · 3 spots open',
    description: 'A relaxed, mixed-level evening game. Bring your boots and meet a new crew.',
    tag: 'Players wanted',
  },
  {
    id: 2,
    title: 'Weekend Cricket Friendly',
    sport: 'Cricket',
    date: 'Sat, Oct 17',
    time: '8:00 AM',
    location: 'Valley Cricket Ground · Kirtipur',
    teams: '4 teams · 1 team spot open',
    description: 'A friendly weekend fixture for local sides. All-rounders especially welcome.',
    tag: 'Teams wanted',
  },
  {
    id: 3,
    title: 'Community Cup Qualifier',
    sport: 'Futsal',
    date: 'Sun, Oct 18',
    time: '2:00 PM',
    location: 'Northside Futsal · Lazimpat',
    teams: '6 teams · Registration open',
    description: 'Bring your squad for an afternoon of competitive, good-spirited futsal.',
    tag: 'Open event',
  },
]

export const teams = [
  { name: 'Thamel United', sport: 'Futsal', area: 'Thamel', level: 'Intermediate', availability: 'Weeknights', need: '2 players', initials: 'TU' },
  { name: 'Kirtipur Strikers', sport: 'Cricket', area: 'Kirtipur', level: 'All levels', availability: 'Weekends', need: '1 bowler', initials: 'KS' },
  { name: 'After Hours FC', sport: 'Futsal', area: 'Lazimpat', level: 'Beginner friendly', availability: 'Weeknights', need: '3 players', initials: 'AH' },
]

export const players = [
  { name: 'Aarav K.', sport: 'Futsal', area: 'Thamel', level: 'Intermediate', availability: 'Weeknights', role: 'Goalkeeper', initials: 'AK' },
  { name: 'Mira S.', sport: 'Cricket', area: 'Kirtipur', level: 'Advanced', availability: 'Weekends', role: 'All-rounder', initials: 'MS' },
  { name: 'Sam R.', sport: 'Futsal', area: 'Lazimpat', level: 'Beginner friendly', availability: 'Weekends', role: 'Midfielder', initials: 'SR' },
]
