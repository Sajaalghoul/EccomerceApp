//cosnts
const productsList = document.getElementById("productsList");
const home = document.getElementById("home");
const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");
const addDisplay = document.getElementById("addDisplay");
//add consts
const addForm = document.getElementById("addForm");
const productName = document.getElementById("name");
const productDetail = document.getElementById("detail");
const productPrice = document.getElementById("price");
const productImage = document.getElementById("image");
const productCateogry = document.getElementById("category");
const formInputs = document.querySelectorAll("input");
//edit consts
const editForm = document.getElementById("editForm");
const categoryEdit = document.getElementById("categoryEdit");
const nameEdit = document.getElementById("nameEdit");
const detailEdit = document.getElementById("detailEdit");
const priceEdit = document.getElementById("priceEdit");
const imageEdit = document.getElementById("imageEdit");
//toast vars
let toastBox = document.getElementById("toastBox");
////products variable
let Initproducts = [
  {
    id: 0,
    name: "Running Shoes",
    price: 10079,
    detail: "High-performance running shoes for athletes.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 1,
    name: "Smartphone",
    price: 2799,
    detail: "The latest smartphone with advanced features.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "T-Shirt",
    price: 2024,
    detail: "Comfortable cotton t-shirt for everyday wear.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 3,
    name: "Laptop",
    price: 5299,
    detail: "Powerful laptop for work and entertainment.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Football",
    price: 1519,
    detail: "High-quality football for sports enthusiasts.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 5,
    name: "Headphones",
    price: 10129,
    detail: "Over-ear headphones for an immersive audio experience.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Jeans",
    price: 10439,
    detail: "Stylish and comfortable jeans for a trendy look.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 7,
    name: "Basketball",
    price: 29,
    detail: "Durable basketball suitable for indoor and outdoor play.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 8,
    name: "Gaming Console",
    price: 6399,
    detail: "State-of-the-art gaming console for gaming enthusiasts.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 9,
    name: "Dress Shirt",
    price: 1534,
    detail: "Formal dress shirt for a sharp and professional look.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 10,
    name: "Running Shorts",
    price: 1519,
    detail: "Comfortable running shorts for active individuals.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 11,
    name: "Wireless Earbuds",
    price: 69,
    detail: "Wireless earbuds for a tangle-free music experience.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 12,
    name: "Sweater",
    price: 1529,
    detail: "Warm and cozy sweater for chilly days.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 13,
    name: "Yoga Mat",
    price: 3024,
    detail: "High-quality yoga mat for a comfortable yoga practice.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 14,
    name: "Digital Camera",
    price: 499,
    detail: "Advanced digital camera for photography enthusiasts.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 15,
    name: "Backpack",
    price: 39,
    detail: "Durable backpack for carrying essentials on the go.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
];
//displaying them by default
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("Myproducts")) {
    addToLocalStorage(Initproducts);
  }
  displayProducts(getfromLocalStorage());
});
////addtProductsToLocalStorageFunction
function addToLocalStorage(products) {
  window.localStorage.setItem("Myproducts", JSON.stringify(products));
}
// ///getfromLocalStorage
function getfromLocalStorage() {
  if (localStorage.getItem("Myproducts")) {
    return JSON.parse(localStorage.getItem("Myproducts"));
  }
  return Initproducts;
}

//dispaly all products(addEvent)
function displayProducts(products) {
  productsList.innerHTML = "";
  products.forEach((product) => {
    productsList.innerHTML += `    
    <div class="flex products__product" product-id="${product.id}">
      <div class="product__imgBox">
        <img src="${product.image}" alt="productImage" class="imgBox__img" />
      </div>
      <div class="flex products__upper">
        <div class="upper__buttons">
          <a class="buttons__edit" href="#editBlock">
            <i class="fas fa-edit"></i>
          </a>
          <button class="buttons__delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div class="upper__price">${product.price} $</div>
      </div>
      <div class="product__details">
        <h2 class="details__name">${product.name}</h2>
        <p class="details__cateogry">${product.category}</p>
        <div class="product__detail">${product.detail}</div>
      </div>
    </div>`;
  });
  productEventLinstener();
}

///search products eventlistener
search.addEventListener("click", searchProduct);

//search empty
searchInput.addEventListener("input", () => {
  if (searchInput.value == "") {
    displayProducts(getfromLocalStorage());
  }
});

//filterforSearch
function searchProduct() {
  const productDisplayed = getfromLocalStorage().filter((product) => {
    return product.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  displayProducts(productDisplayed);
}
//add form display
if (addDisplay) {
  addDisplay.addEventListener("click", () => {
    productsList.style.display = "none";
    addForm.style.display = "flex";
    editForm.style.display = "none";
  });
}

//home
if (home) {
  home.addEventListener("click", () => {
    productsList.style.display = "flex";
    editForm.style.display = "none";
    addForm.style.display = "none";
  });
}
//////addForm eventlistener(preventdefault, add the product)
if (addForm) {
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addProduct(
      productName,
      productDetail,
      productPrice,
      productImage,
      productCateogry
    );
    displayProducts(getfromLocalStorage());
  });
}
////adding the product to the list , update id,getfromlocalstorage, push to localstorage
function addProduct(
  productName,
  productDetail,
  productPrice,
  productImage,
  productCateogry
) {
  const name = productName.value;
  const price = productPrice.value;
  const detail = productDetail.value;
  const image = productImage.value;
  const category = productCateogry.value;
  const product = {
    id: Date.now(),
    name,
    price,
    detail,
    image,
    category,
  };
  let before = getfromLocalStorage();
  before.push(product);
  addToLocalStorage(before);
  productsList.style.display = "flex";
  addForm.style.display = "none";
  formInputs.forEach((input) => (input.value = ""));
  toast('<i class="fa fa-check-circle"></i> successfully Added');
}
//toast
function toast(msg) {
  const toast = document.createElement("div");
  toast.classList.add("toast", "success");
  toast.innerHTML = msg;
  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// delete and edit eventlistener
function productEventLinstener() {
  const productContainers = document.querySelectorAll(".products__product");
  productContainers.forEach((product) => {
    product.addEventListener("click", (element) => {
      if (element.target.className.includes("fa-trash-alt")) {
        const productElement = element.target.closest("[product-id]");
        deleteProduct(productElement.getAttribute("product-id"));
        productElement.remove();
      }
      if (element.target.className.includes("fa-edit")) {
        const productElement = element.target.closest("[product-id]");
        const productId = productElement.getAttribute("product-id");
        let befor = getfromLocalStorage();
        befor.forEach((product) => {
          if (product.id == productId) {
            editProduct(product);
          }
        });
      }
    });
  });
}

///delete function
function deleteProduct(productId) {
  let afterProducts = getfromLocalStorage().filter(
    (product) => product.id != productId
  );
  toast('<i class="fa fa-check-circle"></i> Product Deleted!!');
  addToLocalStorage(afterProducts);
}

////edit function

// editProduct function,
let currentEditingProduct = null;
function editProduct(product) {
  productsList.style.display = "none";
  addForm.style.display = "none";
  editForm.style.display = "flex";

  currentEditingProduct = product;  // set the current product to be edited
  categoryEdit.value = product.category.toLowerCase();
  nameEdit.value = product.name;
  detailEdit.value = product.detail;
  priceEdit.value = product.price;
  imageEdit.value = product.image;
}

if (editForm) {
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Apply the changes to the product list and update local storage
    let afterProducts = editExecute(
      getfromLocalStorage(),
      currentEditingProduct,
      nameEdit.value,
      detailEdit.value,
      priceEdit.value,
      imageEdit.value,
      categoryEdit.value
    );

    toast('<i class="fa fa-check-circle"></i> successfully Edited!!');
    addToLocalStorage(afterProducts);
    productsList.style.display = "flex";
    editForm.style.display = "none";
    displayProducts(getfromLocalStorage());
  });
}


// editExecute function
function editExecute(productsVar, product, name, detail, price, image, category) {
  productsVar.forEach((productElement) => {
    if (productElement.id == product.id) {
      productElement.name = name;
      productElement.detail = detail;
      productElement.price = price;
      productElement.image = image;
      productElement.category = category;
    }
  });
  return productsVar;
}