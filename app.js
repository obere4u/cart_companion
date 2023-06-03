//setting up firebase firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://cart-companion-c7725-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList"); //create the reference in database

//selectors
const addButtonEl = document.getElementById("add-button");
let inputFieldEl = document.getElementById("input-field");
let shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListDB, inputValue); //push to database
  clearInputField();
});

onValue(shoppingListDB, function (snapshot) {
  //checks if snapshot exists first using a firebase method snapshot.exist()
  if (snapshot.exists()) {
    let itemsArr = Object.entries(snapshot.val()); //fetch the items in the DB and stores it as an Array
    clearAddToShoppingList();

    for (let i = 0; i < itemsArr.length; i++) {
      let currentItem = itemsArr[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      addItemToShoppingList(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here.... yet";
  }
});

function clearAddToShoppingList() {
  shoppingListEl.innerHTML = "";
}

function clearInputField() {
  inputFieldEl.value = "";
}

function addItemToShoppingList(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let itemEl = document.createElement("li");
  itemEl.textContent = itemValue;

  itemEl.addEventListener("dblclick", function () {
    let exactItemLocationInDB = ref(database, `shoppingList/${itemId}`);

    remove(exactItemLocationInDB);
  });

  shoppingListEl.append(itemEl);
}

// function deleteItem() {
//   let currentItemInDB
// }
