#!/usr/bin/env python3
"""Generates the static site into the repo root. Run from the repo root: python3 tools/build.py
Content lives in tools/data.json plus the dictionaries below. Images are already optimised in /assets."""
import json, os, html
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = json.load(open(os.path.join(ROOT, 'tools/data.json')))
MAP = json.load(open(os.path.join(ROOT, 'tools/assetmap.json')))
e = html.escape

def A(old):
    """old asset filename -> web path"""
    return '/' + MAP[old]['path']
def dims(old):
    m = MAP[old]
    return m.get('w'), m.get('h')
def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, 'w').write(content)

ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>'
FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23C8FF00'/%3E%3Ctext x='32' y='42' font-family='Impact,sans-serif' font-size='30' font-style='italic' text-anchor='middle' fill='%23070707'%3EYW%3C/text%3E%3C/svg%3E"
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,900&family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet">'

NAV = [('Work', '/work/', 'work'), ('Arkive Labs', '/arkive-labs/', 'arkive'), ('About', '/about/', 'about'), ('Contact', '/contact/', 'contact')]

def head(title, desc, og=None, extra_scripts=''):
    og_tag = f'<meta property="og:image" content="{og}">' if og else ''
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
{og_tag}
<link rel="icon" href="{FAVICON}">
{FONTS}
<link rel="stylesheet" href="/css/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
'''

def top(cur, tally=False):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{n}</a>' for n, h, k in NAV)
    t = '<span class="tally" id="tally" aria-live="polite">0 of 8 shipped</span>' if tally else ''
    return f'''<header class="top">
  <a class="mark" href="/" aria-label="Yohan Wickramasinghe, home">YW</a>
  <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
  <nav id="nav" aria-label="Main">{links}{t}</nav>
</header>
'''

def cta():
    return '''<footer class="foot">
  <h2 class="display">Got something rough?</h2>
  <div class="btns">
    <a class="btn" href="/contact/">Start a project</a>
    <a class="btn line" href="https://arkivelabs.com" target="_blank" rel="noopener">arkivelabs.com</a>
  </div>
  <small class="mono"><span>Yohan Wickramasinghe, Sri Lanka</span><span><a href="https://www.linkedin.com/in/yohan-wickramasinghe/" target="_blank" rel="noopener">LinkedIn</a>, <a href="https://medium.com/@yohanwick17" target="_blank" rel="noopener">Medium</a>, <a href="https://arkivelabs.com" target="_blank" rel="noopener">Arkive Labs</a></span></small>
</footer>
'''

def page(path, title, desc, cur, body, og=None, scripts=('/js/site.js',), tally=False, footer=True):
    s = ''.join(f'<script defer src="{x}"></script>\n' for x in scripts)
    out = head(title, desc, og) + top(cur, tally) + '<main id="main">\n' + body + '\n</main>\n' + (cta() if footer else '') + s + '</body>\n</html>\n'
    write(path, out)

# ------------------------------------------------------------------ jobs for the press
def job(name, tag, img, href, meta, brief, idea, ideate, create, exe):
    old = [k for k, v in MAP.items() if '/' + v['path'] == img][0]
    w, h = MAP[old]['w'], MAP[old]['h']
    return dict(name=name, tag=tag, img=img, href=href, meta=meta, brief=brief, idea=idea, ideate=ideate, create=create, exec=exe, w=w, h=h)

IGV_META = 'iGV, AIESEC in SLIIT, 2025/26'
# DRAFT copy: written from the finished designs. Yohan to confirm or rewrite.
JOBS = [
 job('4 Week GV', 'Attraction', A('4 weeks GV v2.png'), '/work/igvirnm/', IGV_META,
     'Get students to apply for the 4 week volunteer programme.', 'Make it feel like a call you have to pick up.',
     'A volunteering trip is a big ask on a feed. A ringing phone is something nobody ignores, so the opportunity arrives as a call from AIESEC in SLIIT.',
     'The phone frame holds the screen and the headline breaks out of it, so "4 week GV" is read first. One question under it carries the emotion.',
     'One action only, Apply now, in AIESEC red with the brand footer locked in. It has to work in two seconds on a phone.'),
 job('Choose Your Impact', 'Attraction', A('Choose your impact v5.png'), '/work/igvirnm/', IGV_META,
     'Show six iGV projects in one post and let people choose.', 'A tear-off flyer. Take the one that is yours.',
     'Six projects in a list is a post nobody reads. A tear-off board turns the list into a choice, and one tab already pulled makes people want to pull theirs.',
     'Each project gets a vertical tab that reads at a glance. A display serif adds warmth against flat red, and the half-torn tab is the only thing that moves.',
     'Everything sits in one soft panel with the brand footer below, so the post stays calm even with six names on it.'),
 job('100 Approvals', 'Milestone', A('100 APD V5.png'), '/work/igvirnm/', IGV_META,
     'Mark 100 approvals in term 25.26.', 'Let the number be the poster.',
     'A milestone needs no explaining. The number does the work, so the job is to make it feel earned.',
     'A huge 100 stretched into red rails on a scratched black ground, with the same number in white on top. The hashtag closes it as the campaign tag.',
     'Dark and heavy on purpose, so it stands apart from the bright attraction posts around it in the feed.'),
 job('Hackathon Workspace', 'Event reminder', A('Workspace happening today v3.png'), '/work/igvirnm/', IGV_META,
     'Tell people the hackathon workspace is open today, 12 PM to 3 PM IST.', 'Make time the hero.',
     'The message is urgency, so the object is an alarm clock. Nobody has to read anything to know the clock is running.',
     'A big red clock in the middle, flames and blurred clocks at the edges for heat, and a discount tag as the reason to act now.',
     'Timing and processing time sit in two pill rows, the only text a reader needs to act on.'),
 job('Hackathon Final Day', 'Event push', A('Hackathon Final Day V2.png'), '/work/igvirnm/', IGV_META,
     'Push applications on the last day of the hackathon.', 'Shout it, then say it again.',
     'It is the final day, so the post should sound like a loudspeaker. The word announcement repeats until it fills the frame.',
     'A megaphone breaking out of a card, graffiti type for energy, and a calm card below holding the facts so the noise has somewhere to land.',
     'Processing time and one Apply now button, with a friendly sign-off so the urgency feels warm, not pushy.'),
 job('Christmas LCM', 'Event reminder', A('LCM Happening Tomorrow v6.png'), '/work/igvirnm/', IGV_META,
     'Remind members the Christmas LCM is tomorrow, with venue and time.', 'An advent calendar where the event is the middle square.',
     'The season was the countdown, so a December calendar carries the mood and the event takes the centre cell.',
     'Eight festive icon cells in felt-like textures around one cream cell. Date, venue and time live only in the centre.',
     'Everything a member needs, Methodist Church, Malabe, 3 PM onwards, is in one cell, so nothing has to be hunted for.'),
 job('Third Anniversary', 'Celebration', A('verdentra-cover.jpg'), '/work/verdentra/', 'Verdentra, 2026',
     'Celebrate Verdentra turning three.', 'Treat the anniversary like match day.',
     'Three years is a team result, so the wallpaper puts the company in a stadium and tells the story as a season.',
     'A giant 03 in the brand colours at the centre, banners reading Growing Together, Building the Future and Winning Together, and a scoreboard that runs Foundation, Momentum, Impact.',
     'Years of growth, innovation and impact sits under the number, with the tagline Craft. Code. Conquer. in the corner.'),
 job('Interns, Unfiltered', 'Employer brand', A('verdentra-interns-akalanka.jpg'), '/work/verdentra/', 'Verdentra, 2026',
     'Introduce the interns in their own words.', 'One layout, five voices.',
     'Interns say more about a workplace than a company page can. The post leads with their own quote, and the same layout runs across five people so it reads as a series.',
     'A torn-paper quote card beside the intern’s photo under the headline Interns, Unfiltered, with the key words of each quote picked out in colour so it scans in a second.',
     'Name and role sit under the photo, and an Applications are open pill carries the call to action, so every post doubles as a recruitment ask.'),
]
write('js/jobs.js', '/* Generated by tools/build.py. Edit the JOBS list there. */\nwindow.YW_JOBS=' + json.dumps(JOBS, indent=1, ensure_ascii=False) + ';\n')

# ------------------------------------------------------------------ projects data
ORDER = ['verdentra', 'igvirnm', 'nlds', 'catalyst', 'goldcoin', 'merch']
P = D['projects']
CARDS = {c['slug']: c for c in D['cards']}
CARDS['verdentra'] = {'slug': 'verdentra', 'category': 'employer', 'img': 'verdentra-cover.jpg', 'cat': 'Employer Branding', 'badge': 'Current',
    'title': 'Building an Employer Brand From the Inside Out',
    'desc': 'Running social media, internal communications and the Verdentra Waves CSR programme, with campaigns owned from first idea to published post.',
    'tags': ['Employer Branding', 'Social Media', 'Internal Comms', 'CSR']}
P['verdentra'] = {
    'chip': 'Verdentra', 'badge': 'Current', 'year': '2026',
    'h1': ['Building an Employer', 'Brand From the Inside Out'],
    'desc': CARDS['verdentra']['desc'],
    'stats': [{'n': 'Exec.', 'l': 'Employer Branding & Comms'}, {'n': '5', 'l': 'Interns in one series'}, {'n': '3 years', 'l': 'Of Verdentra celebrated'}, {'n': 'Waves', 'l': 'CSR programme'}],
    'cover': 'verdentra-cover.jpg', 'ovtitle': 'The idea behind the work',
    'paras': [
        'Verdentra is a cloud, data and AI consultancy working with software vendors. My job is to make the company easy to understand, easy to trust and a place people want to work.',
        'I own the social media output, and I take every campaign from the first idea through to creation and publishing. I also run internal communications and engagement activities, so the way Verdentra talks to its own team matches the way it talks to the world. The work below includes Interns, Unfiltered, a series built on interns’ own words, recruitment calls for the blog team, a welcome template for new joiners, and celebration pieces such as the third anniversary wallpaper and the annual office trip.',
        'Outside the channels, I lead Verdentra Waves, the company’s CSR programme, planning and running the events that put its values into practice.'],
    'rows': [{'l': 'Role', 'v': 'Exec. Employer Branding & Comms'}, {'l': 'Company', 'v': 'Verdentra'},
             {'l': 'Scope', 'v': 'Social media, internal comms, engagement, CSR'}, {'l': 'Programme', 'v': 'Verdentra Waves'}],
    'gallery': [{'src': s, 'tag': t} for s, t in [
        ('verdentra-cover.jpg', 'Third anniversary wallpaper'), ('verdentra-interns-akalanka.jpg', 'Interns, Unfiltered: Akalanka'),
        ('verdentra-blog-team.jpg', 'Blog team recruitment'), ('verdentra-office-trip.jpg', 'Annual office trip'),
        ('verdentra-interns-thesara.jpg', 'Interns, Unfiltered: Thesara'), ('verdentra-blog-post.jpg', 'Technical blog post'),
        ('verdentra-movie-night.jpg', 'Movie night'), ('verdentra-interns-seenujan.jpg', 'Interns, Unfiltered: Seenujan'),
        ('verdentra-new-joiner.jpg', 'New joiner welcome template'), ('verdentra-poson.jpg', 'Poson greeting'),
        ('verdentra-interns-senal.jpg', 'Interns, Unfiltered: Senal'), ('verdentra-wallpaper.jpg', 'Culture wallpaper'),
        ('verdentra-interns-umasha.jpg', 'Interns, Unfiltered: Umasha')]],
    'steps': [
        {'t': 'Understand', 'x': 'Get clear on the audience, whether that is a prospective client, a candidate or the team, and on what the company needs them to feel.'},
        {'t': 'Ideate', 'x': 'Turn that into campaign ideas, content pillars and creative directions before anything is designed.'},
        {'t': 'Create', 'x': 'Produce the posts, carousels, graphics and event materials myself, so the idea and the finished piece stay connected.'},
        {'t': 'Execute', 'x': 'Publish on a steady calendar, run the events, then look at what worked and adjust the next round.'}],
    'outcomes': [
        {'t': 'Idea to published', 'x': 'One person owns each campaign from concept to post, which keeps the message consistent.'},
        {'t': 'A series, not one-offs', 'x': 'Interns, Unfiltered runs one layout across five people, so each post builds on the last.'},
        {'t': 'One voice, inside and out', 'x': 'Internal communications and external content follow the same brand and tone.'},
        {'t': 'Values in action', 'x': 'Verdentra Waves turns the company’s CSR intent into events people take part in.'}]}
FILTERS = [('all', 'All'), ('employer', 'Employer brand'), ('campaign', 'Campaigns'), ('event', 'Events'), ('branding', 'Branding'), ('corporate', 'Corporate')]

def pills(tags, first_fill=True):
    return '<ul class="pills">' + ''.join(f'<li{" class=fill" if i == 0 and first_fill else ""}>{e(t)}</li>' for i, t in enumerate(tags)) + '</ul>'

# ------------------------------------------------------------------ HOME
def build_home():
    strip = ''.join(f'<figure><a class="proof" href="/work/verdentra/"><img src="{A(s)}" alt="{e(a)}" width="{dims(s)[0]}" height="{dims(s)[1]}" loading="lazy"></a><figcaption class="mono">{e(c)}</figcaption></figure>'
                    for s, a, c in [('verdentra-movie-night.jpg', 'Verdentra movie night poster', 'Movie night'), ('verdentra-poson.jpg', 'Verdentra Poson greeting post', 'Poson'),
                                    ('verdentra-interns-thesara.jpg', 'Interns, Unfiltered post', 'Interns, Unfiltered'), ('verdentra-office-trip.jpg', 'Verdentra office trip post', 'Office trip')])
    body = f'''<section class="hero" aria-labelledby="h1">
  <h1 class="display" id="h1">From rough idea to published.</h1>
  <div class="intro">
    <p>I'm Yohan. I co-founded Arkive Labs and I lead employer branding and comms at Verdentra. Here is how a job moves from my head to your feed.</p>
    <p class="how"><strong>Pick a job from the queue, then drag the puck.</strong> Watch real campaigns turn from a brief into a published post.</p>
  </div>
  <div class="queue" role="group" aria-label="Jobs in the queue"><span class="label mono">Queue</span></div>
  <div class="machine">
    <div class="card-wrap">
      <div class="card" id="card" aria-label="The work in progress. Drag sideways to move it along.">
        <div class="layer note" id="note">
          <div><span class="k mono">The brief</span><p class="brief" id="nBrief"></p></div>
          <hr>
          <div><span class="k mono">The idea</span><h2 class="display idea" id="nIdea"></h2></div>
          <div class="foot mono"><span id="nTag"></span><span id="nSize"></span></div>
        </div>
        <canvas class="layer bp" id="bp" width="540" height="675" aria-hidden="true"></canvas>
        <img class="layer color" id="colorImg" alt="">
        <div class="scan" id="scan"></div>
        <span class="dims mono" id="dims"></span>
        <div class="layer chrome" id="chrome"><span class="pub-pill"><i></i>Published</span></div>
        <div class="stamp" id="stamp">Published</div>
      </div>
    </div>
    <div class="panel" id="panel">
      <div class="stage-row"><span class="stage-no" id="stageNo">01 / 03</span><div class="display stage-word" id="stageWord">Ideate</div></div>
      <p class="mono meta" id="meta"></p>
      <div class="qa"><span class="k mono">The question I ask</span><p class="q" id="qText"></p></div>
      <div class="qa"><span class="k mono">What I did on this job</span><p id="doText"></p></div>
      <div class="after" id="after" hidden>
        <button class="btn line" type="button" id="nextJob">Next job</button>
        <a class="btn line" id="projLink" href="/work/">See the full project</a>
        <a class="btn" href="/arkive-labs/">Do this for my brand</a>
      </div>
    </div>
  </div>
  <div class="rail">
    <div class="stations" id="stations"></div>
    <div class="belt" aria-hidden="true"><div class="fill" id="fill"></div></div>
    <label class="sr" for="run">Move the work along: from idea to published</label>
    <input type="range" id="run" min="0" max="1000" step="1" value="0">
    <p class="rail-hint mono">Drag the puck, drag the card, or use the arrow keys. Each stage changes what you see.</p>
  </div>
  <p class="sr" id="live" aria-live="polite"></p>
</section>

<section class="sec" aria-labelledby="ak-h">
  <div class="sec-head">
    <h2 class="display" id="ak-h">Same method, your brand</h2>
    <p>What you just dragged is how Arkive Labs works, with strategy before design and design before launch.</p>
  </div>
  <div class="map">
    <article><span class="n">01 Ideate</span><h3 class="display">Strategy and positioning</h3><p>Market positioning, messaging and brand strategy that give a business a clear story to build on.</p></article>
    <article><span class="n">02 Create</span><h3 class="display">Brand and creative</h3><p>Visual identity, campaign creative and content direction that make that story look and feel unmistakably yours.</p></article>
    <article><span class="n">03 Execute</span><h3 class="display">Digital and growth</h3><p>Websites, content, SEO and performance campaigns, built as one system and measured so we know what's working.</p></article>
  </div>
  <div class="ak">
    <div class="ak-logo"><img src="{A('Full Logo Black.png')}" alt="Arkive Labs logo" width="{dims('Full Logo Black.png')[0]}" height="{dims('Full Logo Black.png')[1]}"></div>
    <div>
      <p class="lead">A strategy-led creative and digital studio that turns what a business is genuinely good at into something the market can understand and trust.</p>
      <p>I co-founded Arkive Labs with Akesh Chandrasiri, who leads AI engineering and compliance. I lead brand strategy, visual identity, content and digital experience for founders, startups and growing SMEs, mostly Sri Lankan and regional brands.</p>
      <div class="btns"><a class="btn" href="/arkive-labs/">The studio</a><a class="btn line" href="https://arkivelabs.com" target="_blank" rel="noopener">Visit arkivelabs.com</a></div>
    </div>
  </div>
</section>

<section class="sec paper" aria-labelledby="v-h">
  <div class="sec-head">
    <h2 class="display" id="v-h">Inside Verdentra</h2>
    <p>The same press, running every week on a live employer brand.</p>
  </div>
  <ul class="roles"><li>Exec. Employer Branding &amp; Comms</li><li>Social media</li><li>Campaigns</li><li>Internal comms</li><li>Verdentra Waves, CSR</li></ul>
  <div class="v-grid">{strip}</div>
  <div class="btns" style="margin-top:2.4rem"><a class="btn" style="background:var(--ink);border-color:var(--ink);color:var(--stock)" href="/work/">See all work</a></div>
</section>'''
    page('index.html', 'Yohan Wickramasinghe | Co-founder, Arkive Labs. Employer branding, Verdentra',
         'Yohan Wickramasinghe co-founded Arkive Labs and leads employer branding and communications at Verdentra. Drag a job from rough idea to published post.',
         None, body, og=None, scripts=('/js/site.js', '/js/jobs.js', '/js/machine.js'), tally=True)

# ------------------------------------------------------------------ WORK
def build_work():
    cards = ''
    for s in ORDER:
        c = CARDS[s]
        w, h = dims(c['img'])
        cards += f'''<article class="pcard" data-cat="{c['category']}">
  <a class="proof" href="/work/{s}/" aria-label="{e(c['title'])}"><img src="{A(c['img'])}" alt="" width="{w}" height="{h}" loading="lazy"></a>
  <div class="meta mono"><span>{e(c['cat'])}</span><span>{e(P[s]['year'])}</span></div>
  <h3 class="display"><a href="/work/{s}/" style="text-decoration:none">{e(c['title'])}</a></h3>
  <p>{e(c['desc'])}</p>
  {pills(c['tags'])}
</article>'''
    chips = ''.join(f'<button class="chip" type="button" data-f="{k}" aria-pressed="{"true" if k == "all" else "false"}">{n}</button>' for k, n in FILTERS)
    body = f'''<section class="page-head">
  <h1 class="display">Work</h1>
  <p class="sub">Employer brand, campaigns, events and identity. The press on the homepage runs a few of these in miniature.</p>
</section>
<section class="sec paper" aria-label="Projects">
  <div class="filters" role="group" aria-label="Filter projects">{chips}</div>
  <div class="cards">{cards}</div>
</section>'''
    page('work/index.html', 'Work | Yohan Wickramasinghe', 'Employer branding, campaigns, event promotion, corporate communications and brand design by Yohan Wickramasinghe.', 'work', body)

# ------------------------------------------------------------------ PROJECT PAGES
def build_project(s):
    p, c = P[s], CARDS[s]
    i = ORDER.index(s)
    prev_s, next_s = ORDER[i - 1], ORDER[(i + 1) % len(ORDER)]
    h1 = ' '.join(p['h1'])
    stats = ''.join(f'<div class="stat"><b>{e(x["n"])}</b><span>{e(x["l"])}</span></div>' for x in p['stats'])
    paras = ''.join(f'<p>{e(t)}</p>' for t in p['paras'])
    facts = ''.join(f'<div><dt>{e(x["l"])}</dt><dd>{e(x["v"])}</dd></div>' for x in p['rows'])
    steps = ''.join(f'<article><span class="n">0{n + 1}</span><h3 class="display">{e(x["t"])}</h3><p>{e(x["x"])}</p></article>' for n, x in enumerate(p['steps']))
    outs = ''.join(f'<article><h3 class="display">{e(x["t"])}</h3><p>{e(x["x"])}</p></article>' for x in p['outcomes'])
    gal = ''
    for g in p['gallery']:
        w, h = dims(g['src'])
        gal += f'<button class="g-item" type="button" data-full="{A(g["src"])}" data-tag="{e(g["tag"])}" data-alt="{e(g["tag"])}"><img src="{A(g["src"])}" alt="{e(g["tag"])}" width="{w}" height="{h}" loading="lazy"><span class="mono">{e(g["tag"])}</span></button>'
    cw, ch = dims(p['cover'])
    body = f'''<section class="p-head">
  <p class="crumb mono"><a href="/work/">Work</a><span>/</span><span>{e(p['chip'])}</span></p>
  <div class="chips"><span class="pill fill">{e(p['badge'])}</span><span class="mono">{e(p['year'])}</span></div>
  <h1 class="display">{e(h1)}</h1>
  <p class="desc">{e(p['desc'])}</p>
  <div class="stats">{stats}</div>
</section>
<section class="cover"><div class="proof"><img src="{A(p['cover'])}" alt="{e(c['title'])}" width="{cw}" height="{ch}"></div></section>
<section class="sec paper" aria-labelledby="ov">
  <div class="overview">
    <div><h2 class="display" id="ov">{e(p['ovtitle'])}</h2>{paras}</div>
    <dl class="facts">{facts}</dl>
  </div>
</section>
<section class="sec" aria-labelledby="pr">
  <div class="sec-head"><h2 class="display" id="pr">Process</h2><p>How the work moved from brief to finished.</p></div>
  <div class="steps">{steps}</div>
</section>
<section class="sec paper" aria-labelledby="gl">
  <div class="sec-head"><h2 class="display" id="gl">The work</h2><p>Select any piece to view it full size.</p></div>
  <div class="gallery">{gal}</div>
</section>
<section class="sec" aria-labelledby="oc">
  <div class="sec-head"><h2 class="display" id="oc">Outcomes</h2></div>
  <div class="outcomes">{outs}</div>
</section>
<nav class="pn paper" aria-label="More projects">
  <a href="/work/{prev_s}/"><span class="mono">Previous</span><span class="display">{e(P[prev_s]['chip'])}</span></a>
  <a href="/work/{next_s}/"><span class="mono">Next</span><span class="display">{e(P[next_s]['chip'])}</span></a>
</nav>
<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Image viewer"><button class="x" type="button" aria-label="Close">&#x2715;</button><button class="pv" type="button" aria-label="Previous image">&#x2039;</button><img alt=""><button class="nx" type="button" aria-label="Next image">&#x203A;</button><p class="mono"></p></div>'''
    page(f'work/{s}/index.html', f'{h1} | Yohan Wickramasinghe', p['desc'], 'work', body, og=A(p['cover']))

# ------------------------------------------------------------------ ARKIVE LABS
def build_arkive():
    offers = ''.join(f'<article><span class="n">0{n + 1} {st}</span><h3 class="display">{e(t)}</h3><p>{e(d)}</p></article>' for n, (st, t, d) in enumerate([
        ('Ideate', 'Strategy and positioning', 'Market positioning, messaging and brand strategy that give a business a clear story to build on.'),
        ('Create', 'Brand and creative', 'Visual identity, campaign creative and content direction that make that story look and feel unmistakably yours.'),
        ('Execute', 'Digital and growth', 'Websites, content, SEO and performance campaigns, built as one system and measured so we know what’s working.')]))
    offers = offers.replace('01 Ideate', '01 Ideate').replace('<span class="n">0', '<span class="n">0')
    lw, lh = dims('Full Logo Black.png')
    body = f'''<section class="page-head">
  <div class="ak-hero">
    <div>
      <h1 class="display">Arkive Labs</h1>
      <p class="sub">A strategy-led creative and digital studio that turns what a business is genuinely good at into something the market can understand and trust.</p>
      <div class="btns" style="margin-top:1.8rem"><a class="btn" href="https://arkivelabs.com" target="_blank" rel="noopener">Visit arkivelabs.com</a><a class="btn line" href="/contact/">Talk to me first</a></div>
    </div>
    <div class="ak-logo"><img src="{A('Full Logo Black.png')}" alt="Arkive Labs logo" width="{lw}" height="{lh}"></div>
  </div>
</section>
<section class="sec paper" aria-labelledby="w">
  <div class="split">
    <h2 class="display" id="w">What we do</h2>
    <div>
      <p class="lead-p">We help capable businesses explain themselves clearly. That means positioning, brand, websites, content and campaigns, all built from a real understanding of what the company does and why it matters.</p>
      <p>Plenty of strong companies struggle to communicate their value, so the market overlooks them. We start with the business, not the deliverable. Understand first, clarify the story, then build the presence that carries it.</p>
    </div>
  </div>
</section>
<section class="sec" aria-labelledby="f">
  <div class="split">
    <h2 class="display" id="f">Who it is for</h2>
    <div><p class="lead-p">Founders, early-stage startups, and growing SMEs who have real substance but a message that hasn’t caught up.</p>
    <p style="color:var(--mute)">We work mostly with Sri Lankan and regional brands, and with technically complex businesses that need their value translated into plain, confident language.</p></div>
  </div>
</section>
<section class="sec paper" aria-labelledby="o">
  <div class="sec-head"><h2 class="display" id="o">What we offer</h2><p>The same three stages you can drag through on the homepage.</p></div>
  <div class="map" style="border-top-color:var(--ink)">{offers}</div>
</section>
<section class="sec" aria-labelledby="r">
  <div class="split">
    <h2 class="display" id="r">My role</h2>
    <div><p class="lead-p">I’m co-founder and creative director at Arkive Labs, leading brand strategy, visual identity, content and digital experience.</p>
    <p style="color:var(--mute)">I built it with Akesh Chandrasiri, who leads AI engineering and compliance. Together we keep strategy, design and technology under one roof, so the people shaping the idea are the people building it.</p>
    <div class="btns" style="margin-top:1.4rem"><a class="btn" href="https://arkivelabs.com" target="_blank" rel="noopener">Visit arkivelabs.com</a></div></div>
  </div>
</section>'''
    page('arkive-labs/index.html', 'Arkive Labs | Yohan Wickramasinghe', 'Arkive Labs is a strategy-led creative and digital studio that turns what a business is genuinely good at into something the market can understand and trust.', 'arkive', body)
    # map css uses .map; paper variant text colours
    return

# ------------------------------------------------------------------ ABOUT
def build_about():
    a = D['about']
    bio = [
        'I’m a co-founder and employer branding specialist. I co-founded Arkive Labs, and at Verdentra I lead employer branding and communications, from social campaigns to internal engagement to our CSR programme, Verdentra Waves.',
        'I started in design, building campaigns and event brands with AIESEC in SLIIT, and I still make the work myself. That background is why I care about how a company looks and sounds as much as what it says: clarity, consistency and people at the centre.']
    exp = [
        {'date': 'Sep 2026 - Present', 'role': 'Co-founder & Creative Director', 'company': 'Arkive Labs', 'bullets': [
            'Lead brand strategy, visual identity, content and digital experience at a strategy-led creative and digital studio',
            'Built the studio with co-founder Akesh Chandrasiri, keeping strategy, design and technology under one roof']},
        {'date': 'Jun 2026 - Present', 'role': 'Exec. Employer Branding & Comms', 'company': 'Verdentra', 'bullets': [
            'Own social media end to end, taking each campaign from ideation to creation and execution',
            'Lead internal communications and engagement activities that keep the team connected',
            'Run Verdentra Waves, the company’s CSR programme and events']}]
    for x in a['exp']:
        exp.append(dict(x, date=x['date'].replace('- Present', '- Jun 2026')) if x['company'].startswith('Hype') else x)
    det = ''
    for d in a['details']:
        v = (f'<a href="{e(d["href"])}"' + (' target="_blank" rel="noopener"' if d['href'].startswith('http') else '') + f'>{e(d["v"])}</a>') if d['href'] else e(d['v'])
        det += f'<div><dt>{e(d["l"])}</dt><dd>{v}</dd></div>'
    exp_html = ''.join(f'<li><p class="date">{e(x["date"])}</p><div><h3 class="display">{e(x["role"])}</h3><p class="co">{e(x["company"])}</p><ul>' + ''.join(f'<li style="display:list-item;border:0;padding:0">{e(b)}</li>' for b in x['bullets']) + '</ul></div></li>' for x in exp)
    edu_html = ''.join(f'<li><span class="badge" aria-hidden="true">{e(x["icon"])}</span><div><h3 class="display">{e(x["degree"])}</h3><p>{e(x["school"])}</p><p>{e(x["note"])}</p></div><p class="year">{e(x["year"])}</p></li>' for x in a['edu'])
    lead = ''.join(f'<article class="lead-card"><span class="pill">{e(x["tag"])}</span><h3 class="display">{e(x["title"])}</h3><p class="mono">{e(x["when"])}</p><p>{e(x["desc"])}</p></article>' for x in a['lead'])
    pw, ph = dims(a['photo'])
    body = f'''<section class="page-head">
  <div class="about">
    <div class="portrait"><img src="{A(a['photo'])}" alt="Yohan Wickramasinghe" width="{pw}" height="{ph}"></div>
    <div>
      <h1 class="display" style="margin-bottom:1.2rem">Yohan Wickramasinghe</h1>
      <p class="lead">Co-founder of Arkive Labs. Exec. Employer Branding &amp; Comms at Verdentra.</p>
      <p>{e(bio[0])}</p><p>{e(bio[1])}</p>
      <dl class="dl">{det}</dl>
      <div class="btns" style="margin-top:1.6rem"><a class="btn" href="/assets/yohan-cv.pdf" target="_blank" rel="noopener">View CV</a><a class="btn line" href="https://medium.com/@yohanwick17" target="_blank" rel="noopener">Writing on Medium</a></div>
    </div>
  </div>
</section>
<section class="sec paper" aria-labelledby="ex">
  <div class="sec-head"><h2 class="display" id="ex">Experience</h2></div>
  <ol class="exp" style="list-style:none;margin:0;padding:0;border-top:1.5px solid var(--ink)">{exp_html}</ol>
</section>
<section class="sec" aria-labelledby="ed">
  <div class="sec-head"><h2 class="display" id="ed">Education</h2></div>
  <ol class="edu" style="border-top-color:var(--stock)">{edu_html}</ol>
</section>
<section class="sec paper" aria-labelledby="ld">
  <div class="sec-head"><h2 class="display" id="ld">Leadership and volunteering</h2><p>The work I do outside the day job, mostly with AIESEC in SLIIT.</p></div>
  <div class="lead-grid">{lead}</div>
</section>'''
    body = body.replace('<ol class="edu"', '<ol class="edu on-ink"')
    page('about/index.html', 'About | Yohan Wickramasinghe', 'Yohan Wickramasinghe is the co-founder of Arkive Labs and leads employer branding and communications at Verdentra.', 'about', body, og=A(a['photo']))

# ------------------------------------------------------------------ CONTACT
def build_contact():
    kinds = ['Brand and strategy', 'A campaign', 'Employer branding', 'A website', 'Something else']
    opts = ''.join(f'<span><input type="radio" name="kind" id="k{i}" value="{e(k)}"{" checked" if i == 0 else ""}><label for="k{i}">{e(k)}</label></span>' for i, k in enumerate(kinds))
    body = f'''<section class="page-head">
  <h1 class="display">Got something rough?</h1>
  <p class="sub">Send me the rough version. I read every brief, and I will come back with a first idea of how I would take it from here to published.</p>
</section>
<section class="sec paper" aria-label="Send a brief">
  <form class="form" name="brief" method="POST" action="/contact/thanks/" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="brief">
    <p class="hp"><label>Leave this empty <input name="bot-field"></label></p>
    <div class="field"><label for="name">Your name</label><input class="in" id="name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="email">Your email</label><input class="in" id="email" name="email" type="email" autocomplete="email" required></div>
    <fieldset class="field"><legend>What is it?</legend><div class="opts">{opts}</div></fieldset>
    <div class="field"><label for="idea">The rough idea</label><textarea class="in" id="idea" name="idea" required placeholder="A sentence is enough. Who is it for, and what should they do?"></textarea></div>
    <div class="field"><label for="where">Where should it end up? (optional)</label><input class="in" id="where" name="where" type="text" placeholder="Instagram, a website, a careers page, print"></div>
    <button class="btn" type="submit">Send the brief</button>
  </form>
  <div class="direct"><p class="mono">Or reach me directly</p><a href="mailto:yohanwick17@gmail.com">yohanwick17@gmail.com</a><a href="https://www.linkedin.com/in/yohan-wickramasinghe/" target="_blank" rel="noopener">LinkedIn</a><a href="https://arkivelabs.com" target="_blank" rel="noopener">arkivelabs.com</a></div>
</section>'''
    page('contact/index.html', 'Contact | Yohan Wickramasinghe', 'Send Yohan Wickramasinghe a rough idea and get a first take on how to take it to published.', 'contact', body, footer=False)
    thanks = '''<section class="page-head"><h1 class="display">Brief received</h1><p class="sub">Thanks. I will read it and reply by email.</p><div class="btns" style="margin-top:1.6rem"><a class="btn" href="/">Back to the press</a><a class="btn line" href="/work/">See the work</a></div></section>'''
    page('contact/thanks/index.html', 'Brief received | Yohan Wickramasinghe', 'Thanks for your brief.', 'contact', thanks, footer=False)
    nf = '''<section class="page-head"><h1 class="display">Lost in the queue</h1><p class="sub">That page does not exist. Try the homepage or the work.</p><div class="btns" style="margin-top:1.6rem"><a class="btn" href="/">Home</a><a class="btn line" href="/work/">Work</a></div></section>'''
    page('404.html', 'Page not found | Yohan Wickramasinghe', 'Page not found.', None, nf, footer=False)

build_home(); build_work()
for s in ORDER: build_project(s)
build_arkive(); build_about(); build_contact()
print('built')
