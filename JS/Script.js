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

  
let cart = [];

    function addToCart(productName, productPrice) {
      const existing = cart.find(item => item.name === productName);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
      }
      updateCartSidebar();
    }

    function removeFromCart(productName) {
      cart = cart.filter(item => item.name !== productName);
      updateCartSidebar();
    }

    function updateCartSidebar() {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      sidebar.classList.add('show');
      overlay.classList.add('show');

      let html = '<h2>Your Cart</h2><ul>';
      cart.forEach(item => {
        html += `
          <li style="margin-bottom: 10px;">
            ${item.name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart('${item.name}')" style="margin-left: 10px;">Remove</button>
          </li>
        `;
      });

      html += '</ul>';
      html += `<p><strong>Total: $${getTotal()}</strong></p>`;
      html += '<button class="close-btn" onclick="closeSidebar()">×</button>';
      sidebar.innerHTML = html;
    }

    function getTotal() {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    function closeSidebar() {
      document.querySelector('.sidebar').classList.remove('show');
      document.querySelector('.sidebar-overlay').classList.remove('show');
    }

    function toggleCart() {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      sidebar.classList.toggle('show');
      overlay.classList.toggle('show');
    }

    document.getElementById("search-icon").addEventListener("click", () => {
      document.getElementById("search-bar").style.display = "flex";
    });

    document.getElementById("close-search").addEventListener("click", () => {
      document.getElementById("search-bar").style.display = "none";
    });

    function updateTotal() {
  let total = 0;
  const items = document.querySelectorAll(".cart-item");
  items.forEach(item => {
    const price = parseFloat(item.querySelector(".product-price").textContent.replace("$", ""));
    const qty = parseInt(item.querySelector(".quantity-selector").value);
    total += price * qty;
  });
  document.getElementById("cart-total").textContent = "$" + total.toFixed(2);
}

// Remove item from cart
document.querySelectorAll(".remove-item-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    this.closest(".cart-item").remove();
    updateTotal();
  });
});