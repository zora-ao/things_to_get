import { displayItems } from "./script.js";
const itemName = document.getElementById("item-name");
const itemQuantity = document.getElementById("quantity");
const itemPrice = document.getElementById("price");
const itemReason = document.getElementById("reason");
const addBtn = document.getElementById("add-item-btn");

let items;

try {
    const stored = JSON.parse(localStorage.getItem("things"));
    items = Array.isArray(stored) ? stored : [];
} catch (e) {
    items = [];
}



addBtn.addEventListener("click", () => {
    const name = itemName.value.trim();

    const duplicate = items.some(item => item.name.toLowerCase() === name.toLowerCase());
    if(duplicate){
        alert("That Item is already in the list!");
        return;
    }

    let currentItems = {
        name,
        quantity: itemQuantity.value,
        price: itemPrice.value,
        reason: itemReason.value
    };

    items.push(currentItems);
    localStorage.setItem("things", JSON.stringify(items));

    itemName.value = "";
    itemQuantity.value = "";
    itemPrice.value = "";
    itemReason.value = "";
    displayItems(items);

    
});

displayItems(items);
