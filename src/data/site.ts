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
    'Name and role sit under the photo, and an Applications are open pill carries the call to action, so every post doubles as a recruitment ask.'),
];

/* ---------- projects ---------- */
export const ORDER = ['verdentra', 'igvirnm', 'nlds', 'catalyst', 'goldcoin', 'merch'] as const;
export type Slug = typeof ORDER[number];
const L: any = legacy;
export const P: Record<string, any> = { ...L.projects };
export const CARDS: Record<string, any> = Object.fromEntries(L.cards.map((c: any) => [c.slug, c]));
CARDS.verdentra = { slug: 'verdentra', category: 'employer', img: 'verdentra-cover.jpg', cat: 'Employer Branding', badge: 'Current',
  title: 'Building an Employer Brand From the Inside Out',
  desc: 'Running social media, internal communications and the Verdentra Waves CSR programme, with campaigns owned from first idea to published post.',
  tags: ['Employer Branding', 'Social Media', 'Internal Comms', 'CSR'] };
P.verdentra = {
  chip: 'Verdentra', badge: 'Current', year: '2026', h1: ['Building an Employer', 'Brand From the Inside Out'], desc: CARDS.verdentra.desc,
  stats: [{ n: 'Exec.', l: 'Employer Branding & Comms' }, { n: '5', l: 'Interns in one series' }, { n: '3 years', l: 'Of Verdentra celebrated' }, { n: 'Waves', l: 'CSR programme' }],
  cover: 'verdentra-cover.jpg', ovtitle: 'The idea behind the work',
  paras: [
    'Verdentra is a cloud, data and AI consultancy working with software vendors. My job is to make the company easy to understand, easy to trust and a place people want to work.',
    'I own the social media output, and I take every campaign from the first idea through to creation and publishing. I also run internal communications and engagement activities, so the way Verdentra talks to its own team matches the way it talks to the world. The work below includes Interns, Unfiltered, a series built on interns’ own words, recruitment calls for the blog team, a welcome template for new joiners, and celebration pieces such as the third anniversary wallpaper and the annual office trip.',
    'Outside the channels, I lead Verdentra Waves, the company’s CSR programme, planning and running the events that put its values into practice.'],
  rows: [{ l: 'Role', v: 'Exec. Employer Branding & Comms' }, { l: 'Company', v: 'Verdentra' }, { l: 'Scope', v: 'Social media, internal comms, engagement, CSR' }, { l: 'Programme', v: 'Verdentra Waves' }],
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
    { t: 'Idea to published', x: 'One person owns each campaign from concept to post, which keeps the message consistent.' },
    { t: 'A series, not one-offs', x: 'Interns, Unfiltered runs one layout across five people, so each post builds on the last.' },
    { t: 'One voice, inside and out', x: 'Internal communications and external content follow the same brand and tone.' },
    { t: 'Values in action', x: 'Verdentra Waves turns the company’s CSR intent into events people take part in.' }],
};
export const FILTERS = [['all', 'All'], ['employer', 'Employer brand'], ['campaign', 'Campaigns'], ['event', 'Events'], ['branding', 'Branding'], ['corporate', 'Corporate']];

/* ---------- blog: Medium articles (full text lives on Medium) ---------- */
export const BLOG = (L.blogs as any[]).map((b, i) => ({ ...b, asset: asset(b.img), slug: i }));

/* ---------- about ---------- */
const a = L.about;
export const ABOUT = {
  photo: asset(a.photo),
  details: a.details, edu: a.edu, lead: a.lead,
  exp: [
    { date: 'Sep 2026 - Present', role: 'Co-founder & Creative Director', company: 'Arkive Labs', bullets: ['Lead brand strategy, visual identity, content and digital experience at a strategy-led creative and digital studio', 'Built the studio with co-founder Akesh Chandrasiri, keeping strategy, design and technology under one roof'] },
    { date: 'Jun 2026 - Present', role: 'Exec. Employer Branding & Comms', company: 'Verdentra', bullets: ['Own social media end to end, taking each campaign from ideation to creation and execution', 'Lead internal communications and engagement activities that keep the team connected', 'Run Verdentra Waves, the company’s CSR programme and events'] },
    ...a.exp.map((x: any) => x.company.startsWith('Hype') ? { ...x, date: x.date.replace('- Present', '- Jun 2026') } : x),
  ],
};
