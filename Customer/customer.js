// Constants
const homeButton = document.getElementById("homeButton");
const customersProduct = document.getElementById("customersProduct");
const productsDispaly = document.getElementById("productsDispaly");
const searchInput = document.getElementById("searchInput");
const filterCateogry = document.getElementById("filterCateogry");
const filterPrice = document.getElementById("filterPrice");
const cartContainer = document.getElementById("cartContainer");
const customersCart = document.getElementById("customersCart");
const cartButton = document.getElementById("cartButton");
const cartIndisplay = document.getElementById("cartIndisplay");

// Variables
let products = [];
let cartProducts = [];
let cateogriesDisplayed;
let pricesDisplayed;

// Back to shopping or Home button functionality
homeButton.addEventListener("click", () => {
  cartContainer.style.display = "none";
  displayCustomerProducts(getProducts());
  productsDispaly.style.display = "flex";
});

// Fetch and display products
function getProducts() {
  products = JSON.parse(localStorage.getItem("Myproducts")) || [];
  return products;
}

function displayCustomerProducts(productsToDisplay) {
  customersProduct.innerHTML = ""; // Clear the container
  const cartProductIds = cartProducts.map((product) => product.id); // Get IDs of products in the cart

  productsToDisplay.forEach((product) => {
    const isDisabled = cartProductIds.includes(product.id) ? "disabled" : "";
    customersProduct.innerHTML += `
      <div class="flex products__product" product-id="${product.id}">
        <div class="product__imgBox">
          <img src="${product.image}" alt="productImage" class="imgBox__img" />
        </div>
        <div class="flex products__upper">
          <button class="buttons__cart" ${isDisabled}>
            <i class="fas fa-cart-plus"></i>
          </button>
          <div class="upper__price">${product.price} $</div>
        </div>
        <div class="product__details">
          <h2 class="details__name">${product.name}</h2>
          <p class="details__cateogry">${product.category}</p>
          <div class="product__detail">${product.detail}</div>
        </div>
      </div>`;
  });

  // Add event listeners after rendering the products
  cartEventLinstener(".products__product");
}

// Initialize the page by displaying all products
function initializeProducts() {
  const productsToDisplay = getProducts();
  displayCustomerProducts(productsToDisplay);
  getfromLocalStorage(); // Ensure cart is loaded
}

// Search functionality
if (searchInput) {
  searchInput.addEventListener("input", (searchEntry) => {
    const filteredProducts = performIntersection(
      finalCateogry(filterCateogry),
      finalPrice(filterPrice)
    );
    const productDisplayed = searchResult(searchEntry.target, filteredProducts);
    displayCustomerProducts(productDisplayed);
  });
}

function searchResult(searchEntry, productsToSearch) {
  return productsToSearch.filter((product) =>
    product.name.toLowerCase().includes(searchEntry.value?.toLowerCase())
  );
}

// Intersection of filters
function performIntersection(
  cateogries = getProducts(),
  prices = getProducts()
) {
  return cateogries.filter((cateogryElement) =>
    prices.some((priceElement) => priceElement.id === cateogryElement.id)
  );
}

// Filter by category
filterCateogry.addEventListener("click", () => {
  const productsToDisplay = performIntersection(
    finalCateogry(filterCateogry),
    finalPrice(filterPrice)
  );
  displayCustomerProducts(productsToDisplay);
});

function finalCateogry(cateogry) {
  cateogriesDisplayed = products.filter((product) => {
    if (cateogry.value === "allCategories") return true;
    return product.category.toLowerCase() === cateogry.value.toLowerCase();
  });
  return cateogriesDisplayed;
}

// Filter by price
filterPrice.addEventListener("change", () => {
  const productsToDisplay = performIntersection(
    finalCateogry(filterCateogry),
    finalPrice(filterPrice)
  );
  displayCustomerProducts(productsToDisplay);
});

function finalPrice(price) {
  pricesDisplayed = products.filter((product) => {
    if (price.value === "allPrices") return true;
    if (price.value == "low")
      return product.price >= 1 && product.price <= 2000;
    if (price.value == "moderate")
      return product.price > 2000 && product.price <= 10000;
    return product.price > 10000;
  });
  return pricesDisplayed;
}

// Cart functionality
function cartEventLinstener(containerName) {
  getfromLocalStorage();
  const productContainer = document.querySelectorAll(containerName);
  productContainer.forEach((product) => {
    product.addEventListener("click", (element) => {
      if (element.target.className.includes("fa-cart-plus")) {
        const productElement = element.target.closest("[product-id]");
        const addButton = element.target.parentElement;
        addButton.disabled = true;
        addToCart(productElement.getAttribute("product-id"));
      }
    });
  });
}

// Ensure cart data persists across page reloads
function addToCart(productId) {
  getfromLocalStorage();
  const product = getProducts().find((product) => product.id == productId);
  if (product) {
    cartProducts.push(product);
    addToLocalStorage();
    if (cartContainer.style.display == "flex") {
      displayCartProducts(cartProducts);
    }
  }
}

function addToLocalStorage() {
  window.localStorage.setItem("cart", JSON.stringify(cartProducts));
}

function getfromLocalStorage() {
  cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  return cartProducts;
}

// Display cart products
cartButton.addEventListener("click", () => {
  displayCartProducts(getfromLocalStorage());
});

function displayCartProducts(cartProducts) {
  customersCart.innerHTML = "";
  cartProducts.forEach((product) => {
    customersCart.innerHTML += `
      <div class="flex list__listProduct" product-id=${product.id}>
        <img src=${product.image} alt="productImage" class="listProduct__img">
        <div class="listProduct__details">
          <p class="details__name">${product.name}</p>
          <p class="details__price">${product.price}</p>
          <p class="details__cateogry">${product.category}</p>
          <p class="details__detail">${product.detail}</p>
        </div>
        <button class="listProduct__button deleteFromCart">Delete</button>
      </div>`;
  });
  const priceBlock = document.getElementById("price");
  priceBlock.textContent = `Total price is ${cartTotalPrice(cartProducts)} $`;
  productsDispaly.style.display = "none";
  cartContainer.style.display = "flex";
  cartDeleteEventLinstener();
}

// Delete product from cart
function cartDeleteEventLinstener() {
  const cartDelete = document.querySelectorAll(".deleteFromCart");
  cartDelete.forEach((button) => {
    button.addEventListener("click", () => {
      cartProductDelete(button.parentElement.getAttribute("product-id"));
      button.parentElement.remove();
    });
  });
}

function cartProductDelete(productId) {
  cartProducts = cartProducts.filter((product) => product.id != productId);
  addToLocalStorage();
  displayCartProducts(cartProducts);
}

// Total cart price
function cartTotalPrice(cartProducts) {
  return cartProducts.reduce(
    (total, product) => total + Number(product.price),
    0
  );
}

// Back to shopping
cartIndisplay.addEventListener("click", () => {
  cartContainer.style.display = "none";
  productsDispaly.style.display = "flex";
});

// Initialize products when page loads
initializeProducts();
