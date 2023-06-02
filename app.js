//setting up firebase firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
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
let item;

addButtonEl.addEventListener("click", function () {
  item = inputFieldEl.value;

  push(shoppingListDB, item); //push to database

  clearInputField();
  addItemToShoppingList();

  console.log(item);
});

function clearInputField() {
  inputFieldEl.value = "";
}

function addItemToShoppingList() {
  shoppingListEl.innerHTML += `<li>${item}</li>`;
}
