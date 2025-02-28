let no1 = document.querySelector(".no-1");
let no2 = document.querySelector(".no-2");
let no3 = document.querySelector(".no-3");
let no4 = document.querySelector(".no-4");

let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");

let tick1 = document.querySelector(".tick-1");
let tick2 = document.querySelector(".tick-2");
let tick3 = document.querySelector(".tick-3");
let tick4 = document.querySelector(".tick-4");

let payment = document.querySelector(".paymentbtn");
let sucessful = document.querySelector(".sucessfulbtn");
let confirm = document.querySelector(".confirm");

let adressTitel = document.querySelector(".adress_title");
let ardressDetails = document.querySelector(".ardress_details");

let paymentTitle = document.querySelector(".payment_title");
let pay = document.querySelector(".pay");

let orderConformation = document.querySelector(".oredr_conformation");
let final = document.querySelector(".final");

let message = document.querySelector(".message");

// addtocart.addEventListener("click", () => {
//   one.style.backgroundColor = "#2874F0";
//   no1.style.display = "none";
//   tick1.style.display = "block";
// });

let firstName = document.querySelector("#firstname");
let lastName = document.querySelector("#lastname");
let phone = document.querySelector("#phonenumber");
let alternate = document.querySelector("#alternatnumber");
let address = document.querySelector("#adress");
let pincode = document.querySelector("#pincode");
let state = document.querySelector("#state");
let district = document.querySelector("#district");

let adressBtn = document.querySelector(".adressbtn");
let errormsg = document.querySelector(".error");

function isValidPhoneNumber(number) {
  return /^[6-9]\d{9}$/.test(number);
}
function isValidPincode(pincode) {
  return /^\d{6}$/.test(pincode);
}
function validateAddressForm() {
  let isFilled =
    firstName.value.trim() !== "" &&
    lastName.value.trim() !== "" &&
    phone.value.trim() !== "" &&
    alternate.value.trim() !== "" &&
    address.value.trim() !== "" &&
    pincode.value.trim() !== "" &&
    state.value.trim() !== "" &&
    district.value.trim() !== "";

  let isPhoneValid = isValidPhoneNumber(phone.value.trim());
  let isAlternateValid = isValidPhoneNumber(alternate.value.trim());
  let validpincode = isValidPincode(pincode.value.trim());

  if (!isPhoneValid || !isAlternateValid) {
    errormsg.innerHTML = "Enter a valid  mobile number ";
    adressBtn.disabled = true;
    return;
  }

  if (!validpincode) {
    errormsg.innerHTML = "Enter a valid  PinCode ";
    adressBtn.disabled = true;
    return;
  }

  if (!isFilled) {
    errormsg.innerHTML = "Enter all the details";
    adressBtn.disabled = true;
    return;
  }

  adressBtn.disabled = !isFilled;

  if (isFilled && isPhoneValid && isAlternateValid) {
    errormsg.innerHTML = "";
  }
}
document
  .querySelectorAll("input[required], textarea[required]")
  .forEach((input) => {
    input.addEventListener("input", validateAddressForm);
  });

adressBtn.addEventListener("click", () => {
  if (adressBtn.disabled) {
    errormsg.innerHTML = "Please fill all address details correctly!";
    return;
  }
  one.classList.add("active");
  two.style.backgroundColor = "#2874F0";
  no2.style.display = "none";
  tick2.style.display = "block";

  paymentTitle.style.display = "block";
  pay.style.display = "block";
});

payment.addEventListener("click", () => {
  let selectedPayment = document.querySelector(
    'input[name="selection"]:checked'
  );
  if (!selectedPayment) {
    alert("Please Select the payemnt method");
    return;
  }
  two.classList.add("active");
  three.style.backgroundColor = "#2874F0";
  no3.style.display = "none";
  tick3.style.display = "block";

  // paymentTitle.style.display = "none";
  // pay.style.display = "none";
  orderConformation.style.display = "block";
  final.style.display = "block";
});

confirm.addEventListener("click", () => {
  sucessful.removeAttribute("disabled");
});

let progressBar = document.querySelector(".progress_bar");

sucessful.addEventListener("click", () => {
  three.classList.add("active");
  four.style.backgroundColor = "#2874F0";
  no4.style.display = "none";
  tick4.style.display = "block";
  orderConformation.style.display = "none";
  final.style.display = "none";
  paymentTitle.style.display = "none";
  pay.style.display = "none";
  ardressDetails.style.display = "none";
  adressTitel.style.display = "none";
  message.style.display = "block";
  // one.style.backgroundColor = "black";
  // no1.style.display = "block";
  // tick1.style.display = "none";
  // one.classList.remove("active");
  // two.style.backgroundColor = "black";
  // no2.style.display = "block";
  // tick2.style.display = "none";
  // two.classList.remove("active");
  // three.style.backgroundColor = "black";
  // no3.style.display = "block";
  // tick3.style.display = "none";
  progressBar.style.display = "none";

  setTimeout(() => {
    document.getElementById("gotohome").click();
  }, 5000);
  sessionStorage.clear();
});

// let firstName = document.querySelector("#firstname");
// let lastName = document.querySelector("#lastname");
// let phone = document.querySelector("#phonenumber");
// let alternate = document.querySelector("#alternatnumber");
// let address = document.querySelector("#adress");
// let pincode = document.querySelector("#pincode");
// let state = document.querySelector("#state");
// let district = document.querySelector("#district");
// let confirmBtn = document.querySelector(".confirm");

// function validadress() {
//   if (
//     firstName.value.trim() === "" ||
//     lastName.value.trim() === "" ||
//     phone.value.trim() === "" ||
//     alternate.value.trim() === "" ||
//     address.value.trim() === "" ||
//     pincode.value.trim() === "" ||
//     state.value.trim() === "" ||
//     district.value.trim() === ""
//   ) {
//     alert("Fill Valid details");
//     return false;
//   } else if (
//     phone.value.trim() < 6 * 10 ** 9 ||
//     alternate.value.trim() < 6 * 10 ** 9
//   ) {
//     alert("Enter Valid Number");
//     return false;
//   } else {
//     address.removeAttribute("disabled");

//     return true;
//   }
// }

// adress.addEventListener("mouseover", () => {
//   validadress();
// });

// lastName.addEventListener("input", () => {
//   validadress();
// });

// phone.addEventListener("input", () => {
//   validadress();
// });

// alternate.addEventListener("input", () => {
//   validadress();
// });

// address.addEventListener("input", () => {
//   validadress();
// });

// pincode.addEventListener("input", () => {
//   validadress();
// });

// district.addEventListener("input", () => {
//   validadress();
// });

// state.addEventListener("input", () => {
//   validadress();
// });
