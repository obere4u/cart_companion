// //setting up firebase firebase

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

// import {
//   getDatabase,
//   ref,
//   push,
//   onValue,
//   remove,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//   databaseURL: "https://cart-companion-c7725-default-rtdb.firebaseio.com/",
// };

// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const shoppingListDB = ref(database, "shoppingList"); //create the reference in database

// //selectors
// const addButtonEl = document.getElementById("add-button");
// let inputFieldEl = document.getElementById("input-field");
// let shoppingListEl = document.getElementById("shopping-list");

// addButtonEl.addEventListener("click", function () {
//   let inputValue = inputFieldEl.value;

//   push(shoppingListDB, inputValue); //push to database
//   clearInputField();

//   showToast("Item added successfully!");
// });

// inputFieldEl.addEventListener("keyup", function (event) {
//   if (event.key === "Enter") {
//     let inputValue = inputFieldEl.value.trim();

//     if (inputValue !== "") {
//       push(shoppingListDB, inputValue);
//       clearInputField();
//       showToast("Item added successfully!");
//     }
//   }
// });

// onValue(shoppingListDB, function (snapshot) {
//   //checks if snapshot exists first using a firebase method snapshot.exist()
//   if (snapshot.exists()) {
//     let itemsArr = Object.entries(snapshot.val()); //fetch the items in the DB and stores it as an Array
//     clearAddToShoppingList();

//     for (let i = 0; i < itemsArr.length; i++) {
//       let currentItem = itemsArr[i];
//       let currentItemID = currentItem[0];
//       let currentItemValue = currentItem[1];

//       addItemToShoppingList(currentItem);
//     }
//   } else {
//     shoppingListEl.innerHTML = "No items here.... yet";
//     shoppingListEl.classList.add("empty-list");
//   }
// });

// function clearAddToShoppingList() {
//   shoppingListEl.innerHTML = "";
// }

// function clearInputField() {
//   inputFieldEl.value = "";
// }

// function addItemToShoppingList(item) {
//   let itemId = item[0];
//   let itemValue = item[1];

//   let itemEl = document.createElement("li");
//   itemEl.textContent = itemValue;
//   itemEl.classList.add("transition"); // Add transition class for smooth effect

//   itemEl.addEventListener("dblclick", function () {
//     let exactItemLocationInDB = ref(database, `shoppingList/${itemId}`);

//     // Add fade-out animation when removing item
//     itemEl.classList.add("fadeOut");

//     // Remove item from database after animation completes
//     setTimeout(() => {
//       remove(exactItemLocationInDB);
//     }, 300); // Wait for 300ms (animation duration) before removing the item
//     showToast("Item removed successfully!");
//   });

//   // Add fade-in animation when adding item
//   setTimeout(() => {
//     itemEl.classList.add("fadeIn");
//   }, 0); // Add the fade-in class immediately after creating the element

//   shoppingListEl.append(itemEl);

// }

// // show toast message
// function showToast(message) {
//   const toastContainer = document.getElementById("toast-container");

//   const toast = document.createElement("div");
//   toast.className = "toast";
//   toast.textContent = message;

//   toastContainer.appendChild(toast);

//   setTimeout(function () {
//     toast.classList.add("show");

//     setTimeout(function () {
//       toast.classList.remove("show");

//       setTimeout(function () {
//         toast.remove();
//       }, 300); // Remove the toast from the DOM after the animation duration
//     }, 3000);
//   }, 10); // Delay the toast display to ensure smooth animation
// }

// // mark an item as bought
// function markItemAsBought(itemEl) {
//   itemEl.classList.add("bought");
// }

// // Event listener for clicking on an item
// shoppingListEl.addEventListener("click", function (event) {
//   const clickedItem = event.target;

//   if (clickedItem.tagName === "LI") {
//     markItemAsBought(clickedItem);
//   }
// });

//selectors
const addButtonEl = document.getElementById("add-button");
let inputFieldEl = document.getElementById("input-field");
let shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue !== "") {
    addItemToShoppingList(inputValue); // Add item to shopping list
    clearInputField();

    showToast("Item added successfully!");
    updateEmptyListState();
  }
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
  if (shoppingListFromLocalStorage) {
    let itemsArr = JSON.parse(shoppingListFromLocalStorage);
    if (itemsArr.length > 0) {
      shoppingListEl.classList.remove("empty-list"); // Remove the "empty-list" class
    } else {
      shoppingListEl.classList.add("empty-list");
      shoppingListEl.innerHTML = "No items here.... yet";
    }
  } else {
    shoppingListEl.classList.add("empty-list");
    shoppingListEl.innerHTML = "No items here.... yet";
  }
}
