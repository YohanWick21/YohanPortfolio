/*
  Arkive Labs case study content and image slots.

  REAL SCREENSHOTS: the website section shows faithful recreations built from the live site's real copy.
  To replace one with a real screenshot, drop a file into public/assets/arkive/ named
    arkive-site-hero.(webp|jpg|png)      replaces the hero recreation
    arkive-site-system.(webp|jpg|png)    replaces the studio-system recreation
    arkive-site-approach.(webp|jpg|png)  replaces the approach recreation
  Optional brand application photos (cards, stationery, social) can be added as arkive-application-01..03.
*/
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve('public/assets/arkive');
export const akSrc = (id: string): string | null => {
  for (const e of ['webp', 'jpg', 'jpeg', 'png']) if (fs.existsSync(path.join(DIR, `${id}.${e}`))) return `/assets/arkive/${id}.${e}`;
  return null;
};

export const AK = {
  url: 'https://arkivelabs.com',
  seo: {
    title: 'Building Arkive Labs: A Founder-Led Studio Case Study | Yohan Wickramasinghe',
    desc: 'How Yohan Wickramasinghe and Akesh Chandrasiri built Arkive Labs from an idea: the brand identity, the website and the business systems behind a founder-led creative and technology studio.',
  },
  meta: [
    ['Role', 'Co-founder, brand and creative direction'],
    ['With', 'Akesh Chandrasiri, co-founder'],
    ['Category', 'Venture building, brand, digital experience and operations'],
    ['Status', 'Live, and still building'],
  ],
  opportunity: {
    title: 'We saw more potential.',
    body: [
      'Many brands had far more potential than they were expressing. We noticed a gap between what they were capable of becoming and how they were showing up in the world.',
      'There was an opportunity to approach that differently, bringing strategy, creativity and technology together to help brands move beyond what was expected of them.',
    ],
    pull: 'So we decided to build something around that belief.',
  },
  philosophy: {
    title: 'The standard for the bold.',
    body: 'Boldness is not about being loud, looking different or challenging conventions for the sake of it. It is the conviction to think differently, make deliberate decisions and create work that moves things forward.',
    values: [
      ['Integrity', 'We do not cut corners, chase trends, or say yes to things we cannot deliver. Everything we build is something we would stand behind publicly.'],
      ['Efficiency', 'We obsess over systems, tools and processes that let us do more with less, because speed and precision together compound.'],
      ['Elevation', 'We are here to raise the ceiling on what people can achieve themselves, and leave every client more capable than before.'],
      ['Service', 'We build for more than profit: real opportunities, investing in youth, and giving back to the communities we come from.'],
    ],
  },
  identity: {
    title: 'An identity with intention.',
    body: [
      'The identity was shaped around a few clear intentions: minimal, with a premium and almost luxurious feel, distinctive enough to work across digital and physical applications, and confident without being complicated.',
      'The name was chosen deliberately too. Arkive borrows from the idea of an ark: a vessel that brings valuable things together and gives them a place to be carried forward and developed. For us, that vessel holds ideas, potential and possibilities.',
      'I designed the identity and set it down in a brand guidelines document, so the system holds up in other hands: how the logo is placed, how much room it needs, which colours it lives on, and the one typeface behind it.',
    ],
    voice: ['Direct', 'Ambitious', 'Grounded', 'Empowering'],
    voiceNote: 'The guidelines also set the voice.',
    palette: [['White', '#FFFFFF', '255, 255, 255', '#000'], ['Black', '#000000', '0, 0, 0', '#fff'], ['Slate', '#B4C6E4', '180, 198, 228', '#000'], ['Gold', '#E8D8A0', '232, 216, 160', '#000']],
    note: 'Pages from the Arkive Labs brand guidelines, version 2.0. Brand direction led by Yohan, developed collaboratively with Akesh.',
  },
  digital: {
    title: 'Giving the brand a digital home.',
    body: [
      'Akesh and I built the website together, so the brand would carry into a digital experience without losing its confidence. The identity sets the tone: dark, quiet, premium, with one clear action in reach.',
      'The sections below are recreated from the live site using its real copy, so you can see how the positioning shows up on the page.',
    ],
    order: ['Hero', 'Point of view', 'Capabilities', 'How the work moves', 'What we build', 'Approach', 'The studio', 'Why Arkive', 'Blog', 'Start a conversation'],
    notes: [
      ['One message, one action.', 'The first screen says what Arkive is in a sentence and offers two ways forward: start a project, or see how we work.'],
      ['Positioning made visible.', 'The studio system diagram shows where human strategy ends and AI acceleration begins, so the positioning is explained rather than claimed.'],
      ['A process you can read.', 'Four steps, Discover, Define, Build and Measure, set out plainly so a visitor knows what working with us looks like.'],
    ],
  },
  system: {
    title: 'Building beyond the brand.',
    lead: 'Arkive was never meant to be only an identity and a website. Someone has to say yes, and then the business has to work. So we built the foundations to operate as a studio, not just look like one.',
    lanes: [
      { k: 'Winning and starting work', items: [
        ['Proposals', 'How a proposal is structured, prepared and presented.'],
        ['Client onboarding', 'How a new client comes in, and what their first experience of working with us feels like.'],
      ] },
      { k: 'Running the work', items: [
        ['Project management', 'The systems that coordinate projects and the people on them.'],
        ['Internal workflows', 'How work moves through the studio, written down as repeatable processes.'],
        ['AI-assisted production', 'Where AI speeds up production, and where human judgement stays in charge.'],
      ] },
      { k: 'Throughout', items: [
        ['Client communication', 'How we talk to clients and manage every interaction across a project.'],
      ] },
    ],
    base: { t: 'Pricing and service architecture', x: 'How the services are structured, packaged and priced. The studio is organised around four disciplines.', chips: ['Strategy and positioning', 'Digital experiences', 'Content systems', 'Performance and growth'] },
    note: 'These are private working documents, so this shows how the system is structured rather than the files themselves.',
  },
  founders: {
    title: 'Two founders, one direction.',
    lead: 'Arkive was founded by two people who believe that doing great work and doing right by people are the same idea. Strategy, creative and technology stay close together.',
    people: [
      { n: 'Yohan Wickramasinghe', r: 'Co-founder, creative direction', items: ['Brand identity and creative direction', 'Brand positioning and messaging', 'Graphic design and content strategy', 'Business development and outreach', 'Internal business systems and workflows'] },
      { n: 'Akesh Chandrasiri', r: 'Co-founder, partnerships and AI engineering', items: ['Client communication and partnerships', 'AI engineering and compliance', 'The tooling that accelerates production'] },
    ],
    shared: 'Built together: the website, and the venture itself.',
  },
  next: {
    title: 'Building is only the beginning.',
    body: [
      'The foundations are in place: the identity, the website, the services and the systems that run the studio. Now comes the next challenge, taking Arkive to the people and businesses it was built to serve.',
      'Right now we are reaching out to potential clients and preparing and sending proposals. The hardest part at this stage is getting in front of the right people and winning our first client.',
      'We are still at the beginning of that journey, and that is what makes it exciting.',
    ],
    stages: [
      ['Established', ['Brand identity', 'Website', 'Service architecture', 'Internal operating systems'], true],
      ['In progress', ['Reaching out to potential clients', 'Preparing and sending proposals'], true],
      ['Next', ['Our first client'], false],
    ],
  },
  closing: { title: 'Built with intention. Ready for what\'s next.' },
  plates: {
    logomark: ['guide-logomark', 'Logomark', 'The standalone mark.'],
    logotype: ['guide-logotype', 'Logotype', 'The wordmark, in a bold wide-spaced sans.'],
    lockup: ['guide-lockup', 'Lockup', 'The primary mark, with a fixed proportion.'],
    clear: ['guide-clearspace', 'Clear space', 'Room measured from the height of the A.'],
    min: ['guide-minsize', 'Minimum size', 'Never smaller than 50px.'],
    palette: ['guide-palette', 'Palette', 'Four colours, each with tints.'],
    combos: ['guide-combos', 'Combinations', 'Approved logo and colour pairings.'],
    type: ['guide-type', 'Typeface', 'Montserrat, throughout.'],
    weights: ['guide-weights', 'Weights', 'Regular, medium, semi-bold and bold.'],
  },
};
