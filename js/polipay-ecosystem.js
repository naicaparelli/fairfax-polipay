// Hover sincronizado: realça fatia e badges do mesmo grupo
const slices = document.querySelectorAll('.slice');
const badges = document.querySelectorAll('.badge');

function setActive(key, on) {
  slices.forEach(s => s.classList.toggle('is-active', on && s.dataset.key === key));
  badges.forEach(b => b.classList.toggle('is-active', on && b.dataset.key === key));
}

slices.forEach(s => {
  const key = s.dataset.key;
  s.addEventListener('mouseenter', () => setActive(key, true));
  s.addEventListener('mouseleave', () => setActive(key, false));
});

badges.forEach(b => {
  const key = b.dataset.key;
  b.addEventListener('mouseenter', () => setActive(key, true));
  b.addEventListener('mouseleave', () => setActive(key, false));
});
