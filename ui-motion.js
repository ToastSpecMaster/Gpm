/* Grand Prix Manager 0.10.1 — interface motion layer.
   Motion is decorative only: it never changes game state or timing. */
(() => {
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) document.documentElement.classList.add('gpm-reduce-motion');

  const revealSelector = [
    '.panel', '.mode-card', '.home-mode-card', '.management-tile', '.quick-card',
    '.stat-card', '.driver-card', '.sponsor-market-card', '.works-engine-card',
    '.operation-card', '.save-card', '.home-dashboard-grid > *'
  ].join(',');
  const seen = new WeakSet();
  let observer;

  function reveal(root) {
    if (!root || reduce) return;
    const nodes = [];
    if (root.matches?.(revealSelector)) nodes.push(root);
    root.querySelectorAll?.(revealSelector).forEach(node => nodes.push(node));
    nodes.forEach((node, index) => {
      if (seen.has(node) || node.closest('[hidden]')) return;
      seen.add(node);
      node.classList.add('gpm-motion-item');
      node.style.setProperty('--gpm-motion-delay', `${Math.min(index % 8, 7) * 55}ms`);
      if (observer) observer.observe(node);
      else node.classList.add('gpm-motion-visible');
    });
  }

  function init() {
    observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('gpm-motion-visible');
            observer.unobserve(entry.target);
          }
        }), { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
      : null;

    document.querySelectorAll('.view.active, main, .app-shell').forEach(reveal);
    document.addEventListener('click', event => {
      const nav = event.target.closest('.nav-item, [data-nav], .brand-button');
      if (nav) requestAnimationFrame(() => document.querySelectorAll('.view.active').forEach(reveal));
      const button = event.target.closest('button');
      if (button && !button.disabled && !reduce) {
        button.classList.remove('gpm-button-press');
        void button.offsetWidth;
        button.classList.add('gpm-button-press');
        setTimeout(() => button.classList.remove('gpm-button-press'), 220);
      }
    }, true);

    const mutation = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'childList') record.addedNodes.forEach(node => {
          if (node.nodeType === 1) reveal(node);
        });
        if (record.type === 'attributes' && record.target.classList?.contains('active')) reveal(record.target);
      }
    });
    mutation.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
