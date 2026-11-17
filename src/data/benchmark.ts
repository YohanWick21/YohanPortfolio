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
  award: 'Most Outstanding Event Award, AIESEC in SLIIT',
  eyebrow: 'Leadership & event execution',
  headline: 'Leading *people*. Building *experiences*. Delivering *impact*.',
  intro: 'An ambitious event brought to life through teamwork, coordination and a shared vision.',
  hero: { id: 'benchmark-hero', alt: 'Benchmark 3.0 organising committee and delegates at the event', ratio: '21 / 9' },

  /* Figures are from the existing portfolio. Edit here once final numbers are verified. */
  stats: [
    { value: 18, suffix: '', label: 'Organising committee members led' },
    { value: 600, suffix: '+', label: 'Registrations generated' },
    { value: 400, suffix: '+', label: 'Delegates accommodated' },
    { value: 100, suffix: '+', label: 'Hackathon teams involved' },
  ],

  challenge: {
    title: 'Bringing an *ambitious vision* to life.',
    body: [
      'Delivering a large-scale event requires more than a good idea. It requires people working towards the same objectives, effective coordination between teams and the ability to keep multiple moving parts aligned.',
      'As Organising Committee President, my responsibility was to bring together an 18-member team, establish direction and ensure that our collective efforts translated into a successful event experience.',
    ],
    pull: 'The challenge was not simply organising an event. It was getting an entire team to move towards *one shared goal*.',
    image: { id: 'benchmark-planning-01', alt: 'The organising committee in a planning session', ratio: '4 / 5' },
  },

  roles: {
    title: 'Leading *beyond* the title.',
    items: [
      { icon: 'users', t: 'People leadership', x: 'Led and coordinated an 18-member organising committee, ensuring team members understood their responsibilities and worked towards shared objectives.' },
      { icon: 'compass', t: 'Strategic planning', x: 'Translated event objectives into actionable plans, priorities and deliverables, helping maintain direction throughout the preparation process.' },
      { icon: 'network', t: 'Cross-functional coordination', x: 'Worked across different organising functions, ensuring teams remained aligned and that dependencies and responsibilities were managed effectively.' },
      { icon: 'rocket', t: 'Event execution', x: 'Oversaw preparation and execution, helping ensure that plans translated into an actual event experience.' },
    ],
  },

  gallery: {
    title: 'The *people* behind the experience.',
    items: [
      { id: 'benchmark-planning-02', alt: 'Committee members planning behind the scenes', caption: 'Planning behind the scenes.', ratio: '16 / 10', span: 7 },
      { id: 'benchmark-team-01', alt: 'The Benchmark 3.0 organising committee together', caption: 'Bringing the team together.', ratio: '4 / 5', span: 5 },
      { id: 'benchmark-team-02', alt: 'Committee members working on event preparation', caption: 'Turning ideas into action.', ratio: '1 / 1', span: 4 },
      { id: 'benchmark-planning-03', alt: 'A team meeting during preparation', caption: 'A shared vision, one team.', ratio: '1 / 1', span: 4 },
      { id: 'benchmark-team-03', alt: 'Committee members at the event', caption: 'The people who made it happen.', ratio: '4 / 5', span: 4 },
      { id: 'benchmark-team-04', alt: 'The full organising committee group photograph', caption: '[Caption to be added]', ratio: '21 / 9', span: 12 },
    ],
  },

  event: {
    title: 'And then, it all *came together*.',
    note: 'Benchmark 3.0 brought together 400+ delegates and 100+ hackathon teams.',
    main: { id: 'benchmark-event-01', alt: 'Delegates and teams at Benchmark 3.0', ratio: '16 / 9' },
    more: [
      { id: 'benchmark-event-02', alt: 'A moment from the Benchmark 3.0 event', caption: '[Caption to be added]', ratio: '4 / 3' },
      { id: 'benchmark-event-03', alt: 'Another moment from the Benchmark 3.0 event', caption: '[Caption to be added]', ratio: '4 / 3' },
    ],
    video: { id: 'benchmark-video', poster: 'benchmark-event-01' },
  },

  reflection: {
    title: 'More than *managing* a team.',
    body: [
      'Benchmark 3.0 taught me that leadership is not simply about delegating responsibilities or ensuring deadlines are met.',
      'It is about *creating clarity* when things get complicated, *bringing people together* when priorities differ and *taking ownership* of the outcome even when things do not go according to plan.',
      'The experience strengthened my ability to manage people, navigate challenges and turn collective effort into something tangible.',
    ],
  },

  testimonials: {
    title: 'A few *words* from the people who were there.',
    items: [1, 2, 3, 4].map(n => ({ id: `benchmark-testimonial-0${n}`, quote: '[Testimonial to be added]', name: '[Name]', role: '[Position / Role]' })),
  },

  closing: {
    title: 'Great things happen when people *move together*.',
    body: 'Benchmark 3.0 was a reminder of what a committed team can accomplish when people share a vision and work towards something bigger than themselves.',
  },

  seo: {
    title: 'Benchmark 3.0: Leading an 18-Member Organising Committee | Yohan Wickramasinghe',
    desc: 'How Yohan Wickramasinghe led an 18-member organising committee at AIESEC in SLIIT to deliver Benchmark 3.0, with 600+ registrations, 400+ delegates and 100+ hackathon teams.',
  },
};
