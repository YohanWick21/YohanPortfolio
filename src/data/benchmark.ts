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
  hero: { id: 'benchmark-hero', alt: 'The Benchmark 3.0 organising committee on stage behind the Benchmark letter blocks', ratio: '16 / 9', pos: '50% 78%' },

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
    image: { id: 'benchmark-speaker-01', alt: 'A speaker addressing delegates at Benchmark 3.0', ratio: '4 / 5', pos: '50% 30%' },
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
      { id: 'benchmark-team-01', alt: 'The organising committee in black, standing together', caption: 'The organising committee, one team.', ratio: '3 / 2', span: 7 },
      { id: 'benchmark-team-02', alt: 'Committee members and partners posing in front of the Benchmark 3.0 backdrop', caption: 'In front of the Benchmark 3.0 backdrop.', ratio: '5 / 4', span: 5, pos: '50% 40%' },
      { id: 'benchmark-delegates-01', alt: 'Delegates in a circle holding event cards', caption: 'Delegates coming together.', ratio: '1 / 1', span: 4 },
      { id: 'benchmark-detail-01', alt: 'Benchmark 3.0 wristbands', caption: 'The little details.', ratio: '1 / 1', span: 4 },
      { id: 'benchmark-stage-01', alt: 'A committee member in a jacket looking out at the stage', caption: 'Before the doors opened.', ratio: '1 / 1', span: 4, pos: '50% 40%' },
      { id: 'benchmark-team-03', alt: 'Committee members and delegates celebrating on stage', caption: 'And a moment to celebrate.', ratio: '2 / 1', span: 12, pos: '50% 62%' },
    ],
  },

  event: {
    title: 'And then, it all *came together*.',
    note: 'Under the theme "Designing the Next Revolution", Benchmark 3.0 brought together 400+ delegates and 100+ hackathon teams.',
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
