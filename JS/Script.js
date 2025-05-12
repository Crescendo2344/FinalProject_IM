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
