document.addEventListener("DOMContentLoaded", () => {
  // Sales Chart - Last 7 Days
  const salesCtx = document.getElementById("salesChart").getContext("2d");
  new Chart(salesCtx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Sales (₱)",
        data: [32000, 45000, 28000, 51000, 39000, 61000, 47000],
        backgroundColor: "#3498db"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Sales in PHP (₱) for Last 7 Days'
        }
      }
    }
  });

  // Category Distribution Chart
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
          text: 'Product Category Distribution'
        }
      }
    }
  });
});
