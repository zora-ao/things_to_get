import { timeContainer } from "./script.js";
const historyItemsContainer = document.getElementById("history-items-container");
const cleanHistory = document.getElementById("clean-history");

const getTime = (item) => {
    const timeBought = new Date(item.time);
    const now = new Date();

    const subTime = now - timeBought;
    const sec = subTime / 1000;
    const min = Math.floor(subTime / (1000 * 60));
    const hour = Math.floor(subTime / (1000 * 60 * 60));
    const days = Math.floor(subTime / (1000 * 60 * 60 * 24));

    if(sec < 60){
        return "Just now";
    } else if(min < 60){
        return `${min}minutes ago`;
    } else if(hour < 24){
        return `${hour}hours ago`;
    } else {
        return `${days}days ago`;
    }
}

export const displayHistory = (items) => {
    historyItemsContainer.innerHTML = '';

    if(items.length === 0){
        historyItemsContainer.innerHTML = "<h1>You don't have an item in the history yet. Buy something first.</h1>"
    }

    items.forEach((item) => {
        const timeAgo = getTime(item);
        historyItemsContainer.innerHTML += 
        `<div class="border flex flex-col justify-evenly border-black w-[300px] h-[150px] px-3 py-2 text-center">
            <h1 class="text-2xl">${item.name}</h1>
            <p>Congratulations for acquiring your ${item.name}</p>
            <p>You obtained this Item ${timeAgo}.</p>
        </div>`
    });

    //clean history
    cleanHistory.addEventListener('click', () => {
        localStorage.removeItem("timeObtain");
        displayHistory(timeContainer());
        timeContainer();
    });
};