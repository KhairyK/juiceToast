import juiceToast from 'juice-toast/src';

document.addEventListener('DOMContentLoaded', () => {
  juiceToast.success({
    title: 'Hello World!',
    duration: 4000,
    position: 'bottom-right',
    glassUI: 100,
  });
});