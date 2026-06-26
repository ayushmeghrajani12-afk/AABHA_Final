export function initProductLightbox() {
  const images = document.querySelectorAll('.product-image img, img.product-image, .placeholder-img');
  if (!images.length) return;

  let lightbox = document.getElementById('product-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'product-lightbox';
    lightbox.className = 'product-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Product image');
    lightbox.innerHTML = `
      <div class="product-lightbox-backdrop"></div>
      <button type="button" class="product-lightbox-close" aria-label="Close product image">&times;</button>
      <img src="" alt="" class="product-lightbox-img">
    `;
    document.body.appendChild(lightbox);
  }

  const imgEl = lightbox.querySelector('.product-lightbox-img');
  const backdrop = lightbox.querySelector('.product-lightbox-backdrop');
  const closeBtn = lightbox.querySelector('.product-lightbox-close');

  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || 'Product image';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    imgEl.removeAttribute('src');
  }

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      close();
    }
  });

  images.forEach((img) => {
    img.classList.add('product-img-expandable');
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', `View full image: ${img.alt || 'product'}`);

    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      open(img.currentSrc || img.src, img.alt);
    });

    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img.currentSrc || img.src, img.alt);
      }
    });
  });
}
