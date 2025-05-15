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
      <p class="product-price">₱${item.price.toFixed(2)}</p>
      <p class="product-color"><strong>Color:</strong> ${item.color || 'Default'}</p>

      <label for="color">Color:</label>
      <select class="color-selector" data-index="${index}">
        <option ${item.color === 'White' ? 'selected' : ''}>White</option>
        <option ${item.color === 'Ivory' ? 'selected' : ''}>Ivory</option>
        <option ${item.color === 'Blush' ? 'selected' : ''}>Blush</option>
      </select>

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
  
  document.getElementById('cart-total').textContent = `₱${total.toFixed(2)}`;
  
  
  document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      loadCart();
    });
  });

  document.querySelectorAll('.color-selector').forEach(select => {
  select.addEventListener('change', (e) => {
    const index = e.currentTarget.getAttribute('data-index');
    cartItems[index].color = e.target.value;
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

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const container = button.closest('.ImageContainer');
      const name = container.querySelector('.Dressname').textContent;
      const image = container.querySelector('.img1').src;
      const price = 299.00;
      const size = 'M'; 
      const color = 'White'; 
      const quantity = 1;

      const newItem = { name, image, price, size, color, quantity };

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
      showToast(`🔔 ${newItem.name} added to cart!!`);
    });
  });
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
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

  if (window.location.pathname.includes('Collections-3.html')) {
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
    loadOrderHistory();
  }

  if (window.location.pathname.includes('Checkout.html')) {
  renderCartSummary();
}
});


const form = document.getElementById('checkout-form');
const cartSummaryDiv = document.getElementById('cart-summary');


const cart = JSON.parse(localStorage.getItem('cart')) || [];


function renderCartSummary() {
  if (cart.length === 0) {
    cartSummaryDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;
  const itemsHtml = cart.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    return `
  <div>
    ${item.name} (Size: ${item.size}, Color: ${item.color}) - ${item.quantity} x ₱${item.price.toFixed(2)} = ₱${subtotal.toFixed(2)}
  </div>
`;
  }).join('');

  cartSummaryDiv.innerHTML = itemsHtml + `<strong>Total: ₱${total.toFixed(2)}</strong>`;
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!name || !email || !address || !payment) {
    alert('Please fill in all fields and select a payment method.');
    return;
  }

  
  const isCOD = payment.value === 'Cash on Delivery';
  const paymentStatus = isCOD ? 'Pending' : 'Paid';
  
  
  const orderStatus = 'Processing';
  
  
  const orderDate = new Date();
  const estimatedArrival = new Date(orderDate);
  estimatedArrival.setDate(orderDate.getDate() + Math.floor(Math.random() * 7) + 3);
  
  const order = {
    items: [...cart], 
    name,
    email,
    address,
    paymentMethod: payment.value,
    paymentStatus,
    orderStatus,
    orderDate: orderDate.toLocaleString(),
    estimatedArrival: estimatedArrival.toLocaleDateString()
  };

  
  const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
  orderHistory.unshift(order); 
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

  
  localStorage.removeItem('cart');
  form.style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
});

function loadOrderHistory() {
  const container = document.querySelector('.cart-container1');
  const history = JSON.parse(localStorage.getItem('orderHistory')) || [];

  
  container.innerHTML = `
    <h2>Order History</h2>
    <div id="order-history">
      <h3>Previous Orders</h3>
      <div class="orders-list"></div>
    </div>
  `;

  const ordersList = container.querySelector('.orders-list');

  if (history.length === 0) {
    ordersList.innerHTML = `<p>No past orders found.</p>`;
    return;
  }

  
  history.forEach((order, index) => {
    const itemsHtml = order.items.map(item => 
      `<li>${item.name} - ${item.quantity} x ₱${item.price.toFixed(2)}</li>`
    ).join('');

    const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    
    const orderEntry = document.createElement('div');
    orderEntry.className = 'order-entry';
    orderEntry.innerHTML = `
      <div class="order-title">Order #${history.length - index} - ${order.orderDate}</div>
      <div class="order-details">
        <p><strong>Status:</strong> <span class="status-${order.orderStatus.toLowerCase().replace(/\s+/g, '-')}">${order.orderStatus}</span></p>
        <p><strong>Estimated Arrival:</strong> ${order.estimatedArrival}</p>
        <p><strong>Payment Status:</strong> <span class="payment-${order.paymentStatus.toLowerCase()}">${order.paymentStatus}</span></p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <ul class="order-items">${itemsHtml}</ul>
        <p class="order-total"><strong>Total: ₱${totalAmount}</strong></p>
      </div>
    `;
    ordersList.appendChild(orderEntry);
  });
}

