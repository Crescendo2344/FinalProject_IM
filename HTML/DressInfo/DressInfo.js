
    
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const closeBtn = document.getElementById('close-btn');
    const mainImage = document.getElementById('main-image');
    const expandBtn = document.getElementById('expand-btn');
    const thumbnail1 = document.getElementById('thumbnail1');

    
    function openOverlay(imgSrc) {
      overlayImg.src = imgSrc;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    
    function closeOverlay() {
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    
    mainImage.addEventListener('click', () => openOverlay(mainImage.src));
    expandBtn.addEventListener('click', () => openOverlay(mainImage.src));
    thumbnail1.addEventListener('click', () => openOverlay(thumbnail1.src));
    closeBtn.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOverlay();
      }
    });

    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeOverlay();
      }
    });
  

   document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.querySelector('.Cartbutton');

  if (!addToCartButton) return;

  addToCartButton.addEventListener('click', () => {
  // Check if product is available
  const availability = getDetailValue('Availability');
if (!availability || availability.toLowerCase().includes('out of stock')) {
  showToast('❌ This item is out of stock!');
  return;
}


  // Get product details
  const name = document.querySelector('.title')?.textContent.trim();
  const image = document.getElementById('main-image')?.getAttribute('src');
  
  // Extract price
  const priceText = document.querySelector('.subtitle')?.textContent.trim();
  const price = extractPrice(priceText) || 50000.00;

  const size = 'M'; // default value
  const color = getDetailValue('Available Color(s)') || 'Ivory';
  const quantity = 1;

  const newItem = { name, image, price, size, color, quantity };

  // Update cart logic
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingIndex = cart.findIndex(item =>
    item.name === newItem.name &&
    item.size === newItem.size &&
    item.color === newItem.color
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(newItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showToast(`🔔 ${newItem.name} added to cart!`);
});

  // Helper function to extract price from various formats
  function extractPrice(priceText) {
    if (!priceText) return null;
    
    // Match numbers with optional currency symbols, commas, and decimals
    const priceMatch = priceText.match(/[\d,]+\.?\d*/);
    if (!priceMatch) return null;
    
    // Remove commas and convert to number
    return parseFloat(priceMatch[0].replace(/,/g, ''));
  }

  function getDetailValue(labelText) {
    const labels = document.querySelectorAll('.details-grid .label');
    for (const label of labels) {
      if (label.textContent.trim().toLowerCase().includes(labelText.toLowerCase())) {
        return label.nextElementSibling?.textContent.trim().split(' / ')[0];
      }
    }
    return null;
  }

  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
});
  function getDetailValue(labelText) {
    const rows = document.querySelectorAll('.details-grid .label');
    for (const label of rows) {
      if (label.textContent.trim().toLowerCase() === labelText.toLowerCase()) {
        return label.nextElementSibling?.textContent.trim();
      }
    }
    return null;
  }

