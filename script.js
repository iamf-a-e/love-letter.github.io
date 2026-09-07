const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const row = document.getElementById('choiceRow');

let dodges = 0;
const maxScale = 2.1;

function moveNoButton() {
  const bounds = row.getBoundingClientRect();
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const maxX = Math.max(bounds.width - btnW, 0) / 2;
  const maxY = Math.max(bounds.height - btnH, 0) / 2;

  const x = (Math.random() * 2 - 1) * maxX;
  const y = (Math.random() * 2 - 1) * maxY;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function growYesButton() {
  dodges = Math.min(dodges + 1, 6);
  const scale = 1 + (dodges / 6) * (maxScale - 1);
  yesBtn.style.transform = `scale(${scale})`;

  const shrink = Math.max(1 - dodges * 0.12, 0.4);
  noBtn.style.opacity = shrink;
  noBtn.style.fontSize = `${15 * shrink}px`;
}

noBtn.addEventListener('mouseenter', () => {
  moveNoButton();
  growYesButton();
});

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButton();
  growYesButton();
});

noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
  growYesButton();
}, { passive: false });

yesBtn.addEventListener('click', () => {
  window.location.href = 'letter.html';
});
