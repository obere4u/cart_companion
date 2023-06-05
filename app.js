
//selectors
const addButtonEl = document.querySelector("#add-button");
const emptyList = document.querySelector(".empty-list")
let inputFieldEl = document.querySelector("#input-field");
let shoppingListEl = document.querySelector("#shopping-list");


addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue !== "") {
    addItemToShoppingList(inputValue); // Add item to shopping list
    clearInputField();

    showToast("Item added successfully!");
    updateEmptyListState();
  }
  clearInputField();
});

// Load initial shopping list from localStorage
loadShoppingList();

function loadShoppingList() {
  const shoppingListFromLocalStorage = localStorage.getItem("shoppingList");
  if (shoppingListFromLocalStorage) {
    let itemsArr = JSON.parse(shoppingListFromLocalStorage);
    clearAddToShoppingList();

    if (itemsArr.length > 0) {
      for (let i = 0; i < itemsArr.length; i++) {
        let currentItem = itemsArr[i].value; // Access the value property of the item object
        addItemToShoppingList(currentItem);
      }
      updateEmptyListState();
    }
    updateEmptyListState();
  }
}

function clearAddToShoppingList() {
  shoppingListEl.innerHTML = "";
}

function clearInputField() {
  inputFieldEl.value = "";
}

function addItemToShoppingList(itemValue) {
  let itemId = Date.now().toString(); // Generate a unique ID for the item

  let item = {
    id: itemId,
    value: itemValue,
  };

  let itemsArr = [];

  if (localStorage.getItem("shoppingList")) {
    itemsArr = JSON.parse(localStorage.getItem("shoppingList"));
  }

  itemsArr.push(item);
  localStorage.setItem("shoppingList", JSON.stringify(itemsArr));

  createItemElement(item);
  updateEmptyListState(); // Update the empty list state
}

function createItemElement(item) {
  let itemEl = document.createElement("li");
  itemEl.textContent = item.value;
  itemEl.classList.add("transition"); // Add transition class for smooth effect

  itemEl.addEventListener("dblclick", function () {
    removeItemFromShoppingList(item.id);
    itemEl.remove();
    showToast("Item removed successfully!");
    updateEmptyListState(); // Update the empty list state
  });

  // Add fade-in animation when adding item
  setTimeout(() => {
    itemEl.classList.add("fadeIn");
  }, 0); // Add the fade-in class immediately after creating the element

  shoppingListEl.append(itemEl);
}

function removeItemFromShoppingList(itemId) {
  let itemsArr = [];

  if (localStorage.getItem("shoppingList")) {
    itemsArr = JSON.parse(localStorage.getItem("shoppingList"));
  }

  itemsArr = itemsArr.filter((item) => item.id !== itemId);
  localStorage.setItem("shoppingList", JSON.stringify(itemsArr));
  // Update the empty list state
  updateEmptyListState();
}

// show toast message
function showToast(message) {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("show");

    setTimeout(function () {
      toast.classList.remove("show");

      setTimeout(function () {
        toast.remove();
      }, 300); // Remove the toast from the DOM after the animation duration
    }, 3000);
  }, 10); // Delay the toast display to ensure smooth animation
}

// mark an item as bought
function markItemAsBought(itemEl) {
  itemEl.classList.add("bought");
}

// Event listener for clicking on an item
shoppingListEl.addEventListener("click", function (event) {
  const clickedItem = event.target;

  if (clickedItem.tagName === "LI") {
    markItemAsBought(clickedItem);
  }
});

// Function to update the empty list state
function updateEmptyListState() {
  const shoppingListFromLocalStorage = localStorage.getItem("shoppingList");
  if (shoppingListFromLocalStorage && shoppingListFromLocalStorage !== "null") {
    let itemsArr = JSON.parse(shoppingListFromLocalStorage);
    if (itemsArr.length > 0) {
      emptyList.style.display = "none"
    } else {
      emptyList.style.display = "block";
    }
  } else {
    emptyList.style.display = "block";
  }
}
