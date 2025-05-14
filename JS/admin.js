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

  // Modal functionality
  const addGownBtn = document.getElementById('addGownBtn');
  const cancelGownBtn = document.getElementById('cancelGownBtn');
  const addGownModal = document.getElementById('addGownModal');
  const closeModal = document.querySelector('.close');
  
  // Open modal
  if (addGownBtn) {
    addGownBtn.addEventListener('click', () => {
      addGownModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close modal
  function closeGownModal() {
    addGownModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', closeGownModal);
  }
  
  if (cancelGownBtn) {
    cancelGownBtn.addEventListener('click', closeGownModal);
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === addGownModal) {
      closeGownModal();
    }
  });

  // Image upload preview
  const imageUpload = document.getElementById('gownImage');
  const imagePreview = document.getElementById('imagePreview');
  const fileInfo = document.querySelector('.file-info');
  
  if (imageUpload) {
    imageUpload.addEventListener('change', function() {
      imagePreview.innerHTML = '';
      const files = this.files;
      
      if (files.length > 0) {
        fileInfo.textContent = `${files.length} file(s) selected`;
        
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.appendChild(img);
          }
          
          reader.readAsDataURL(files[i]);
        }
      } else {
        fileInfo.textContent = 'No files chosen';
      }
    });
  }

  // Form submission
  const gownForm = document.getElementById('gownForm');
  
  if (gownForm) {
    gownForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const gownData = {
        name: document.getElementById('gownName').value,
        category: document.getElementById('gownCategory').value,
        color: document.getElementById('gownColor').value,
        sizes: Array.from(document.querySelectorAll('input[name="size"]:checked')).map(el => el.value),
        price: parseFloat(document.getElementById('gownPrice').value),
        stock: parseInt(document.getElementById('gownStock').value),
        description: document.getElementById('gownDescription').value,
        images: Array.from(document.getElementById('gownImage').files)
      };
      
      console.log('New gown data:', gownData);
      
      // Show success message (in a real app, you would send this to your backend)
      alert('Gown added successfully!');
      
      // Close modal and reset form
      closeGownModal();
      this.reset();
      imagePreview.innerHTML = '';
      fileInfo.textContent = 'No files chosen';
    });
  }

  // Process order buttons
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent === 'Process') {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const statusCell = row.querySelector('.status');
        statusCell.textContent = 'Processing';
        statusCell.className = 'status processing';
        this.textContent = 'Ship';
        
        // In a real app, you would update the order status via API
        console.log('Order status updated to Processing');
      });
    }
    
    if (btn.textContent === 'Ship') {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const statusCell = row.querySelector('.status');
        statusCell.textContent = 'Completed';
        statusCell.className = 'status completed';
        this.textContent = 'View';
        
        // In a real app, you would update the order status via API
        console.log('Order status updated to Completed');
      });
    }
    
    if (btn.textContent === 'Reorder') {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const gownName = row.querySelector('td').textContent;
        
        // In a real app, you would send a reorder request to suppliers
        console.log(`Reorder request sent for ${gownName}`);
        alert(`Reorder request sent for ${gownName}`);
      });
    }
  });
});