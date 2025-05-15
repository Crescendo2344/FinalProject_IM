// Shared admin functions
document.addEventListener('DOMContentLoaded', function() {
  // Toggle dropdown menus in sidebar
  const dropdownMenus = document.querySelectorAll('.menu-dropdown > a');
  
  dropdownMenus.forEach(menu => {
    menu.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('active');
      
      // Close other open dropdowns
      dropdownMenus.forEach(otherMenu => {
        if (otherMenu !== this && otherMenu.parentElement.classList.contains('active')) {
          otherMenu.parentElement.classList.remove('active');
        }
      });
    });
  });

  // Set active menu item based on current page
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  const menuItems = document.querySelectorAll('.sidebar-menu a');
  
  menuItems.forEach(item => {
    const href = item.getAttribute('href').replace('#', '').replace('.html', '');
    if (href === currentPage || (currentPage === '' && href === 'index')) {
      item.classList.add('active');
    }
  });

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// Shared function to fetch data from JSON files
async function fetchData(endpoint) {
  try {
    const response = await fetch(`data/${endpoint}.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Shared function to save data to JSON files
async function saveData(endpoint, data) {
  try {
    const response = await fetch(`data/${endpoint}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving data:', error);
    return null;
  }
}

// Shared function to show toast notifications
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-body">
      ${message}
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Shared function to confirm actions
function confirmAction(message, callback) {
  const modal = document.createElement('div');
  modal.className = 'confirm-modal';
  modal.innerHTML = `
    <div class="confirm-content">
      <p>${message}</p>
      <div class="confirm-buttons">
        <button class="btn btn-outline confirm-cancel">Cancel</button>
        <button class="btn btn-danger confirm-ok">Confirm</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('.confirm-cancel').addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelector('.confirm-ok').addEventListener('click', () => {
    callback();
    modal.remove();
  });
}