



const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// cart variables
function ready() {
  updateCartTotal()
  var removeCartItemButtons = document.getElementsByClassName("btn-delete");
  console.log(removeCartItemButtons);
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addtoCartButtons = document.getElementsByClassName("cart-bn");
  for (var i = 0; i < addtoCartButtons.length; i++) {
    var button = addtoCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)


}

function purchaseClicked(){
  // alert("Thank you for your purchase")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}


function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName("pro-title")[0].innerText;
  var price = shopItem.getElementsByClassName("pro-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("pro-image")[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("tr");
  cartRow.classList.add("cart-rows");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("pro-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
      <td><i class="ri-delete-bin-line  btn-delete"></i></td>
      <td><img src="${imageSrc}" alt=""></td>
      <td class="pro-title">${title}</td>
      <td class="cart-price">${price}</td>
      <td><input type="number" value="1" class="cart-quantity-input"></td>
      <td class="cart-subTotal">₹ 199</td>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName("btn-delete")[0].addEventListener('click',removeCartItem)
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('click',quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-rows");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("₹", ""));
    var quantity = quantityElement.value;
    document.getElementsByClassName("cart-subTotal")[i].innerText =
      "₹" + price * quantity;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "₹" + total;
}