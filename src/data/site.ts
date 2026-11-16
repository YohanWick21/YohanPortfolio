import legacy from './legacy.json';
import assetmap from './assetmap.json';

type AM = Record<string, { path: string; w: number; h: number }>;
const MAP = assetmap as unknown as AM;
export const A = (old: string) => '/' + MAP[old].path;
export const dims = (old: string) => ({ w: MAP[old].w, h: MAP[old].h });
export const asset = (old: string) => ({ src: A(old), ...dims(old) });

/* ---------- colour accents used across the site ---------- */
export const ACC = ['#C8FF00', '#FF5CAA', '#3DD9FF', '#FFC83D', '#8B5CFF', '#FF6B2C'];
export const accent = (i: number) => ACC[i % ACC.length];

/* ---------- homepage press jobs (DRAFT copy, Yohan to review) ---------- */
export interface Job { name: string; tag: string; img: string; w: number; h: number; href: string; meta: string; brief: string; idea: string; ideate: string; create: string; exec: string; }
const IGV = 'iGV, AIESEC in SLIIT, 2025/26';
const job = (name: string, tag: string, old: string, href: string, meta: string, brief: string, idea: string, ideate: string, create: string, exec: string): Job => ({ name, tag, img: A(old), ...dims(old), href, meta, brief, idea, ideate, create, exec });
export const JOBS: Job[] = [
  job('4 Week GV', 'Attraction', '4 weeks GV v2.png', '/work/igvirnm/', IGV,
    'Get students to apply for the 4 week volunteer programme.', 'Make it feel like a call you have to pick up.',
    'A volunteering trip is a big ask on a feed. A ringing phone is something nobody ignores, so the opportunity arrives as a call from AIESEC in SLIIT.',
    'The phone frame holds the screen and the headline breaks out of it, so "4 week GV" is read first. One question under it carries the emotion.',
    'One action only, Apply now, in AIESEC red with the brand footer locked in. It has to work in two seconds on a phone.'),
  job('Choose Your Impact', 'Attraction', 'Choose your impact v5.png', '/work/igvirnm/', IGV,
    'Show six iGV projects in one post and let people choose.', 'A tear-off flyer. Take the one that is yours.',
    'Six projects in a list is a post nobody reads. A tear-off board turns the list into a choice, and one tab already pulled makes people want to pull theirs.',
    'Each project gets a vertical tab that reads at a glance. A display serif adds warmth against flat red, and the half-torn tab is the only thing that moves.',
    'Everything sits in one soft panel with the brand footer below, so the post stays calm even with six names on it.'),
  job('100 Approvals', 'Milestone', '100 APD V5.png', '/work/igvirnm/', IGV,
    'Mark 100 approvals in term 25.26.', 'Let the number be the poster.',
    'A milestone needs no explaining. The number does the work, so the job is to make it feel earned.',
    'A huge 100 stretched into red rails on a scratched black ground, with the same number in white on top. The hashtag closes it as the campaign tag.',
    'Dark and heavy on purpose, so it stands apart from the bright attraction posts around it in the feed.'),
  job('Hackathon Workspace', 'Event reminder', 'Workspace happening today v3.png', '/work/igvirnm/', IGV,
    'Tell people the hackathon workspace is open today, 12 PM to 3 PM IST.', 'Make time the hero.',
    'The message is urgency, so the object is an alarm clock. Nobody has to read anything to know the clock is running.',
    'A big red clock in the middle, flames and blurred clocks at the edges for heat, and a discount tag as the reason to act now.',
    'Timing and processing time sit in two pill rows, the only text a reader needs to act on.'),
  job('Hackathon Final Day', 'Event push', 'Hackathon Final Day V2.png', '/work/igvirnm/', IGV,
    'Push applications on the last day of the hackathon.', 'Shout it, then say it again.',
    'It is the final day, so the post should sound like a loudspeaker. The word announcement repeats until it fills the frame.',
    'A megaphone breaking out of a card, graffiti type for energy, and a calm card below holding the facts so the noise has somewhere to land.',
    'Processing time and one Apply now button, with a friendly sign-off so the urgency feels warm, not pushy.'),
  job('Christmas LCM', 'Event reminder', 'LCM Happening Tomorrow v6.png', '/work/igvirnm/', IGV,
    'Remind members the Christmas LCM is tomorrow, with venue and time.', 'An advent calendar where the event is the middle square.',
    'The season was the countdown, so a December calendar carries the mood and the event takes the centre cell.',
    'Eight festive icon cells in felt-like textures around one cream cell. Date, venue and time live only in the centre.',
    'Everything a member needs, Methodist Church, Malabe, 3 PM onwards, is in one cell, so nothing has to be hunted for.'),
  job('Blog Team Is Back', 'Recruitment', 'verdentra-blog-team.jpg', '/work/verdentra/', 'Verdentra, 2026',
    'Find writers and reviewers for the relaunched Verdentra blog.', 'Make the call for writers feel like an invitation.',
    'People answer invitations, not job ads. The poster opens with a promise, great ideas deserve to be shared, then shows exactly what a writer would get to write about.',
    'A heavy navy headline with TEAM! in a brush-script green, four topic icons for what the blog covers, and two role cards, Writers and Reviewers, so people can see where they fit.',
    'One clear ask at the bottom, DM or reach out to join, and a LinkedIn note that tells writers their work gets published and tagged.'),
  job('Interns, Unfiltered', 'Employer brand', 'verdentra-interns-akalanka.jpg', '/work/verdentra/', 'Verdentra, 2026',
    'Introduce the interns in their own words.', 'One layout, five voices.',
    'Interns say more about a workplace than a company page can. The post leads with their own quote, and the same layout runs across five people so it reads as a series.',
    'A torn-paper quote card beside the intern’s photo under the headline Interns, Unfiltered, with the key words of each quote picked out in colour so it scans in a second.',
    'Name and role sit under the photo, and an Applications are open pill carries the call to action. In October the five posts drew nearly 90,000 LinkedIn impressions and drove 2,500 website visits.'),
];

/* ---------- projects ---------- */
export const ORDER = ['verdentra', 'igvirnm', 'nlds', 'catalyst', 'goldcoin', 'merch'] as const;
export type Slug = typeof ORDER[number];
const L: any = legacy;
export const P: Record<string, any> = { ...L.projects };
export const CARDS: Record<string, any> = Object.fromEntries(L.cards.map((c: any) => [c.slug, c]));
CARDS.verdentra = { slug: 'verdentra', category: 'employer', img: 'verdentra-cover.jpg', cat: 'Employer Branding', badge: 'Current',
  title: 'Building an Employer Brand From the Inside Out',
  desc: 'x',
  tags: ['Employer Branding', 'Social Media', 'Internal Comms', 'CSR'] };
P.verdentra = {
  title: 'Employer Branding Case Study: Verdentra',
  chip: 'Verdentra', badge: 'Current', year: '2026', h1: ['Building an Employer', 'Brand From the Inside Out'], desc: CARDS.verdentra.desc,
  stats: [{ n: '~90K', l: 'LinkedIn impressions in October' }, { n: '6K', l: 'Instagram views in October' }, { n: '2,500', l: 'Website visits driven in October' }, { n: '5', l: 'Interns in one series' }],
  cover: 'verdentra-cover.jpg', ovtitle: 'The idea behind the work',
  paras: [
    'Verdentra is a cloud, data and AI consultancy that works with software vendors. I lead its employer branding and communications, so the company is easy to understand and a place people want to join.',
    'I own the social media output and take every campaign from first idea to published post. I also run the internal communications that keep the team connected. The work below includes Interns, Unfiltered, a five-post series in the interns’ own words, recruitment calls for the blog team, a new joiner welcome template, and celebration pieces like the third anniversary wallpaper and the annual office trip.'],
  rows: [{ l: 'Role', v: 'Exec. Employer Branding & Comms' }, { l: 'Company', v: 'Verdentra' }, { l: 'Scope', v: 'Social media, internal comms, engagement' }],
  gallery: [
    ['verdentra-cover.jpg', 'Third anniversary wallpaper'], ['verdentra-interns-akalanka.jpg', 'Interns, Unfiltered: Akalanka'],
    ['verdentra-blog-team.jpg', 'Blog team recruitment'], ['verdentra-office-trip.jpg', 'Annual office trip'],
    ['verdentra-interns-thesara.jpg', 'Interns, Unfiltered: Thesara'], ['verdentra-blog-post.jpg', 'Technical blog post'],
    ['verdentra-movie-night.jpg', 'Movie night'], ['verdentra-interns-seenujan.jpg', 'Interns, Unfiltered: Seenujan'],
    ['verdentra-new-joiner.jpg', 'New joiner welcome template'], ['verdentra-poson.jpg', 'Poson greeting'],
    ['verdentra-interns-senal.jpg', 'Interns, Unfiltered: Senal'], ['verdentra-wallpaper.jpg', 'Culture wallpaper'],
    ['verdentra-interns-umasha.jpg', 'Interns, Unfiltered: Umasha']].map(([src, tag]) => ({ src, tag })),
  steps: [
    { t: 'Understand', x: 'Get clear on the audience, whether that is a prospective client, a candidate or the team, and on what the company needs them to feel.' },
    { t: 'Ideate', x: 'Turn that into campaign ideas, content pillars and creative directions before anything is designed.' },
    { t: 'Create', x: 'Produce the posts, carousels, graphics and event materials myself, so the idea and the finished piece stay connected.' },
    { t: 'Execute', x: 'Publish on a steady calendar, run the events, then look at what worked and adjust the next round.' }],
  outcomes: [
    { t: 'Reach that led somewhere', x: 'In October, the five Interns, Unfiltered posts drew nearly 90,000 impressions on LinkedIn and 6,000 views on Instagram, and drove 2,500 visits to the website.' },
    { t: 'A series, not one-offs', x: 'One layout ran across five people, so each post built on the last.' },
    { t: 'One voice, inside and out', x: 'Internal communications and external content follow the same brand and tone.' },
    { t: 'Idea to published', x: 'One person carries each campaign from concept to post, which keeps the message consistent.' }],
};
CARDS.verdentra.tags = ['Employer Branding', 'Social Media', 'Internal Comms'];
CARDS.verdentra.desc = 'Owning social media, internal comms and campaigns for a cloud and AI consultancy. In October, one intern series drove 2,500 website visits.';
P.verdentra.desc = CARDS.verdentra.desc;

/* ---------- other projects: tighter copy, facts only ---------- */
const patch = (slug: string, o: any) => { Object.assign(P[slug], o); if (o.desc) CARDS[slug].desc = o.desc; };
patch('igvirnm', {
  title: 'iGV Campaign Design: AIESEC in SLIIT',
  desc: 'Attraction campaigns for AIESEC in SLIIT’s iGV programme, built as a six-format poster system.',
  stats: [{ n: 'iGV', l: 'AIESEC in SLIIT' }, { n: '15+', l: 'Assets created' }, { n: '3', l: 'Platforms' }],
  paras: [
    'iGV (Incoming Global Volunteer) is a flagship programme at AIESEC in SLIIT. As Campaign Coordinator for IR & M, from July 2025 to February 2026, I planned and designed the campaigns that drove applications and event attendance.',
    'The brief was to stand out in a crowded feed while staying inside AIESEC’s global brand rules and sounding local and personal. I answered it with one poster system: a single idea per post, a shared footer, and a different object each time, such as a ringing phone, a tear-off flyer, a clock, a megaphone and an advent calendar.'],
  rows: [{ l: 'Programme', v: 'iGV, AIESEC in SLIIT' }, { l: 'Team', v: 'IR & M' }, { l: 'Role', v: 'Campaign Coordinator' }, { l: 'Period', v: 'Jul 2025 to Feb 2026' }],
  outcomes: [
    { t: 'A repeatable system', x: 'Six poster formats sharing one footer, so new posts could be made quickly.' },
    { t: 'One idea per post', x: 'Each design carries a single action: apply, choose, attend or celebrate.' },
    { t: 'Across channels', x: '15+ assets built for 3 platforms.' }],
});
patch('nlds', {
  title: 'NLDS Application Design: Case Study',
  desc: 'A five-piece creative application for the NLDS Organising Committee, built to show how I approach a campaign.',
  stats: [{ n: 'NLDS', l: 'AIESEC seminar' }, { n: '5', l: 'Assets created' }, { n: '3', l: 'Platforms' }],
  paras: [
    'The National Leadership Development Seminar (NLDS) is a flagship AIESEC seminar for developing leaders across the country. For my Organising Committee application I designed five creatives that explained my ideas and showed how I approach a campaign.',
    'Each one had to be clear at a glance and still sit inside AIESEC’s brand guidelines.'],
  rows: [{ l: 'Event', v: 'NLDS, AIESEC' }, { l: 'Context', v: 'Organising Committee application' }, { l: 'Assets', v: '5 creatives' }],
  steps: [],
  outcomes: [{ t: 'One visual language', x: 'Five creatives sharing a single look across 3 platforms.' }, { t: 'Inside the brand rules', x: 'Built to AIESEC’s guidelines while still standing out.' }],
});
patch('catalyst', {
  title: 'Catalyst 5.0 Event Marketing: AIESEC in SLIIT',
  desc: 'Marketing direction for a leadership seminar, built on an Avatar: The Last Airbender theme.',
  stats: [{ n: 'Catalyst 5.0', l: 'Leadership seminar' }, { n: '10+', l: 'Assets created' }, { n: '3', l: 'Platforms' }],
  paras: [
    'Catalyst 5.0 is AIESEC in SLIIT’s flagship leadership seminar. As Organising Committee Vice President for Marketing, I led the marketing direction and execution.',
    'The campaign used an Avatar: The Last Airbender theme to give a leadership event a story people wanted to follow, while staying inside AIESEC’s brand guidelines.'],
  rows: [{ l: 'Event', v: 'Catalyst 5.0' }, { l: 'Role', v: 'OC Vice President, Marketing' }, { l: 'Theme', v: 'Avatar: The Last Airbender' }],
  steps: [],
  outcomes: [{ t: 'One theme, every asset', x: '10+ assets across 3 platforms shared the same world.' }, { t: 'Led end to end', x: 'Marketing direction and execution led as OC Vice President.' }],
});
patch('goldcoin', {
  title: 'Corporate Awards Event Design: Gold Coin',
  desc: 'Flyers and email banners for an apparel-industry awards ceremony, designed so the agenda reads at a glance.',
  stats: [{ n: 'Gold Coin', l: 'Awards ceremony' }, { n: '10+', l: 'Assets created' }, { n: '2', l: 'Platforms' }],
  paras: [
    'Flyers, posters and email banners for a large awards ceremony hosted by a leading apparel-industry organisation. The job was to show the prestige of the event while keeping the agenda and announcements easy to read.',
    'Everything had to meet corporate standards and work in print and digital, so hierarchy and consistency came first.'],
  rows: [{ l: 'Event', v: 'Gold Coin Award Ceremony' }, { l: 'Client', v: 'Apparel-industry organisation' }, { l: 'Formats', v: 'Print and digital' }],
  steps: [],
  outcomes: [{ t: 'Clear hierarchy', x: 'Agenda and announcements readable at a glance.' }, { t: 'Print and digital', x: '10+ assets across 2 platforms in one visual identity.' }],
});
patch('merch', {
  title: 'Merchandise Design: AIESEC in SLIIT',
  desc: 'T-shirt and jacket graphics that turn a brand or an idea into something people wear.',
  stats: [{ n: '10+', l: 'Design variations' }, { n: '2', l: 'Formats' }],
  paras: [
    'Merchandise for AIESEC in SLIIT, plus a set of personal apparel designs: t-shirts and jackets that turn a brand or an idea into something people wear.',
    'Fabric changes the brief. The graphics had to stay strong at garment scale and work across different apparel types.'],
  rows: [{ l: 'Client', v: 'AIESEC in SLIIT, plus personal work' }, { l: 'Products', v: 'T-shirts and jackets' }],
  steps: [],
  outcomes: [{ t: 'Built for fabric', x: '10+ variations across 2 formats, designed for how graphics print on apparel.' }],
});
for (const k of ['nlds', 'catalyst', 'goldcoin', 'merch']) P[k].title ??= CARDS[k].title;

export const FILTERS = [['all', 'All'], ['employer', 'Employer brand'], ['campaign', 'Campaigns'], ['event', 'Events'], ['branding', 'Branding'], ['corporate', 'Corporate']];

/* ---------- blog: Medium articles (full text lives on Medium) ---------- */
const EXCERPTS = [
  'Why imperfect, human-looking design is beating polished AI-era visuals.',
  'How cultural cues and human signals earn attention that generic content can\u2019t.',
  'Why the linear funnel no longer matches how buyers behave, and what to design instead.',
  'How Faber-Castell borrowed the Apple look to make 400 hours of craft the story.',
  'How Ogilvy Canada helped TD Bank borrow Nike and Apple\u2019s brand equity without asking permission.',
];
export const BLOG = (L.blogs as any[]).map((b, i) => ({ ...b, excerpt: EXCERPTS[i] ?? b.excerpt, asset: asset(b.img), slug: i }));

/* ---------- about ---------- */
const a = L.about;
export const ABOUT = {
  photo: asset(a.photo),
  details: a.details, edu: a.edu,
  lead: a.lead.map((x: any, i: number) => ({ ...x, desc: [
    'Led the committee behind Benchmark 3.0: 600+ registrations, 400+ delegates, 100 teams, and the Most Outstanding Event Award at AIESEC in SLIIT.',
    'Led planning and execution of attraction campaigns for iGV IR & M.',
    'Edited the quarterly magazine and managed the club website.',
    'Edited and published digital materials for the faculty community.'][i] ?? x.desc })),
  exp: [
    { date: 'Sep 2026 - Present', role: 'Co-founder & Creative Director', company: 'Arkive Labs', bullets: ['Lead brand strategy, visual identity, content and digital experience at a strategy-led creative and digital studio', 'Built the studio with co-founder Akesh Chandrasiri, keeping strategy, design and technology under one roof'] },
    { date: 'Jun 2026 - Present', role: 'Exec. Employer Branding & Comms', company: 'Verdentra', bullets: ['Own social media end to end, from first idea to published post', 'Lead the internal communications and engagement that keep the team connected'] },
    ...a.exp.map((x: any) => ({ ...(x.company.startsWith('Hype') ? { ...x, date: x.date.replace('- Present', '- Jun 2026') } : x), bullets: x.bullets.slice(0, 2) })),
  ],
};
