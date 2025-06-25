const products = [
  { name: "Headphones", category: "tech", price: 2500, rating: 4.2 },
  { name: "T-Shirt", category: "fashion", price: 799, rating: 4.0 },
  { name: "JavaScript Book", category: "books", price: 499, rating: 4.8 },
  { name: "Smartphone", category: "tech", price: 12000, rating: 4.5 },
  { name: "Jeans", category: "fashion", price: 1499, rating: 4.1 },
  { name: "Notebook", category: "books", price: 299, rating: 4.6 }
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");

function renderProducts(data) {
  productList.innerHTML = "";
  data.forEach(product => {
    productList.innerHTML += `
      <div class="card">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <p class="rating">⭐ ${product.rating}</p>
        <p>Category: ${product.category}</p>
      </div>
    `;
  });
}

function filterSortProducts() {
  let filtered = [...products];
  const selectedCategory = categoryFilter.value;
  const sortValue = sortPrice.value;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (sortValue === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", filterSortProducts);
sortPrice.addEventListener("change", filterSortProducts);

renderProducts(products);
