// main.js
document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-item");
      alert(`You bought: ${itemName}! Coins will be deducted.`);
      // TODO: Integrate with backend or coin system
    });
  });
});
