import { displayItems } from "./script.js";
const itemName = document.getElementById("item-name");
const itemCategory = document.getElementById("category");
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
    let currentItems = {
        name: itemName.value,
        category: itemCategory.value,
        price: itemPrice.value,
        reason: itemReason.value
    };

    items.push(currentItems);
    localStorage.setItem("things", JSON.stringify(items));

    itemName.value = "";
    itemCategory.value = "";
    itemPrice.value = "";
    itemReason.value = "";
    displayItems(items);

    
});

displayItems(items);
