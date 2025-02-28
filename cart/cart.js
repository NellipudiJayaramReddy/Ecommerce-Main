
let basket = JSON.parse(sessionStorage.getItem("cart"));
let allItems = document.querySelector(".all-items");
let gridHTML = document.querySelector(".grid");
let subtotaltext = document.querySelector(".sub_total");

let deliveryCharge = document.querySelector(".delivery_charge");
let gst = document.querySelector(".gst");
let gradtotal = document.querySelector(".gradtotal");
let beginCheckOut = document.querySelector(".checkout");

// console.log(basket);
function xyz() {
  allItems.innerHTML = "";
  if (!basket || basket.length === 0) {
    allItems.innerHTML = "Cart Is Empty";
    allItems.style.fontSize = "2.5rem";
    allItems.style.fontWeight = "800";
    allItems.style.textAlign = "center";
    beginCheckOut.setAttribute("disabled", "true");
    subtotaltext.style.display = "none";
    deliveryCharge.style.display = "none";
    gradtotal.style.display = "none";
    gst.style.display = "none";

    return;
  } else {
    basket.forEach((e) => {
      let taskId = e.id;
      // console.log(typeof e.number);
      let addedItems = gridHTML.cloneNode(true);
      let image = addedItems.querySelector(".itemImg");
      let title = addedItems.querySelector(".itemName");
      let description = addedItems.querySelector(".discription");
      let orginalprice = addedItems.querySelector(".orginalprice");
      let price = addedItems.querySelector(".price");
      let removebtn = addedItems.querySelector(".remove_item");

      let minus = addedItems.querySelector(".fa-minus");
      let quantity = addedItems.querySelector(".quantity");
      let plus = addedItems.querySelector(".fa-plus");

      image.src = e.image;
      image.alt = e.title;
      image.id = `img-${taskId}`;

      title.textContent = e.title;
      title.id = `title-${taskId}`;

      description.textContent = e.description;
      description.id = `description-${taskId}`;

      orginalprice.textContent = `Price: $${e.price}`;

      quantity.innerHTML = e.number;

      price.value = price.textContent = `Final-Price: $${(
        e.price * e.number
      ).toFixed(2)}`;
      price.id = `price-${taskId}`;

      removebtn.setAttribute("data-id", taskId);

      plus.addEventListener("click", () => increment(e, quantity, price));
      minus.addEventListener("click", () => decrement(e, quantity, price));
      removebtn.addEventListener("click", () => removefun(e, addedItems));
      allItems.append(addedItems);
    });
  }
  subTotalfun();
}

xyz();
function decrement(product, quantity, price) {
  let existingItem = basket.find((item) => item.id === product.id);
  if (existingItem.number === 1) {
    return;
  }
  if (existingItem.number > 1) {
    existingItem.number -= 1;

    quantity.innerHTML = existingItem.number;
    price.value = price.textContent = `Price: $${
      existingItem.price * existingItem.number
    }`;
    sessionStorage.setItem("cart", JSON.stringify(basket));
    xyz();
  }
}

function increment(product, quantity, price) {
  let i = basket.find((item) => item.id === product.id);
  if (!i) {
    return;
  }
  i.number += 1;
  quantity.innerHTML = i.number;
  price.value = price.textContent = `Price: $${i.price * i.number}`;
  sessionStorage.setItem("cart", JSON.stringify(basket));
  xyz();
}

function removefun(product, addedItems) {
  console.log(basket);
  let result = confirm(`Are you sure you want to Remove ${product.title} ?`);
  if (result) {
    basket = basket.filter((item) => item.id !== product.id);
    sessionStorage.setItem("cart", JSON.stringify(basket));
    addedItems.remove();
    subTotalfun();
    xyz();
  } else {
    return;
  }
}

function subTotalfun() {
  let sum = 0;
  basket.forEach((product) => {
    sum = sum + product.price * product.number;
  });
  subtotaltext.innerHTML = `Subtotal: $ ${sum.toFixed(2)}`;
  deliverychargefun(sum);
}

// subTotalfun();

function deliverychargefun(sum) {
  let deliveryprice = 0;
  if (sum < 200 && sum !== 0) {
    console.log("Delivery Charge is $20");
    deliveryCharge.innerHTML = ` Delivery Charge: <strong>$20</strong>`;
    deliveryprice = 20;
  } else {
    deliveryCharge.innerHTML = ` Delivery Charge: <strong>$0</strong>`;
    deliveryprice = 0;
  }
  gstfun(sum, deliveryprice);
}

function gstfun(sum, deliveryprice) {
  let gstamount = sum * 0.12;
  gst.innerHTML = `GST: <strong>$${gstamount.toFixed(2)}</strong>`;
  gradtotalfunc(sum, deliveryprice, gstamount);
}

function gradtotalfunc(sum, deliveryprice, gstamount) {
  let gradtotalamount = sum + deliveryprice + gstamount;
  gradtotal.innerHTML = `GRAND TOTAL: $${gradtotalamount.toFixed(2)}`;
}

let searchBar = document.getElementById("search_bar");
let nw = document.querySelectorAll(".grid");

searchBar.addEventListener("input", () => {
  let v = searchBar.value.toLowerCase();

  nw.forEach((x) => {
    console.log(x);
    let t = x.querySelector(".itemName").textContent.toLowerCase();
    if (t.includes(v)) {
      x.style.display = "";
    } else {
      x.style.display = "none";
    }
  });
});

// searchBar.addEventListener("input", (i) => {
//   let value = i.target.value.toLowerCase();
//   let filteredItems = basket.filter((item) =>
//     item.title.toLowerCase().includes(value)
//   );

//   displayFilteredItems(filteredItems);
// });

// function displayFilteredItems(filteredBasket) {
//   allItems.innerHTML = ""; // Clear the existing items

//   if (filteredBasket.length === 0) {
//     allItems.innerHTML =
//       "<p style='font-size: 2rem; text-align: center;'>No items found</p>";
//     return;
//   }

//   filteredBasket.forEach((e) => {
//     let taskId = e.id;
//     let addedItems = gridHTML.cloneNode(true);
//     let image = addedItems.querySelector(".itemImg");
//     let title = addedItems.querySelector(".itemName");
//     let description = addedItems.querySelector(".discription");
//     let orginalprice = addedItems.querySelector(".orginalprice");
//     let price = addedItems.querySelector(".price");
//     let removebtn = addedItems.querySelector(".remove_item");

//     let minus = addedItems.querySelector(".fa-minus");
//     let quantity = addedItems.querySelector(".quantity");
//     let plus = addedItems.querySelector(".fa-plus");

//     image.src = e.image;
//     image.alt = e.title;
//     image.id = `img-${taskId}`;

//     title.textContent = e.title;
//     title.id = `title-${taskId}`;

//     description.textContent = e.description;
//     description.id = `description-${taskId}`;

//     orginalprice.textContent = `Price: $${e.price}`;

//     quantity.innerHTML = e.number;

//     price.value = price.textContent = `Final-Price: $${(
//       e.price * e.number
//     ).toFixed(2)}`;
//     price.id = `price-${taskId}`;

//     removebtn.setAttribute("data-id", taskId);

//     plus.addEventListener("click", () => {
//       increment(e, quantity, price);
//     });
//     minus.addEventListener("click", () => {
//       decrement(e, quantity, price);
//     });

//     removebtn.addEventListener("click", () => {
//       removefun(e, addedItems);
//     });

//     allItems.append(addedItems);
//   });
// }
