(() => {
  const deck = document.querySelector('.route-slides');
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll('.route-slide'));
  if (slides.length < 2) return;

  const compact = window.matchMedia('(max-width: 760px)');
  const tablist = document.createElement('div');
  const labels = {
    id: 'Pilih rute perjalanan', en: 'Choose an itinerary', de: 'Reiseroute wählen',
    es: 'Elige un itinerario', it: 'Scegli l’itinerario', ms: 'Pilih laluan perjalanan',
    pt: 'Escolha o itinerário', ru: 'Выберите маршрут', zh: '选择行程路线'
  };
  tablist.className = 'route-tabs';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', labels[document.documentElement.lang] || 'Choose an itinerary');

  let activeIndex = 0;
  const tabs = slides.map((slide, index) => {
    const heading = slide.querySelector('.sec-head h2');
    const eyebrow = slide.querySelector('.sec-head .eyebrow');
    const panelId = `route-panel-${index + 1}`;
    const tabId = `route-tab-${index + 1}`;
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.id = tabId;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    tab.textContent = (eyebrow && eyebrow.textContent.trim()) || (heading && heading.textContent.trim()) || `Route ${index + 1}`;
    slide.id = panelId;
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-labelledby', tabId);
    slide.tabIndex = 0;
    tab.addEventListener('click', () => activate(index, true));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(next, true);
      tabs[next].focus();
    });
    tablist.appendChild(tab);
    return tab;
  });

  function activate(index, focusPanel) {
    activeIndex = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === activeIndex));
      tab.tabIndex = i === activeIndex ? 0 : -1;
    });
    if (compact.matches) {
      slides.forEach((slide, i) => {
        slide.hidden = i !== activeIndex;
        slide.setAttribute('aria-hidden', String(i !== activeIndex));
      });
      if (focusPanel) slides[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      slides.forEach(slide => {
        slide.hidden = false;
        slide.removeAttribute('aria-hidden');
      });
    }
  }

  deck.parentNode.insertBefore(tablist, deck);
  const updateMode = () => {
    tablist.hidden = !compact.matches;
    activate(activeIndex, false);
  };
  updateMode();
  if (compact.addEventListener) compact.addEventListener('change', updateMode);
  else if (compact.addListener) compact.addListener(updateMode);
})();
