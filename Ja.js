/* =========================================
   SHATTERED RIFFS — script.js
   Handles two behaviours:
     1. Badge card entrance / exit animation
     2. Closing the mobile burger menu on nav click
   ========================================= */


/* -----------------------------------------
   BADGE CARD ANIMATION
   The #badgeCard element starts invisible
   (opacity: 0, translateY: 20px in CSS).
   After the page loads we add the class
   "badge-visible" to trigger the CSS
   transition that fades it in, then remove
   it a few seconds later so it fades out.
   ----------------------------------------- */
window.addEventListener('load', function () {
  const badge = document.getElementById('badgeCard');

  // Exit early if the element is not present in the DOM
  if (!badge) return;

  // Fade in after 600ms so the page has settled before the card appears
  setTimeout(function () {
    badge.classList.add('badge-visible');
  }, 600);

  // Fade out at 3600ms (visible for ~3 seconds)
  setTimeout(function () {
    badge.classList.remove('badge-visible');
  }, 3600);
});


/* -----------------------------------------
   BURGER MENU — CLOSE ON NAV CLICK
   On mobile the nav links are shown/hidden
   by a CSS-only checkbox toggle. When the
   user taps a link the page scrolls but the
   menu stays open, which looks broken.
   This listener unchecks the toggle whenever
   any nav link is clicked so the menu closes.
   ----------------------------------------- */
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('menu-toggle').checked = false;
  });
});
