// main.js
document.addEventListener("DOMContentLoaded", () => {
  // Buy buttons for store
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const itemName = btn.getAttribute("data-item");
      alert(`You bought: ${itemName}! Coins deducted.`);
    });
  });

  // Gear icon click example
  const settingsIcon = document.querySelector(".settings");
  if (settingsIcon) {
    settingsIcon.addEventListener("click", () => {
      alert("Settings clicked! Customize your app here.");
    });
  }
});
