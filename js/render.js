import { items, sets } from "./data.js";

const setsContainer = document.getElementById("sets-container");
const singlesContainer = document.getElementById("singles-container");

// --- RENDER DEI SET ---
sets.forEach(set => {
  const setDiv = document.createElement("div");
  setDiv.className = "set";

  const setItems = set.itemIds.map(id => items.find(i => i.id === id));

  setDiv.innerHTML = `
    <h2>${set.title} (~${setItems.reduce((sum,i)=>sum+i.price,0)} €)</h2>
    <ul>
      ${setItems.map(i => `
        <li>
          ${i.name} ${i.size ? `- Taglia: ${i.size}` : ''} ${i.color ? `- Colore: ${i.color}` : ''}
          <br>
           ${i.links.length === 1 
            ? `<a href="${i.links[0].url}" target="_blank">${i.links[0].label}</a>` 
            : `<table style="margin-top:5px;">
                 ${i.links.map(l => `<tr><td><a href="${l.url}" target="_blank">${l.label}</a></td></tr>`).join('')}
               </table>`}
          ${i.notes ? `<br><small>${i.notes}</small>` : ''}
        </li>
      `).join('')}
    </ul>
    <p>${set.description}</p>
  `;

  setsContainer.appendChild(setDiv);
});

// --- RENDER DEGLI ITEM SINGOLI ---
const itemIdsInSets = sets.flatMap(s => s.itemIds);

const singleItems = items.filter(i => !itemIdsInSets.includes(i.id));

singleItems.forEach(i => {
  const itemDiv = document.createElement("div");
  itemDiv.className = "single-item";

  itemDiv.innerHTML = `
    <h3>${i.name} - ${i.price} €</h3>
    ${i.size ? `<p>Taglia: ${i.size}</p>` : ''}
    ${i.color ? `<p>Colore: ${i.color}</p>` : ''}
    <p>
      ${i.links.map(l => `<a href="${l}" target="_blank">Acquista</a>`).join(' | ')}
    </p>
    ${i.notes ? `<p><small>${i.notes}</small></p>` : ''}
  `;

  singlesContainer.appendChild(itemDiv);
});
