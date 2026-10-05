const grid = document.getElementById('menu-grid');
const category = document.getElementById('category');
const maxPrice = document.getElementById('maxPrice');

// Fetch menu items from the server and display them in the grid
// Added this to load the menu. I used the fetch API to get the data from the server and then I used the DOM to display the data in the grid. I also added event listeners to the category and maxPrice inputs to filter the menu items based on the selected category and max price.
async function loadMenu() {
  const params = new URLSearchParams();
  if (category.value) params.set('category', category.value);
  if (maxPrice.value) params.set('maxPrice', maxPrice.value);

  const res = await fetch('/api/menu?' + params.toString());
  const items = await res.json();

  grid.innerHTML = items.length
    ? items.map(i => `
        <article class="card">
          <img src="${i.image}" alt="${i.name}">
          <div><h3>${i.name} - &#8369;${i.price}</h3><p>${i.description}</p></div>
        </article>`).join('')
    : '<p class="center">No drinks match your filters.</p>';
}

category.addEventListener('change', loadMenu);
maxPrice.addEventListener('input', loadMenu);
loadMenu();
