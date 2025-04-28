document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const productTable = document.getElementById('product-table')?.querySelector('tbody');
    const employeeTable = document.getElementById('employee-table')?.querySelector('tbody');
    const searchBar = document.getElementById('search-bar');
  
    // Load from local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    function renderProducts(table, isAdmin = false) {
      table.innerHTML = '';
      products.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.brand}</td>
          <td>₱${item.price}</td>
          <td>${item.stock}</td>
          ${isAdmin ? `
          <td>${item.arrival}</td>
          <td>${item.supplier}</td>
          <td>${item.discounted ? 'Yes' : 'No'}</td>
          <td><button onclick="deleteItem(${index})">Delete</button></td>` :
          `<td>${item.discounted ? 'Yes' : 'No'}</td>`
        }
        `;
        table.appendChild(row);
      });
    }
  
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const newItem = {
          name: document.getElementById('product-name').value,
          brand: document.getElementById('brand').value,
          price: parseFloat(document.getElementById('price').value),
          stock: parseInt(document.getElementById('stock').value),
          arrival: document.getElementById('arrival-date').value,
          supplier: document.getElementById('supplier').value,
          discounted: document.getElementById('discounted').checked
        };
        products.push(newItem);
        localStorage.setItem('products', JSON.stringify(products));
        form.reset();
        renderProducts(productTable, true);
      });
  
      renderProducts(productTable, true);
    }
  
    if (employeeTable) {
      renderProducts(employeeTable);
    }
  
    if (searchBar) {
      searchBar.addEventListener('input', function () {
        const filtered = products.filter(p => 
          p.name.toLowerCase().includes(this.value.toLowerCase()) || 
          p.brand.toLowerCase().includes(this.value.toLowerCase())
        );
        employeeTable.innerHTML = '';
        filtered.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.brand}</td>
            <td>₱${item.price}</td>
            <td>${item.stock}</td>
            <td>${item.discounted ? 'Yes' : 'No'}</td>
          `;
          employeeTable.appendChild(row);
        });
      });
    }
  });
  
  function deleteItem(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
  }
  