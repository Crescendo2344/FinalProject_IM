
document.addEventListener('DOMContentLoaded', function() {
  
  const dropdownMenus = document.querySelectorAll('.menu-dropdown > a');
  
  dropdownMenus.forEach(menu => {
    menu.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('active');
      
      
      dropdownMenus.forEach(otherMenu => {
        if (otherMenu !== this && otherMenu.parentElement.classList.contains('active')) {
          otherMenu.parentElement.classList.remove('active');
        }
      });
    });
  });


  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  const menuItems = document.querySelectorAll('.sidebar-menu a');
  
  menuItems.forEach(item => {
    const href = item.getAttribute('href').replace('#', '').replace('.html', '');
    if (href === currentPage || (currentPage === '' && href === 'index')) {
      item.classList.add('active');
    }
  });


  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});


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


document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content1', '.tab-content2', '.tab-content3');
  const pageTitle = document.getElementById('page-title');
  const breadcrumb = document.getElementById('breadcrumb-current');

  tabLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

    
      const targetId = this.getAttribute('data-target');

      
      tabContents.forEach(tab => tab.style.display = 'none');

    
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.style.display = 'block';
      }

    
      const label = this.innerText.trim();
      pageTitle.textContent = label;
      breadcrumb.textContent = label;
    });
  });

  
  const defaultTab = document.querySelector('.tab-link[data-target="all-gowns"]');
  if (defaultTab) defaultTab.click();
});

document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");
  const dropdownMenu = document.querySelector(".menu-dropdown");
  const allLinks = document.querySelectorAll(".sidebar-menu a");

  function removeActiveClasses() {
    allLinks.forEach(link => link.classList.remove("active"));
    tabLinks.forEach(link => link.classList.remove("active"));
  }

  tabLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");

      
      tabContents.forEach(tab => {
        tab.style.display = tab.id === target ? "block" : "none";
      });

    
      const title = target.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      document.getElementById("page-title").textContent = title;
      document.getElementById("breadcrumb-current").textContent = title;

    
      removeActiveClasses();

    
      this.classList.add("active");

      
      dropdownMenu.querySelector("a.has-dropdown").classList.add("active");
    });
  });

  
  const defaultTab = document.querySelector(".tab-link[data-target='all-gowns']");
  if (defaultTab) defaultTab.click();
});


document.addEventListener('DOMContentLoaded', function () {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', function () {
    
    if (confirm('Are you sure you want to log out?')) {
     
      window.location.href = 'http://localhost/FinalProject_IM/Login/';
    }
  });
});