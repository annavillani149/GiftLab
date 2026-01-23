import { items, sets } from "./data.js";

const container = document.getElementById("sets-container");

sets.forEach(set => {
  const setDiv = document.createElement("div");
  setDiv.className = "set";

  const setItems = set.itemIds.map(id => items.find(i => i.id === id));

  setDiv.innerHTML = `
    <h2>${set.title} (~${setItems.reduce((sum, i) => sum + i.price, 0)} €)</h2>
    <ul>
      ${setItems.map(i => `<li>${i.name} - ${i.notes}</li>`).join('')}
    </ul>
    <p>${set.description}</p>
  `;
  
  container.appendChild(setDiv);
});
