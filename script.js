const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const row = document.getElementById('choiceRow');

let dodges = 0;
const maxScale = 1.5;
const edgeMargin = 16; // keep the button fully on-screen
let freed = false;

// Release the "Not yet" button from choiceRow's cramped 120px box so it can
// roam the whole viewport instead of being squeezed right next to Yes.
function freeNoButton() {
  if (freed) return;
  const rect = noBtn.getBoundingClientRect();
  noBtn.style.position = 'fixed';
  noBtn.style.left = `${rect.left}px`;
  noBtn.style.top = `${rect.top}px`;
  noBtn.style.margin = '0';
  noBtn.style.transform = 'none';
  freed = true;
}

function moveNoButton() {
  freeNoButton();
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const maxX = Math.max(window.innerWidth - btnW - edgeMargin * 2, 0);
  const maxY = Math.max(window.innerHeight - btnH - edgeMargin * 2, 0);
  const x = edgeMargin + Math.random() * maxX;
  const y = edgeMargin + Math.random() * maxY;
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function growYesButton() {
  dodges = Math.min(dodges + 1, 6);
  const scale = 1 + (dodges / 6) * (maxScale - 1);
  yesBtn.style.transform = `scale(${scale})`;
  // Not yet no longer fades or shrinks — it stays fully visible every time.
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
  if (window.startBgMusic) window.startBgMusic();
  // Tiny delay so audio.play() has a moment to actually begin
  // before the page starts unloading for navigation.
  setTimeout(() => {
    window.location.href = 'letter.html';
  }, 50);
});
