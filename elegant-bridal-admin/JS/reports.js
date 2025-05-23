document.addEventListener("DOMContentLoaded", () => {
      
      const salesCtx = document.getElementById("salesChart").getContext("2d");
      new Chart(salesCtx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{
            label: "₱ Sales",
            data: [32000, 45000, 28000, 51000, 39000, 61000, 47000],
            backgroundColor: "rgba(52, 152, 219, 0.2)",
            borderColor: "#3498db",
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Sales Trend This Week'
            }
          }
        }
      });

  
      const categoryCtx = document.getElementById("categoryChart").getContext("2d");
      new Chart(categoryCtx, {
        type: "doughnut",
        data: {
          labels: ["A-line", "Ball Gown", "Sheath", "Fit and Flare"],
          datasets: [{
            data: [55, 25, 10, 10],
            backgroundColor: ["#e74c3c", "#9b59b6", "#f1c40f", "#2ecc71"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Sales by Product Category'
            }
          }
        }
      });

    
      const demographicsCtx = document.getElementById("demographicsChart").getContext("2d");
      new Chart(demographicsCtx, {
        type: "pie",
        data: {
          labels: ["Age 18-25", "26-35", "36-45", "46+"],
          datasets: [{
            data: [30, 45, 20, 5],
            backgroundColor: ["#1abc9c", "#2980b9", "#e67e22", "#8e44ad"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Customer Age Demographics'
            }
          }
        }
      });
    });
