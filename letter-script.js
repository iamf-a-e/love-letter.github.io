const envelope = document.getElementById('envelope');
const tapHint = document.getElementById('tapHint');
const overlay = document.getElementById('overlay');
const closeLetter = document.getElementById('closeLetter');

let stage = 'closed'; // closed -> open -> reading

function spawnHearts() {
  const container = document.createElement('div');
  container.className = 'hearts';
  document.body.appendChild(container);

  const count = 10;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.textContent = '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 0.6}s`;
    heart.style.fontSize = `${12 + Math.random() * 14}px`;
    container.appendChild(heart);
  }

  setTimeout(() => container.remove(), 4000);
}

function openEnvelope() {
  envelope.classList.add('open');
  stage = 'open';
  tapHint.textContent = 'tap again to read';
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    spawnHearts();
  }
}

function showFullLetter() {
  overlay.classList.add('visible');
  stage = 'reading';
}

envelope.addEventListener('click', () => {
  if (stage === 'closed') {
    openEnvelope();
  } else if (stage === 'open') {
    showFullLetter();
  }
});

closeLetter.addEventListener('click', () => {
  overlay.classList.remove('visible');
  stage = 'open';
  tapHint.textContent = 'tap again to read';
});
