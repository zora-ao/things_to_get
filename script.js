import { displayHistory } from "./getDate.js";
const itemsContainer = document.getElementById("items-container");
const addItem = document.getElementById("add-item");
const itemsList = document.getElementById("items-list");
const addSection = document.getElementById("add-section");
const containEach = document.getElementById("contain-each");
const saveMoneyBtn = document.getElementById("save-money");
const saveMoneySection = document.getElementById("save-money-section");
const currentMoneyDisplay = document.getElementById("current-money");
const addMoneyBtn = document.getElementById("add-money-btn");
const amountToSave = document.getElementById("amount-to-save");
const historyBtn = document.getElementById("history");
const historySection = document.getElementById("history-section");
const aboutBtn = document.getElementById("about");
const aboutSection = document.getElementById("about-section");


let currentMoney = Number(localStorage.getItem("cost")) || 0;

export const timeContainer = () => {
    return JSON.parse(localStorage.getItem("timeObtain")) || [];
};


const removeItem = (items) => {
    const removeItemBtn = document.querySelectorAll(".remove");

    removeItemBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            items.splice(index, 1);
            localStorage.setItem("things", JSON.stringify(items));
            displayItems(items)
        });
    });
};

const obtainItem = (items) => {
    const obtainBtn = document.querySelectorAll(".obtain");
    obtainBtn.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            const timeObtain = new Date();
            const target = e.target;
            const parentEl = document.getElementById(target.id).parentElement;
            const find = items.find(i => i.name === parentEl.id);
            
            if(currentMoney < find.price){
                alert("You don't have enough money!");
                return;
            };
            
            const pushTime = timeContainer();
            currentMoney = currentMoney - (find.price * find.quantity);
            currentMoneyDisplay.innerHTML = currentMoney;
            localStorage.setItem("cost", currentMoney);

            items.splice(index, 1);
            localStorage.setItem("things", JSON.stringify(items));

            pushTime.push({...find, time: timeObtain})
            localStorage.setItem("timeObtain", JSON.stringify(pushTime));
            displayItems(items);
            displayHistory(timeContainer());
        });
    });
};

const displayMoney = () => {
    if(amountToSave.value < 0 && amountToSave.value === ''){
        alert("You can't save negative numbers!")
        return
    }
    currentMoney += Number(amountToSave.value);
    currentMoneyDisplay.innerHTML = currentMoney;
    localStorage.setItem("cost", currentMoney);
}

export const displayItems = (items) => {
    containEach.innerHTML = '';
    currentMoneyDisplay.innerHTML = currentMoney;
    if(items.length === 0){
        containEach.innerHTML = '<h1>You have an empty list.</h1>'
    }

    items.forEach((item, index) => {
        const btnColor = currentMoney >= item.price ? "bg-[#031d42]" : "bg-[#690202]";
    containEach.innerHTML += 
    `<div id="${item.name}" class="w-[250px] ease duration-500 bg-[#819A91] rounded text-white h-[300px] flex flex-col gap-3 justify-evenly py-2 px-2 relative md:z-0">
        <button class="remove absolute right-2 top-0 text-xl">x</button>
        <!--Details-->
        <div class="my-0 flex justify-evenly">
            <h1 class="font-bold text-center">${item.name}</h1>
            <p>${item.quantity}x</p>
        </div>
        <hr />
        <p>${item.reason}</p>
        <div class="flex flex-col justify-evenly">
            <p>Cost: ₱${item.price}</p>
            <p>Total: ₱${item.price * item.quantity}</p>
        </div>
        <button id="${index}" class="obtain ${btnColor} w-full text-white py-2 rounded">Obtain</button>
    </div>`
    });

    //Remove Item
    removeItem(items);

    //obtain item
    obtainItem(items);

    //add money
    displayMoney();

};

addMoneyBtn.addEventListener('click', () => {
    displayMoney();
});

amountToSave.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        displayMoney();
    }
})

//Display History
displayHistory(timeContainer());

const eachBtn = document.querySelectorAll(".nav-btns");
const hideNavBtn = document.getElementById("nav-hide");
const navigation = document.getElementById("navigation");

const hideNavigation = () => {
    if(navigation.classList.contains("-translate-x-full")){
        hideNavBtn.innerHTML = "Show"
    } else {
        hideNavBtn.innerHTML = "Hide"
    }
    }

hideNavBtn.addEventListener('click', () => {
    navigation.classList.toggle("-translate-x-full");
    hideNavigation();
});

eachBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        navigation.classList.add("-translate-x-full");
        hideNavigation();
    });
});


const sections = {
    itemsContainer,
    addSection,
    saveMoneySection,
    historySection,
    aboutSection
};

const showSection = (secToShow) => {
    for(const sec in sections){
        sections[sec].classList.add("hidden");
    }
    secToShow.classList.remove("hidden")
}

addItem.addEventListener('click', () => showSection(addSection))

itemsList.addEventListener('click', () => showSection(itemsContainer));

saveMoneyBtn.addEventListener('click', () => showSection(saveMoneySection));

historyBtn.addEventListener('click', () => showSection(historySection));

aboutBtn.addEventListener('click', () => showSection(aboutSection));
