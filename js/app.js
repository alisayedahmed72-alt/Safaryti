import { renderRoute } from './router.js';

function bootstrap() {
  const initialTask = renderRoute(true);
  if (initialTask && typeof initialTask.then === 'function') {
    initialTask.then(() => {
      document.documentElement.classList.add('js-ready');
    });
  } else {
    document.documentElement.classList.add('js-ready');
  }

  window.addEventListener('hashchange', () => {
    renderRoute(false);
  });

  const loadSecondary = () => {
    import('./bootstrapSecondary.js').then((m) => m.initSecondaryShell());
  };
  const isTab =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(min-width: 768px)').matches
      : window.innerWidth >= 768;

  if (isTab) {
    loadSecondary();
  } else {
    setTimeout(loadSecondary, 0);
  }
}

bootstrap();
