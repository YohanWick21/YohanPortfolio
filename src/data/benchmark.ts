/*
  Benchmark 3.0 case study content.

  HOW TO ADD PHOTOS
  Drop an image into public/assets/benchmark/ named exactly after the identifier below,
  for example public/assets/benchmark/benchmark-hero.jpg. Supported: .webp .jpg .jpeg .png.
  No code change is needed: the placeholder is replaced on the next build.
  Optional: benchmark-card (Work page thumbnail), benchmark-video.mp4 (event section video).
  Keep photos under about 300 KB each (resize to 1600px wide, export as webp or jpg).

  HOW TO EDIT TEXT
  Everything shown on the page is in this file: captions, alt text, stats, testimonials.
*/
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve('public/assets/benchmark');
const EXT = ['webp', 'jpg', 'jpeg', 'png'];
export const bmSrc = (id: string): string | null => {
  for (const e of EXT) if (fs.existsSync(path.join(DIR, `${id}.${e}`))) return `/assets/benchmark/${id}.${e}`;
  return null;
};
export const bmVideo = (id: string): string | null => (fs.existsSync(path.join(DIR, `${id}.mp4`)) ? `/assets/benchmark/${id}.mp4` : null);

export const BM = {
  title: 'Benchmark 3.0',
  org: 'AIESEC in SLIIT',
  role: 'Organising Committee President',
  dates: 'Oct 2024 - Dec 2024',
  venue: 'SLIIT Malabe',
  eventDays: '30 Nov and 7 Dec 2024',
  award: 'Most Outstanding Event Award, AIESEC in SLIIT',
  eyebrow: 'Leadership & event execution',
  headline: 'Leading *people*. Building *experiences*. Delivering *impact*.',
  intro: 'An ambitious event brought to life through teamwork, coordination and a shared vision.',
  hero: { id: 'benchmark-hero', alt: 'The Benchmark 3.0 organising committee on stage behind the Benchmark letter blocks', ratio: '16 / 9', pos: '50% 78%' },

  /* Figures are from the existing portfolio. Edit here once final numbers are verified. */
  stats: [
    { value: 18, suffix: '', label: 'Organising committee members led' },
    { value: 600, suffix: '+', label: 'Registrations generated' },
    { value: 400, suffix: '+', label: 'Delegates across two days' },
    { value: 100, suffix: '', label: 'Competing hackathon teams' },
  ],

  challenge: {
    title: 'Bringing an *ambitious vision* to life.',
    body: [
      'Benchmark 3.0 was AIESEC in SLIIT\'s signature event and a pioneering UI/UX event, which came with real weight. Delivering something at that scale takes more than a good idea. It takes people moving towards the same objectives, teams that stay aligned and a lot of moving parts held together.',
      'As Organising Committee President, I led an 18-person team from diverse backgrounds, many working in functions they had little or no prior experience in. Over three months, my job was to set direction and help them turn it into a brand and an event worth showing up for.',
    ],
    pull: 'The challenge was not simply organising an event. It was getting an entire team to move towards *one shared goal*.',
    image: { id: 'benchmark-speaker-01', alt: 'A speaker addressing delegates at Benchmark 3.0', ratio: '4 / 5', pos: '50% 30%' },
  },

  roles: {
    title: 'Leading *beyond* the title.',
    items: [
      { icon: 'users', t: 'People leadership', x: 'Led an 18-person team from diverse backgrounds, many in functions that were new to them, and helped everyone find their footing.' },
      { icon: 'compass', t: 'Strategic planning', x: 'Turned the event objectives into plans, priorities and deliverables, keeping the committee pointed the same way through three months of preparation.' },
      { icon: 'network', t: 'Cross-functional coordination', x: 'Kept seven functions aligned, so that dependencies and responsibilities were managed across the whole committee.' },
      { icon: 'rocket', t: 'Event execution', x: 'Oversaw two event days and the hackathon stages in between, from 100 competing teams down to the 25 that presented on the final day.' },
    ],
    functionsLabel: 'Functions I guided',
    functions: ['Marketing', 'Logistics', 'Partnership development', 'Public relations', 'Delegate experience', 'Finance', 'Web development'],
    build: 'The team also built Benchmark 3.0\'s own WordPress website, SEO-optimised so that searches for "Benchmark" put it at the top.',
  },

  gallery: {
    title: 'The *people* behind the experience.',
    items: [
      { id: 'benchmark-team-01', alt: 'The organising committee in black, standing together', caption: 'The organising committee, one team.', ratio: '3 / 2', span: 7 },
      { id: 'benchmark-team-02', alt: 'Committee members and partners posing in front of the Benchmark 3.0 backdrop', caption: 'In front of the Benchmark 3.0 backdrop.', ratio: '5 / 4', span: 5, pos: '50% 40%' },
      { id: 'benchmark-committee-01', alt: 'Committee members in a circle holding event cards', caption: 'The committee, in a circle.', ratio: '1 / 1', span: 4 },
      { id: 'benchmark-detail-01', alt: 'Benchmark 3.0 wristbands', caption: 'The little details.', ratio: '1 / 1', span: 4 },
      { id: 'benchmark-stage-01', alt: 'A committee member in a jacket looking out at the stage', caption: 'Looking out at the stage.', ratio: '1 / 1', span: 4, pos: '50% 40%' },
      { id: 'benchmark-team-03', alt: 'Committee members and delegates celebrating on stage', caption: 'And a moment to celebrate.', ratio: '2 / 1', span: 12, pos: '50% 62%' },
    ],
  },

  event: {
    title: 'And then, it all *came together*.',
    note: 'At SLIIT Malabe, under the tagline "Designing the Next Revolution", Benchmark 3.0 brought together 400+ delegates across two days and 100 hackathon teams.',
    timeline: [
      { when: '30 Nov 2024', t: 'Day 1', x: 'The bootcamp for delegates.' },
      { when: 'In between', t: 'Hackathon stages', x: '100 teams competed across the stages, and 25 were shortlisted.' },
      { when: '7 Dec 2024', t: 'Day 2', x: 'The 25 shortlisted teams presented their solutions on the final day.' },
    ],
    main: { id: 'benchmark-event-01', alt: 'Delegates listening to speakers in the Benchmark 3.0 session hall', ratio: '16 / 9' },
    more: [
      { id: 'benchmark-arrival-01', alt: 'Delegates arriving at the Benchmark 3.0 venue', caption: 'Delegates arrive.', ratio: '4 / 3' },
      { id: 'benchmark-event-02', alt: 'Delegates attentively following a session', caption: 'Full rooms, full attention.', ratio: '4 / 3' },
      { id: 'benchmark-event-03', alt: 'A presenter receiving a token of appreciation after a session', caption: 'Closing a session with thanks.', ratio: '4 / 3' },
    ],
    video: { id: 'benchmark-video', poster: 'benchmark-event-01' },
    credit: 'Event photography: Vivid Snaps by Rajana',
  },

  reflection: {
    title: 'More than *managing* a team.',
    body: [
      'Benchmark 3.0 was a turning point for me. It taught me that leadership is not simply about delegating work and watching deadlines.',
      'It is about *creating clarity* when things get complicated, *bringing people together* when priorities differ and *taking ownership* of the outcome when things do not go to plan, including the last-minute, high-stress moments I would never face in my day-to-day life.',
      'It also meant giving newcomers to AIESEC in SLIIT a great first experience, and learning what it takes to turn collective effort into something tangible.',
    ],
  },

  testimonials: {
    show: false, // set to true once real quotes, names and roles are added below
    title: 'A few *words* from the people who were there.',
    items: [1, 2, 3, 4].map(n => ({ id: `benchmark-testimonial-0${n}`, quote: '[Testimonial to be added]', name: '[Name]', role: '[Position / Role]' })),
  },

  closing: {
    title: 'Great things happen when people *move together*.',
    body: 'Benchmark 3.0 was a reminder of what a committed team can accomplish when people share a vision and work towards something bigger than themselves.',
  },

  seo: {
    title: 'Benchmark 3.0: Leading an 18-Member Organising Committee | Yohan Wickramasinghe',
    desc: 'How Yohan Wickramasinghe led an 18-member organising committee at AIESEC in SLIIT to deliver Benchmark 3.0, with 600+ registrations, 400+ delegates across two days and 100 competing hackathon teams.',
  },
};
