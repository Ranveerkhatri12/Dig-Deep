document.documentElement.classList.add('js');

const world = document.querySelector('.world');
const depthEl = document.getElementById('depth');
const zoneEl = document.getElementById('zone');
const storyEl = document.getElementById('story');

const MAX_DEPTH = 120;

const zones = [
  [0, 'Topsoil'],
  [0.3, 'Subsoil'],
  [3, 'Root Zone'],
  [15, 'Bedrock'],
  [30, 'Fossil Layer'],
  [80, 'Dinosaur Layer'],
];

const story = [
  [0, 'Psst! Our mascot is missing. I heard it fell asleep underground ages ago.'],
  [0.12, 'Come on, let us dig! The ants know every tunnel down here.'],
  [0.6, 'The worm says it has not seen anything. Keep going!'],
  [1.5, 'Rabbit swears it heard something big and sleepy further down.'],
  [4, 'These roots go deep. Hold on to your helmet!'],
  [12, 'Even the spiders wear hard hats in this place.'],
  [16, 'Is that a beaver with a digger? Fancy.'],
  [20, 'Solid rock now. The really old stuff starts here.'],
  [34, 'Bones and shells. Very old, but not our mascot.'],
  [38, 'Ooh, treasure! Hmm, still not what we came for.'],
  [60, 'Fossils everywhere. We are getting warmer!'],
  [85, 'Dinosaur layer! Shhh, tiptoe from here.'],
  [101, 'Do you hear that? I think it is snoring.'],
  [112, 'Is that... it? Keep scrolling!'],
];

function toEmoji(img) {
  const span = document.createElement('span');
  span.className = img.className;
  span.textContent = img.dataset.emoji;
  span.setAttribute('aria-label', img.alt);
  img.replaceWith(span);
}

document.querySelectorAll('img[data-emoji]').forEach(img => {
  if (img.complete && img.naturalWidth === 0) {
    toEmoji(img);
  } else {
    img.addEventListener('error', () => toEmoji(img));
  }
});

function formatDepth(d) {
  if (d < 1) return Math.round(d * 100) + ' cm';
  if (d < 10) return d.toFixed(1) + ' m';
  return Math.round(d) + ' m';
}

function update() {
  const y = window.scrollY + window.innerHeight / 2;
  const total = world.offsetHeight - 500;
  const f = Math.min(Math.max(y / total, 0), 1);
  const depth = f * f * MAX_DEPTH;

  depthEl.textContent = formatDepth(depth);

  let zone = zones[0][1];
  for (const [d, name] of zones) if (depth >= d) zone = name;
  zoneEl.textContent = zone;

  let line = story[0][1];
  for (const [d, text] of story) if (depth >= d) line = text;
  if (mascot.classList.contains('awake')) line = 'Found you! Welcome to the event!';
  if (storyEl.textContent !== line) {
    storyEl.textContent = line;
    storyEl.classList.remove('pop');
    void storyEl.offsetWidth;
    storyEl.classList.add('pop');
  }
}

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.item, .fact').forEach(el => reveal.observe(el));

world.addEventListener('click', e => {
  const item = e.target.closest('.item[data-fact]');
  if (!item) return;
  document.querySelectorAll('.item.open').forEach(o => {
    if (o !== item) o.classList.remove('open');
  });
  item.classList.toggle('open');
});

function throwConfetti() {
  const colors = ['#ff5252', '#ffd84a', '#4caf50', '#40c4ff', '#e040fb'];
  for (let i = 0; i < 60; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti';
    bit.style.left = Math.random() * 100 + 'vw';
    bit.style.background = colors[i % colors.length];
    bit.style.animationDuration = 2 + Math.random() * 2.5 + 's';
    bit.style.animationDelay = Math.random() * 0.8 + 's';
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 6000);
  }
}

const mascot = document.querySelector('.mascot');
const wake = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !mascot.classList.contains('awake')) {
    mascot.classList.add('awake');
    storyEl.textContent = 'Found you! Welcome to the event!';
    throwConfetti();
    wake.disconnect();
  }
}, { threshold: 0.7 });
wake.observe(mascot);

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();
