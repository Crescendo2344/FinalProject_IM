function sidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
  
    
    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");
  }

const searchIcon = document.getElementById('search-icon');
  const searchBar = document.getElementById('search-bar');
  const closeSearch = document.getElementById('close-search');

  if (searchIcon && searchBar && closeSearch) {
    searchIcon.addEventListener('click', () => {
      searchBar.style.display = 'block';
      searchBar.querySelector('input').focus();
    });
  
    closeSearch.addEventListener('click', () => {
      searchBar.style.display = 'none';
    });
  }

  

function loadCart() {
  const cartContainer = document.querySelector('.cart-header');
  const cartSummary = document.querySelector('.cart-summary');
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  
  cartContainer.innerHTML = `<h1>Items in your cart</h1>`;
  
  let total = 0;

  
  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="Dress Image" class="product-image">
      <div class="item-details">
        <h3 class="product-name">${item.name}</h3>
        <p class="product-price">$${item.price.toFixed(2)}</p>
        <label for="size">Size:</label>
        <select class="size-selector">
          <option ${item.size === 'XS' ? 'selected' : ''}>XS</option>
          <option ${item.size === 'S' ? 'selected' : ''}>S</option>
          <option ${item.size === 'M' ? 'selected' : ''}>M</option>
          <option ${item.size === 'L' ? 'selected' : ''}>L</option>
          <option ${item.size === 'XL' ? 'selected' : ''}>XL</option>
          <option ${item.size === 'XXL' ? 'selected' : ''}>XXL</option>
        </select>

        <label for="quantity">Qty:</label>
        <input type="number" class="quantity-selector" min="1" value="${item.quantity}" data-index="${index}">

        <button class="remove-item-btn" data-index="${index}"><i class="fa fa-trash"></i> Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
  
  
  document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      loadCart();
    });
  });

  
  document.querySelectorAll('.quantity-selector').forEach(input => {
    input.addEventListener('input', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      const newQty = parseInt(e.target.value) || 1;
      cartItems[index].quantity = newQty;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      loadCart();
    });
  });
}


function setupAddToCartButtons() {
  const buttons = document.querySelectorAll('.Cartbutton');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const container = button.closest('.ImageContainer');
      const name = container.querySelector('.Dressname').textContent;
      const image = container.querySelector('.img1').src;
      const price = 299.00; 
      const size = 'M';     
      const quantity = 1;

      const newItem = { name, image, price, size, quantity };

      
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(newItem);
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`${name} added to cart.`);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('A-line.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Ballgown.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Collections.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Collections-2.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Collection-3.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Fit-and-flare.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Fitted-with-overskirt.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Mermaid.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('Sheath.html')) {
    setupAddToCartButtons();
  }

  if (window.location.pathname.includes('ShoppingCart.html')) {
    loadCart();
  }
});
