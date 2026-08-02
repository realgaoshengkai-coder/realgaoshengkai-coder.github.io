(() => {
  document.documentElement.classList.add('js');

  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const targetSelector = group.dataset.filterTarget;
    const targets = targetSelector ? document.querySelectorAll(targetSelector) : [];
    const buttons = group.querySelectorAll('[data-filter]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach((candidate) => {
          candidate.setAttribute('aria-pressed', String(candidate === button));
        });
        targets.forEach((target) => {
          const visible = filter === 'all' || target.dataset.status === filter;
          target.classList.toggle('is-filtered', !visible);
        });
      });
    });
  });
})();

