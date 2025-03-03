// "use strict";

let API = "https://fakestoreapi.com/products";
let shoppingItems = document.querySelector(".shopping_items");
let item = document.querySelector(".item");
let pageNumbers = document.getElementById("pageNumbers");
let prePageBtn = document.getElementById("prevPage");
let nextPageBtn = document.getElementById("nextPage");
let itemsPerPageDropdown = document.getElementById("itemsPerPageDropdown");

let search = document.querySelector(".searchbar");
let paginationContainer = document.querySelector(".pagination-container");

let arr = [];
let numberOfItems = parseInt(itemsPerPageDropdown.value);

let page = 1;
let totalpages;
// creatingPagenumbers(5);

async function a() {
  let apis = await fetch(API);
  let data = await apis.json();
  arr = data;
  totalpages = Math.ceil(arr.length / numberOfItems);
  renderPage(page);
  creatingPagenumbers(totalpages);
  updateActivePage();
}

a();

function renderPage(page) {
  shoppingItems.innerHTML = "";
  let start = (page - 1) * numberOfItems;
  let end = start + numberOfItems;
  let paginatedItems = arr.slice(start, end);

  paginatedItems.forEach((e) => {
    let taskId = e.id;
    let singleItem = item.cloneNode(true);
    let image = singleItem.querySelector(".item_image");
    let title = singleItem.querySelector(".title");
    let description = singleItem.querySelector(".description");
    let price = singleItem.querySelector(".price");
    let addToCart = singleItem.querySelector(".add_to_cart_button");

    image.src = e.image;
    image.alt = e.title;
    image.id = `img-${taskId}`;

    title.textContent = e.title;
    title.id = `title-${taskId}`;

    description.textContent = e.description;
    description.id = `description-${taskId}`;

    price.textContent = `Price: $${e.price}`;
    price.id = `price-${taskId}`;

    addToCart.textContent = "ADD TO CART";
    addToCart.setAttribute("data-id", taskId);

    shoppingItems.appendChild(singleItem);

    addToCart.addEventListener("click", () => {
      addToCartFunction(e);
    });
  });
}

renderPage(page);

itemsPerPageDropdown.addEventListener("change", (event) => {
  numberOfItems = parseInt(event.target.value);
  totalpages = Math.ceil(arr.length / numberOfItems);
  page = 1;
  renderPage(page);
  creatingPagenumbers(totalpages);
});

function creatingPagenumbers(totalpages) {
  pageNumbers.innerHTML = "";
  for (let i = 1; i <= totalpages; i++) {
    let pageNo = document.createElement("button");
    pageNo.innerHTML = i;
    if (i === 1) {
      pageNo.style.background = "black";
      pageNo.style.color = "white";
    }
    pageNo.addEventListener("click", () => {
      page = i;
      renderPage(page);
      updateActivePage();
    });
    pageNumbers.append(pageNo);
  }
}

prePageBtn.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
    renderPage(page);
    updateActivePage();
  }
});

nextPageBtn.addEventListener("click", () => {
  if (page < totalpages) {
    page = page + 1;
    renderPage(page);
    updateActivePage();
  }
});

function updateActivePage() {
  let buttons = pageNumbers.querySelectorAll("button");
  // console.log(buttons);
  buttons.forEach((btn, index) => {
    if (index + 1 === page) {
      btn.style.background = "black";
      btn.style.color = "white";
    } else {
      btn.style.background = "";
      btn.style.color = "";
    }
  });
}

function addToCartFunction(e) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let iscontain = cart.find((i) => i.id === e.id);
  if (iscontain) {
    iscontain.number = iscontain.number + 1;
    alert("This Item is already in the cart!!!");
    window.location.href = "cart/cart.html";
  } else {
    cart.push({ ...e, number: 1 });
    window.location.href = "cart/cart.html";
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
}

let searchBar = document.querySelector(".searchbar");
let tr = document.querySelectorAll(".item");
console.log(tr);

searchBar.addEventListener("input", () => {
  let value = searchBar.value.toLowerCase().trim();
  let filteredItems = arr.filter((item) =>
    item.title.toLowerCase().includes(value)
  );
  if (value === "") {
    location.reload();
  }
  // console.log(filteredItems);
  displayFilteredItems(filteredItems);
});

function displayFilteredItems(filteredItems) {
  shoppingItems.innerHTML = "";
  filteredItems.forEach((e) => {
    // console.log(e);
    let taskId = e.id;
    let singleItem = item.cloneNode(true);
    let image = singleItem.querySelector(".item_image");
    let title = singleItem.querySelector(".title");
    let description = singleItem.querySelector(".description");
    let price = singleItem.querySelector(".price");
    let addToCart = singleItem.querySelector(".add_to_cart_button");

    image.src = e.image;
    image.alt = e.title;
    image.id = `img-${taskId}`;

    title.textContent = e.title;
    title.id = `title-${taskId}`;

    description.textContent = e.description;
    description.id = `description-${taskId}`;

    price.textContent = `Price: $${e.price}`;
    price.id = `price-${taskId}`;

    addToCart.textContent = "ADD TO CART";
    addToCart.setAttribute("data-id", taskId);

    shoppingItems.appendChild(singleItem);

    addToCart.addEventListener("click", () => {
      addToCartFunction(e);
    });
    // paginationContainer.style.display = "none";
  });
}

let filtericon = document.querySelector(".fa-filter");
let filteroptions = document.querySelector(".filteroptions");

filtericon.addEventListener("click", () => {
  filteroptions.style.display = "block";
});

filteroptions.addEventListener("change", (event) => {
  let category = event.target.value;
  let categoryitems = arr.filter((item) =>item.category === categorySelcted);
  console.log(categoryitems);
  filterfunc(categoryitems);
});

function filterfunc(categoryitems) {
  shoppingItems.innerHTML = "";
  categoryitems.forEach((e) => {
    // console.log(e);
    let taskId = e.id;
    let singleItem = item.cloneNode(true);
    let image = singleItem.querySelector(".item_image");
    let title = singleItem.querySelector(".title");
    let description = singleItem.querySelector(".description");
    let price = singleItem.querySelector(".price");
    let addToCart = singleItem.querySelector(".add_to_cart_button");

    image.src = e.image;
    image.alt = e.title;
    image.id = `img-${taskId}`;

    title.textContent = e.title;
    title.id = `title-${taskId}`;

    description.textContent = e.description;
    description.id = `description-${taskId}`;

    price.textContent = `Price: $${e.price}`;
    price.id = `price-${taskId}`;

    addToCart.textContent = "ADD TO CART";
    addToCart.setAttribute("data-id", taskId);

    shoppingItems.appendChild(singleItem);

    addToCart.addEventListener("click", () => {
      addToCartFunction(e);
    });
    // paginationContainer.style.display = "none";
  });
}

document.querySelector(".reset").addEventListener("click", () => {
  location.reload();
});

// searchBar.addEventListener("input", () => {
//   let v = searchBar.value.toLowerCase();
//   tr.forEach((m) => {
//     console.log(m);
//     let t = m.querySelector(".title").textContent.toLowerCase();
//     if (t.includes(v)) {
//       m.style.display = "";
//     } else {
//       m.style.display = "none";
//     }
//   });
// });

// searchBar.addEventListener("input", () => {
//   let v = searchBar.value.toLowerCase();
//   let items = document.querySelectorAll(".shopping_items .item"); // Select dynamically created items
//   console.log(items);
//   items.forEach((m) => {
//   });
// });
