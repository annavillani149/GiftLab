import { items, sets } from "./data.js";

const setsContainer = document.getElementById("sets-container");
const singlesContainer = document.getElementById("singles-container");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");

// --- Popola il dropdown delle categorie ---
const categories = Array.from(new Set(items.map(i => i.category)));
categories.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categoryFilter.appendChild(option);
});

// --- Funzione di render completa con filtri ---
function renderWishlist() {
  const selectedCategory = categoryFilter.value;
  const maxPrice = parseFloat(priceFilter.value) || Infinity;

  // Pulisce i container
  setsContainer.innerHTML = "";
  singlesContainer.innerHTML = "";


// --- RENDER DEI SET ---
sets.forEach(set => {
  const setDiv = document.createElement("div");
  setDiv.className = "set";

  const setItems = set.itemIds.map(id => items.find(i => i.id === id));

  // Filtra item nel set in base ai criteri
    const filteredItems = setItems.filter(i => 
      (selectedCategory === "all" || i.category === selectedCategory) &&
      i.price <= maxPrice
    );

    if (filteredItems.length === 0) return; // nessun item nel set corrispondente


  setDiv.innerHTML = `
    <h2>${set.title} (~${setItems.reduce((sum,i)=>sum+i.price,0)} €)</h2>
    <ul>
      ${setItems.map(i => `
        <li>
          ${i.name} ${i.size ? `- Taglia: ${i.size}` : ''} ${i.color ? `- Colore: ${i.color}` : ''}
          ${i.notes ? `<br><small>${i.notes}</small>` : ''}
          <br>
           ${i.links.length === 1 
            ? `<a href="${i.links[0].url}" target="_blank">${i.links[0].label}</a>` 
            : `<table style="margin-top:5px;">
                 ${i.links.map(l => `<tr><td><a href="${l.url}" target="_blank">${l.label}</a></td></tr>`).join('')}
               </table>`}
        </li>
      `).join('')}
    </ul>
    <p>${set.description}</p>
  `;

  setsContainer.appendChild(setDiv);
});

// --- RENDER DEGLI ITEM SINGOLI ---
const itemIdsInSets = sets.flatMap(s => s.itemIds);

const singleItems = items.filter(i => 
    !itemIdsInSets.includes(i.id) &&
    (selectedCategory === "all" || i.category === selectedCategory) &&
    i.price <= maxPrice
  );
  
singleItems.forEach(i => {
  const itemDiv = document.createElement("div");
  itemDiv.className = "single-item";

  itemDiv.innerHTML = `
    <h3>${i.name} - ${i.price} €</h3>
    ${i.size ? `<p>Taglia: ${i.size}</p>` : ''}
    ${i.color ? `<p>Colore: ${i.color}</p>` : ''}
    ${i.notes ? `<p><small>${i.notes}</small></p>` : ''}
    <p>
      ${i.links.length === 1 
      ? `<a href="${i.links[0].url}" target="_blank">${i.links[0].label}</a>` 
      : `<table style="margin-top:5px;">
      ${i.links.map(l => `<tr><td><a href="${l.url}" target="_blank">${l.label}</a></td></tr>`).join('')}
     </table>`}

    </p>
  `;

  singlesContainer.appendChild(itemDiv);
});

}

// --- Event listeners filtri ---
categoryFilter.addEventListener("change", renderWishlist);
priceFilter.addEventListener("input", renderWishlist);

// --- Render iniziale ---
renderWishlist();
